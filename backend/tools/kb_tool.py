import logging
import boto3
from strands.tools import tool

from configs.config import (
    AWS_REGION,
    KB_RETRIEVE_NUM_OF_RESULTS
)
from utils.request_context import get_agent_session_id

agent_runtime = boto3.client("bedrock-agent-runtime", region_name=AWS_REGION)
logger = logging.getLogger(__name__)

@tool
def retrieve_from_kb(query: str, kb_id: str, top_k: int = KB_RETRIEVE_NUM_OF_RESULTS) -> str:
    """
    Retrieve relevant chunks from Bedrock Knowledge Base for the given query.
    Returns:
        - Joined text if results found
        - "NO_KB_RESULTS" if empty
    """
    session_id = get_agent_session_id()
    if session_id:
        logger.info(
            "Tool retrieve_from_kb called session_id=%s kb_id=%s top_k=%s",
            session_id,
            kb_id,
            top_k,
        )
    else:
        logger.info("Tool retrieve_from_kb called with kb_id=%s top_k=%s", kb_id, top_k)
    
    if not kb_id:
        return "NO_KB_RESULTS"

    try:
        resp = agent_runtime.retrieve(
            knowledgeBaseId=kb_id,
            retrievalQuery={"text": query},
            retrievalConfiguration={
                "vectorSearchConfiguration": {
                    "numberOfResults": top_k
                }
            }
        )

        results = resp.get("retrievalResults", [])
        if not results:
            logger.info(f"No results for query='{query}' in Knowledge")
            return "NO_KB_RESULTS"

        snippets = []
        for item in results:
            content = item.get("content", {})
            text = content.get("text") or content.get("body")

            if text:
                snippets.append(text)

        if not snippets:
            return "NO_KB_RESULTS"

        joined_snippets = "\n\n---\n\n".join(snippets)
        return joined_snippets

    except Exception as e:
        logger.error(f"retrieve_from_kb error: {e}", exc_info=True)
        return "NO_KB_RESULTS"
