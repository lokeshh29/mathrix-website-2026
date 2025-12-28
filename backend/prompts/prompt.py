
from .loader import load_prompt

LLM_HEADER_PROMPT = load_prompt("llm_header_prompt.md")
LLM_FD_INTEREST_RATE_TOOL_PROMPT = load_prompt("llm_fd_interest_rate_tool_prompt.md")
LLM_ANSWERING_PROMPT = load_prompt("llm_answering_prompt.md")

AUGMENTED_PROMPT_TEMPLATE = load_prompt("augmented_prompt.md")

def get_augmented_prompt(user_prompt: str, kb_id: str, top_k: int = 20) -> str:
    return AUGMENTED_PROMPT_TEMPLATE.format(
        kb_id=kb_id,
        user_prompt=user_prompt,
        top_k=top_k
    )
