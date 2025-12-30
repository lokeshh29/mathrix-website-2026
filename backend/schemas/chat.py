from typing import Optional
from pydantic import BaseModel

class ConverseRequest(BaseModel):
    user_query: str
    history: Optional[list[dict]] = None

class ConverseResponse(BaseModel):
    answer: str

class EmailRequest(BaseModel):
    name: str
    email: str
    message: str