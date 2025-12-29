from typing import Optional
from pydantic import BaseModel

class ConverseRequest(BaseModel):
    user_query: str
    history: Optional[list[dict]] = None

class ConverseResponse(BaseModel):
    answer: str