import logging
from typing import Any, Dict

logger = logging.getLogger()

def get_output(obj: Dict[str, Any]) -> Dict[str, Any]:
    if (
        isinstance(obj, dict)
        and "output" in obj
        and isinstance(obj["output"], dict)
    ):
        output_block = obj["output"]
    else:
        output_block = obj
    return output_block

def parse_event(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normalize AgentCore incoming event structure.
    """
    logger.info(f"Received event: {event}")

    if (
        isinstance(event, dict)
        and "input" in event
        and isinstance(event["input"], dict)
    ):
        input_block = event["input"]
    else:
        input_block = event

    text = input_block.get("text") or input_block.get("inputText") or None
    # agent_session_id = input_block.get("agent_session_id")
    return {
        "text": text,
        # "agent_session_id": agent_session_id,
        "raw_event": event,
    }
