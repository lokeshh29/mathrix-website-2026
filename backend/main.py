from typing import Optional
from fastapi import FastAPI, HTTPException
import logging
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from configs.config import DEFAULT_MODEL_ID
from handler.handler import internal_handle
from schemas.chat import ConverseRequest, ConverseResponse
from utils.email_service import send_email_via_smtp

from schemas.chat import EmailRequest
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Chatbot API", version="1.0.0", root_path="/default")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://mathrix.co.in",
        "https://www.mathrix.co.in",
        "https://mathrix-website-2026.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/converse", response_model=ConverseResponse)
async def converse(request: ConverseRequest):
    """
    Endpoint to handle user queries via the RAG agent.
    Minimal version: No DB logging, No Session History, No Background Tasks.
    """
    event = {
        "text": request.user_query,
        "history": request.history or []
    }
    
    try:
        # Core RAG Logic
        result = internal_handle(event)
        answers_list = result.get("answers", [])
        
        final_answer = ""
        if answers_list:
             final_answer = answers_list[0].get("answer", "No response.")

        # Return response
        return ConverseResponse(
            answer=final_answer
        )
        
    except Exception as e:
        logger.error(f"Error in converse: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ping")
async def ping():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/send-email")
async def send_email(request: EmailRequest):
    """
    Sends a contact form email via SMTP.
    """
    success = send_email_via_smtp(request.name, request.email, request.message)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send email.")
    return {"status": "success", "message": "Email sent successfully."}

# --- Registration Routes ---
from utils.db_service import DynamoDBService
from utils.s3_service import S3Service
from pydantic import BaseModel
from typing import List

class RegistrationRequest(BaseModel):
    fullName: str
    email: str
    phone: str
    college: str
    dept: str
    year: str
    events: List[str]
    workshops: List[str]
    transactionId: str
    screenshotUrl: str

@app.post("/register")
async def register_user(request: RegistrationRequest):
    db_service = DynamoDBService()
    import datetime
    
    data = request.model_dump()
    data['timestamp'] = datetime.datetime.now().isoformat()
    
    if db_service.save_registration(data):
         return {"status": "success", "message": "Registration successful"}
    else:
         raise HTTPException(status_code=500, detail="Failed to save registration")

@app.get("/upload-url")
async def get_upload_url(filename: str, filetype: str):
    s3_service = S3Service()
    url = s3_service.generate_presigned_url(filename)
    if url:
        return {"uploadUrl": url, "filename": filename}
    else:
        raise HTTPException(status_code=500, detail="Failed to generate upload URL")

lambda_handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
