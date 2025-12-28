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

KB_RETRIEVE_NUM_OF_RESULTS = int(os.getenv("KB_RETRIEVE_NUM_OF_RESULTS", "5"))

class AnswerRequestPayload(BaseModel):
  text: str | None = None
  agent_session_id: str | None = None
