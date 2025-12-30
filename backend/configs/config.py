import os
from typing import List, Optional
from pydantic import BaseModel

# Set local AWS Profile
# os.environ["AWS_PROFILE"] = "assisthub"

from dotenv import load_dotenv
load_dotenv()

AWS_REGION = os.getenv('AWS_REGION', "us-east-1")
DEFAULT_MODEL_ID = os.getenv('DEFAULT_MODEL_ID', "amazon.nova-pro-v1:0")
DEFAULT_KB_ID = os.getenv('DEFAULT_KB_ID', "UMM4HXPEKQ")

SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# Default canned message
DEFAULT_CANNED_MESSAGE = os.getenv(
    "DEFAULT_CANNED_MESSAGE",
    "Oops! I am currently unable to process this request. Please feel free to contact mathrix.ceg@gmail.com."
)

# Model parameters

KB_RETRIEVE_NUM_OF_RESULTS = int(os.getenv("KB_RETRIEVE_NUM_OF_RESULTS", "5"))

class AnswerRequestPayload(BaseModel):
  text: str | None = None
  # agent_session_id: str | None = None
