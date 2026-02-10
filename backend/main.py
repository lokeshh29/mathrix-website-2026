from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging
import os
import shutil
from typing import List, Optional
import json

from dotenv import load_dotenv

load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Mathrix API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev ease
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static Files for Uploads
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Services
from utils.db_service import MongoDBService

@app.get("/")
def read_root():
    return {"message": "Mathrix API is running"}

@app.post("/register")
async def register_user(
    fullName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    college: str = Form(...),
    dept: str = Form(...),
    year: str = Form(...),
    transactionId: str = Form(...),
    events: str = Form(...), # Received as JSON string
    workshops: str = Form(...), # Received as JSON string
    screenshot: UploadFile = File(...)
):
    try:
        # Save file locally
        file_extension = screenshot.filename.split(".")[-1]
        filename = f"{transactionId}_{email}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(screenshot.file, buffer)
            
        # Construct URL (assuming server runs on localhost:8000)
        # In production/deployment, this valid URL logic might need adjustment
        screenshot_url = f"http://localhost:8000/uploads/{filename}"

        # Parse JSON fields
        events_list = json.loads(events)
        workshops_list = json.loads(workshops)

        data = {
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "college": college,
            "dept": dept,
            "year": year,
            "transactionId": transactionId,
            "events": events_list,
            "workshops": workshops_list,
            "screenshotUrl": screenshot_url,
            "timestamp": None # Will be set by DB or use datetime here
        }
        
        # Add timestamp
        import datetime
        data['timestamp'] = datetime.datetime.now().isoformat()

        db = MongoDBService()
        if db.save_registration(data):
            return {"status": "success", "message": "Registration successful"}
        else:
            raise HTTPException(status_code=500, detail="Failed to save registration")
            
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/registrations")
async def get_all_registrations(secret: str = ""):
    admin_secret = os.getenv("ADMIN_SECRET", "mathrix-admin-2026")
    if secret != admin_secret:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    db = MongoDBService()
    registrations = db.get_all_registrations()
    
    # Sort by timestamp descending
    registrations.sort(key=lambda x: x.get('timestamp', ''), reverse=True)
    
    return {"registrations": registrations}

from utils.pdf_service import generate_ticket
from fastapi.responses import StreamingResponse

@app.get("/ticket/{transactionId}")
async def get_ticket(transactionId: str):
    db = MongoDBService()
    registrations = db.get_all_registrations()
    
    # Find registration by transactionId
    user_data = next((r for r in registrations if r['transactionId'] == transactionId), None)
    
    if not user_data:
        raise HTTPException(status_code=404, detail="Registration not found")
        
    pdf_buffer = generate_ticket(user_data)
    
    headers = {
        'Content-Disposition': f'attachment; filename="Mathrix_Ticket_{transactionId}.pdf"'
    }
    
    return StreamingResponse(
        pdf_buffer, 
        media_type="application/pdf", 
        headers=headers
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
