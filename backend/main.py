from typing import Optional
from fastapi import FastAPI, HTTPException
import logging
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from configs.config import DEFAULT_MODEL_ID
from handler.handler import internal_handle
from schemas.chat import ConverseRequest, ConverseResponse

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Chatbot API", version="1.0.0")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


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
        
        # --- Response Formatting ---
        # handler.py returns: {"answers": [{"answer": "msg", "model_id": "..."}]}
        answers_list = result.get("answers", [])
        
        final_answer = ""
        if answers_list:
             final_answer = answers_list[0].get("answer", "No response.")

        # Return response (skipping session/log IDs and citations)
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

lambda_handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
