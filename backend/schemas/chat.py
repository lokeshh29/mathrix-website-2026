from typing import Optional
from pydantic import BaseModel

class ConverseRequest(BaseModel):
    user_query: str

class ConverseResponse(BaseModel):
    answer: str