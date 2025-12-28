import logging
import traceback
from typing import Any, Dict

import boto3

from configs.config import (
    AWS_REGION,
    DEFAULT_CANNED_MESSAGE,
    DEFAULT_MODEL_ID,
    DEFAULT_MODEL_IS_STREAMING,
    DEFAULT_MODEL_MAX_TOKENS,
    DEFAULT_MODEL_TEMPERATURE,
    DEFAULT_MODEL_TOP_P,
    AnswerRequestPayload,
    LLMModelConfig,
)
from router.agents import run_agent
from service.classify_agent import classify_agent
from utils.Utils import (
    calculate_semantic_similarity,
    match_kb_id,
    parse_event,
)
from utils.request_context import set_agent_session_id

logger = logging.getLogger()

bedrock_client = boto3.client("bedrock-runtime", region_name=AWS_REGION)

def internal_handle(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main AgentCore entrypoint that performs KB retrieval and LLM reasoning for the prompt.
    """
    try:
        data = parse_event(event)
        payload = AnswerRequestPayload.model_validate(data)
        text = payload.text
        product_id = payload.product_id
        set_agent_session_id(payload.agent_session_id)
        session_id = payload.agent_session_id
        if not product_id or not text:
            raise ValueError("product_id and query are required")
        logger.info(
            "Request processing session_id=%s product_id=%s",
            session_id,
            product_id,
        )
        model_configs = payload.llm_model_configs
        if model_configs is None:
            model_configs = [LLMModelConfig(model_id=DEFAULT_MODEL_ID)]
        original_product_id = product_id

        answers = []

        # Loop through each model_id
        for model_config in model_configs:
            logger.info(
                "Processing model session_id=%s product_id=%s model_id=%s",
                session_id,
                product_id,
                model_config.model_id,
            )
            if model_config.model_temperature is None:
                model_config.model_temperature = DEFAULT_MODEL_TEMPERATURE
            if model_config.model_top_p is None:
                model_config.model_top_p = DEFAULT_MODEL_TOP_P
            if model_config.model_max_tokens is None:
                model_config.model_max_tokens = DEFAULT_MODEL_MAX_TOKENS
            if model_config.model_streaming is None:
                model_config.model_streaming = DEFAULT_MODEL_IS_STREAMING
            expected_answer = payload.expected_answer

            # classify query
            classified_output = classify_agent(text, product_id, model_config)
            logger.info("Classification result session_id=%s product_id=%s classified_output=%s", session_id, product_id, classified_output)
            for classified_product_id, sub_query in classified_output.items():
                if not sub_query or not sub_query.strip():
                    continue
                sub_query = sub_query.strip()

                kb_id = match_kb_id(classified_product_id) 
                
                #enrich prompt to know about classified product
                context_query = f"Product: {classified_product_id}\nQuery: {sub_query}"

                agent_output = run_agent(context_query, kb_id, model_config, top_k=4)
                msg = agent_output["output"] if isinstance(agent_output, dict) else agent_output

                if msg != "NO_KB_RESULTS":
                    answer_obj: Dict[str, Any] = {"answer": msg, "product_id": classified_product_id}
                    if model_config.model_id:
                        answer_obj["model_id"] = model_config.model_id
                    if expected_answer:
                        try:
                            score = calculate_semantic_similarity(msg, expected_answer, client=bedrock_client)
                            answer_obj["semantic_score"] = score
                        except Exception:
                            answer_obj["semantic_score"] = 0.0
                    answers.append(answer_obj)
                    continue

                logger.info(
                    "Secondary classification session_id=%s product_id=%s",
                    session_id,
                    classified_product_id,
                )
                secondary_classified_output = classify_agent(
                    f"Product '{classified_product_id}' basic search found NO data for: {sub_query}\n"
                    f"Re-evaluate: If query STRICTLY belongs to '{classified_product_id}', return '{classified_product_id}' (we will retry with Deep Search).\n"
                    f"If it belongs to a DIFFERENT product, return that ID.\n"
                    f"Only return the product you are 100% sure.",
                    classified_product_id,
                    model_config,
                )

                for new_product_id, new_sub_query in secondary_classified_output.items():
                    logger.info(
                        "Secondary classification result session_id=%s product_id=%s new_product_id=%s",
                        session_id,
                        classified_product_id,
                        new_product_id,
                    )
                    if not new_sub_query or not new_sub_query.strip():
                        continue
                    new_sub_query = new_sub_query.strip()
                    new_kb_id = match_kb_id(new_product_id)
                    # Context for secondary query
                    sec_context_query = f"Product: {new_product_id}\nQuery: {new_sub_query}"

                    sec_top_k = 20 if new_product_id == classified_product_id else 4
                    sec_result = run_agent(sec_context_query, new_kb_id, model_config, top_k=sec_top_k)
                    sec_msg = sec_result["output"] if isinstance(sec_result, dict) else sec_result

                    if sec_msg != "NO_KB_RESULTS":
                        answer_obj = {
                            "answer": sec_msg,
                            "product_id": new_product_id,
                        }
                        if model_config.model_id:
                            answer_obj["model_id"] = model_config.model_id
                        if expected_answer:
                            try:
                                score = calculate_semantic_similarity(sec_msg, expected_answer, client=bedrock_client)
                                answer_obj["semantic_score"] = score
                            except Exception:
                                answer_obj["semantic_score"] = 0.0

                        answers.append(answer_obj)

        if answers:
            logger.info(
                "Request completed session_id=%s product_id=%s answers=%s",
                session_id,
                product_id,
                len(answers),
            )
            return {
              "answers": answers
            }

        logger.info(
            "Request completed session_id=%s product_id=%s answers=0",
            session_id,
            product_id,
        )
        return {
            "answers": [
                {
                    "answer": DEFAULT_CANNED_MESSAGE,
                    "product_id": original_product_id
                }
            ]
        }


    except Exception as e:
        logger.error("ERROR: %s", e)
        traceback.print_exc()
        raise e
