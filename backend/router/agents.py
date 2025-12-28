import logging
from typing import Dict, Optional, Union, Any

from strands.agent import Agent
from strands.experimental.tools import ToolProvider
from strands.models import BedrockModel

from configs.config import DEFAULT_MODEL_ID
from tools.kb_tool import retrieve_from_kb

logger = logging.getLogger(__name__)

LLM_ANSWERING_PROMPT = """
You are a helpful assistant for the Mathrix 2026 event.
Use the tools provided to answer the user's question.
If the tool returns "NO_KB_RESULTS", politely say you don't have that information.
"""

def run_agent(prompt: str, kb_id: str) -> Dict[str, str]:
    """
    Runs the agent workflow using Strands Framework.
    """
    if not prompt:
        return {"output": "No prompt provided."}

    try:
        # Create BedrockModel instance using hardcoded defaults
        model = BedrockModel(
            model_id=DEFAULT_MODEL_ID,
            temperature=0.1,
            top_p=1.0,
            max_tokens=1024,
            streaming=False,
        )

        tools = [retrieve_from_kb]

        # Create a new agent instance for each request
        agent = Agent(
            model=model,
            tools=tools,
            system_prompt=LLM_ANSWERING_PROMPT
        )
        
        # Simple augmented prompt to encourage tool use
        final_prompt = f"Context KB ID: {kb_id}\nUser Query: {prompt}"

        response = agent(final_prompt)
        output_text = str(response).strip()

        if not output_text:
             return {"output": "NO_KB_RESULTS"}

        return {"output": output_text}

    except Exception as e:
        logger.error(f"run_agent error: {e}", exc_info=True)
        return {"output": "Error processing request."}
