import logging
from typing import Any, Dict, Optional, Union

from strands.agent import Agent
from strands.experimental.tools import ToolProvider
from strands.models import BedrockModel

from configs.config import FD_INTEREST_RATE_TOOL_ENABLED, LLMModelConfig
from prompts.prompt import (
    LLM_ANSWERING_PROMPT,
    LLM_FD_INTEREST_RATE_TOOL_PROMPT,
    LLM_HEADER_PROMPT,
    get_augmented_prompt,
)
from tools.fd_tool import get_fd_interest_rate
from tools.kb_tool import retrieve_from_kb

logger = logging.getLogger(__name__)

def run_agent(prompt: str, kb_id: str, model_config: LLMModelConfig,top_k: int = 20) -> Dict[str, str]:
    """
    Runs the agent workflow using Strands Framework.
    Creates a new agent instance for each request to ensure fresh context.
    """
    if not prompt:
        return {"output": "No prompt provided."}

    augmented_prompt = get_augmented_prompt(prompt, kb_id, top_k)

    try:
        # Create BedrockModel instance dynamically for each request
        model = BedrockModel(
            model_id=model_config.model_id,
            temperature=model_config.model_temperature,
            top_p=model_config.model_top_p,
            max_tokens=model_config.model_max_tokens,
            streaming=model_config.model_streaming,
        )

        # tools
        prompt_parts = [LLM_HEADER_PROMPT]
        tools: Optional[list[Union[str, dict[str, str], "ToolProvider", Any]]] = [retrieve_from_kb]
        if FD_INTEREST_RATE_TOOL_ENABLED:
            tools.append(get_fd_interest_rate)
            prompt_parts.append(LLM_FD_INTEREST_RATE_TOOL_PROMPT)
        prompt_parts.append(LLM_ANSWERING_PROMPT)

        # Create a new agent instance for each request doesn't stores conversation internally
        agent = Agent(
            model=model,
            tools=tools,
            system_prompt="\n\n".join(prompt_parts)
        )

        response = agent(augmented_prompt)
        output_text = str(response).strip()

        if not output_text:
             return {"output": "NO_KB_RESULTS"}

        return {"output": output_text}

    except Exception as e:
        logger.error(f"run_agent error: {e}", exc_info=True)
        return {"output": "NO_KB_RESULTS"}
