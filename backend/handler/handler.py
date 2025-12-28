from configs.config import (
    DEFAULT_KB_ID,
    DEFAULT_MODEL_ID,
    AnswerRequestPayload,
)
import logging
import traceback
from typing import Any, Dict

from router.agents import run_agent
from utils.Utils import parse_event
# from utils.request_context import set_agent_session_id
logger = logging.getLogger()


def internal_handle(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main AgentCore entrypoint.
    Simplified to just call the RAG agent without classification.
    """
    try:
        data = parse_event(event)
        payload = AnswerRequestPayload.model_validate(data)
        text = payload.text
        
        # session_id = payload.agent_session_id
        # set_agent_session_id(session_id)

        if not text:
            raise ValueError("Query text is required")
        kb_id = DEFAULT_KB_ID
        
        agent_output = run_agent(text, kb_id)
        msg = agent_output.get("output", "No response.")

        answer_obj = {
            "answer": msg,
            "model_id": DEFAULT_MODEL_ID
        }

        return {
            "answers": [answer_obj]
        }

    except Exception as e:
        logger.error("ERROR: %s", e)
        traceback.print_exc()
        raise e
