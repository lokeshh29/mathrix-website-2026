import logging
from typing import Dict, Optional, Union, Any

from strands.agent import Agent
from strands.experimental.tools import ToolProvider
from strands.models import BedrockModel

from configs.config import DEFAULT_MODEL_ID, DEFAULT_CANNED_MESSAGE
from tools.kb_tool import retrieve_from_kb

logger = logging.getLogger(__name__)

LLM_ANSWERING_PROMPT = """
You are a helpful assistant for the Mathrix 2026 event.

INSTRUCTIONS:
1. GREETINGS: If the user says "hello", "hi", etc., welcome them to Mathrix 2026 and ask how to help. IGNORE the tool output for greetings.
2. CONTEXT: You will be provided with PREVIOUS CONVERSATION HISTORY. Use this to understand pronouns like "it", "them", "those", "explain each", etc.
3. TOOL USE:
   - You MUST use the "retrieve_from_kb" tool to find information.
   - When calling the tool, formulate a SEARCH QUERY that fully describes what the user is asking about, replacing pronouns with actual names from the history.
   - Example: If history mentions "Paper Presentation" and user asks "explain it", your tool query should be "Paper Presentation details".
4. NO RESULTS: If the tool returns "NO_KB_RESULTS" or unrelated info, you MUST say: "NO_ANSWER_FOUND"
5. Do NOT answer using your own outside knowledge.
6. FORMAT:
   - STRICTLY OUTPUT THE ANSWER ONLY.
   - DO NOT include <thinking> tags, internal monologue, or any system thoughts.
   - DO NOT make up information (hallucinations).
   - Use bullet points (-) for lists.
7. Keep your answer SHORT and CONCISE.
"""

# Global variable to hold the agent instance
_agent_instance = None

def get_agent():
    """
    Returns a singleton instance of the Agent.
    """
    global _agent_instance
    if _agent_instance is None:
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

            # Create the agent instance
            _agent_instance = Agent(
                model=model,
                tools=tools,
                system_prompt=LLM_ANSWERING_PROMPT
            )
            logger.info("Agent initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize Agent: {e}", exc_info=True)
            raise e
    return _agent_instance

def run_agent(prompt: str, kb_id: str, history: Optional[list[dict]] = None) -> Dict[str, str]:
    """
    Runs the agent workflow using Strands Framework.
    Accepts history (list of {role, content}) to maintain context.
    """
    if not prompt:
        return {"output": "No prompt provided."}

    try:
        # Get the singleton agent
        agent = get_agent()
        
        try:
            import os
            base_dir = os.path.dirname(os.path.abspath(__file__))
            context_path = os.path.join(base_dir, "..", "data", "context.txt")
            with open(context_path, "r", encoding="utf-8") as f:
                website_context = f.read()
        except Exception as e:
            logger.warning(f"Could not load context.txt: {e}")
            website_context = ""

        # --- Context Construction ---
        context_str = ""
        if history:
            context_str = "PREVIOUS CONVERSATION HISTORY (ref only):\n"
            for msg in history:
                role = msg.get("role", "unknown")
                content = msg.get("content", "")
                context_str += f"{role.upper()}: {content}\n"
            context_str += "--- END HISTORY ---\n\n"

        # Simple augmented prompt to encourage tool use + context
        final_prompt = (
            f"WEBSITE/EVENT CONTEXT:\n{website_context}\n\n"
            f"{context_str}"
            f"Context KB ID: {kb_id}\n"
            f"User Query: {prompt}\n"
            f"(If user asks to 'explain each' or similar, list and explain the items mentioned in the last HISTORY message. "
            f"Use the WEBSITE/EVENT CONTEXT above to answer questions directly if the info is present. "
            f"REMINDER: Do not output system thinkings or hallucinations. Output ONLY the response.)"
        )

        response = agent(final_prompt)
        output_text = str(response).strip()

        if not output_text or "NO_KB_RESULTS" in output_text or "NO_ANSWER_FOUND" in output_text:
             return {"output": DEFAULT_CANNED_MESSAGE}

        return {"output": output_text}


    except Exception as e:
        logger.error(f"run_agent error: {e}", exc_info=True)
        return {"output": "Error processing request."}
