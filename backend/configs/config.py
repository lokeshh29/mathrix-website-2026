import os
from typing import List, Optional
from pydantic import BaseModel

AWS_REGION = os.getenv('AWS_REGION', "us-east-1")
DEFAULT_MODEL_ID = os.getenv('DEFAULT_MODEL_ID', "anthropic.claude-3-sonnet-20240229-v1:0")
DEFAULT_KB_ID = os.getenv('DEFAULT_KB_ID', "")

# Default canned message
DEFAULT_CANNED_MESSAGE = os.getenv(
    "DEFAULT_CANNED_MESSAGE",
    "Oops! I am currently unable to process this request."
)

# Model parameters
DEFAULT_MODEL_TEMPERATURE = float(os.getenv("DEFAULT_MODEL_TEMPERATURE", "0.1"))
DEFAULT_MODEL_TOP_P = float(os.getenv("DEFAULT_MODEL_TOP_P", "1.0"))
DEFAULT_MODEL_MAX_TOKENS = int(os.getenv("DEFAULT_MODEL_MAX_TOKENS", "1024"))
DEFAULT_MODEL_IS_STREAMING = os.getenv("DEFAULT_MODEL_IS_STREAMING", "false").lower() == "true"

KB_RETRIEVE_NUM_OF_RESULTS = int(os.getenv("KB_RETRIEVE_NUM_OF_RESULTS", "5"))

class LLMModelConfig(BaseModel):
  model_id: str
  model_temperature: float | None = None
  model_max_tokens: int | None = None
  model_top_p: float | None = None
  model_streaming: bool | None = None

class AnswerRequestPayload(BaseModel):
  text: str | None = None
  agent_session_id: str | None = None
  llm_model_configs: List[LLMModelConfig] | None = None
