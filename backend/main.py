from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
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
    allow_origins=[
        "http://localhost:5173", 
        "https://mathrix-website-2026.onrender.com",
        "https://www.mathrix.co.in",
        "https://mathrix.co.in"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static Files for Uploads - No longer needed with GridFS
# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)
# app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Services
from utils.db_service import MongoDBService

@app.get("/")
def read_root():
    return {"message": "Mathrix API is running"}

@app.post("/register")
async def register_user(
    request: Request,
    fullName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    college: str = Form(...),
    course: str = Form(...),
    specialization: str = Form(...),
    year: str = Form(...),
    transactionId: str = Form(...),
    events: str = Form(...), # Received as JSON string
    workshops: str = Form(...), # Received as JSON string
    screenshot: UploadFile = File(...)
):
    try:
        # Save file to GridFS
        db = MongoDBService()
        file_extension = screenshot.filename.split(".")[-1]
        filename = f"{transactionId}_{email}.{file_extension}"
        
        # Read file content
        file_content = await screenshot.read()
        
        if not db.save_file(file_content, filename, screenshot.content_type):
             raise HTTPException(status_code=500, detail="Failed to save screenshot")

        # Construct URL dynamically pointing to our new endpoint
        base_url = str(request.base_url).rstrip("/")
        screenshot_url = f"{base_url}/uploads/{filename}"

        # Parse JSON fields
        events_list = json.loads(events)
        workshops_list = json.loads(workshops)

        data = {
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "college": college,
            "course": course,
            "specialization": specialization,
            "year": year,
            "transactionId": transactionId,
            "events": events_list,
            "workshops": workshops_list,
            "screenshotUrl": screenshot_url,
            "timestamp": None 
        }
        
        # Add timestamp
        import datetime
        import random
        data['timestamp'] = datetime.datetime.now().isoformat()
        
        # Generate Mathrix ID (Simple 6-digit random)
        # In production, check for collision, but for now 6 digits is enough space
        data['mathrixId'] = str(random.randint(100000, 999999))

        if db.save_registration(data):
            print(f"DEBUG: Registration Saved. ID: {data['mathrixId']}")
            return {
                "status": "success", 
                "message": "Registration successful",
                "mathrixId": data['mathrixId']
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save registration")
            
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/register/bulk")
async def register_bulk(
    request: Request,
    registrations: str = Form(...),
    screenshot: UploadFile = File(...)
):
    try:
        # Save file to GridFS
        db = MongoDBService()
        file_extension = screenshot.filename.split(".")[-1]
        import uuid
        group_id = str(uuid.uuid4())
        filename = f"bulk_{group_id}.{file_extension}"
        
        file_content = await screenshot.read()
        
        if not db.save_file(file_content, filename, screenshot.content_type):
             raise HTTPException(status_code=500, detail="Failed to save screenshot")

        base_url = str(request.base_url).rstrip("/")
        screenshot_url = f"{base_url}/uploads/{filename}"

        attendees_list = json.loads(registrations)
        if not isinstance(attendees_list, list):
            raise HTTPException(status_code=400, detail="Invalid registrations format")
            
        generated_ids = []
        import datetime
        import random
        timestamp = datetime.datetime.now().isoformat()

        for attendee in attendees_list:
            mathrix_id = str(random.randint(100000, 999999))
            
            data = {
                "fullName": attendee.get('fullName'),
                "email": attendee.get('email'),
                "phone": attendee.get('phone'),
                "college": attendee.get('college'),
                "course": attendee.get('course'),
                "specialization": attendee.get('specialization'),
                "year": attendee.get('year'),
                "transactionId": attendee.get('transactionId'),
                "events": attendee.get('events', []),
                "workshops": attendee.get('workshops', []),
                "screenshotUrl": screenshot_url,
                "timestamp": timestamp,
                "mathrixId": mathrix_id,
                "isBulk": True,
                "groupId": group_id
            }

            if db.save_registration(data):
                generated_ids.append(mathrix_id)
            else:
                 logger.error(f"Failed to save attendee {attendee.get('email')}")

        return {
            "status": "success", 
            "message": "Bulk registration successful",
            "ids": generated_ids
        }
            
    except Exception as e:
        logger.error(f"Bulk registration error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/uploads/{filename}")
async def get_image(filename: str):
    try:
        db = MongoDBService()
        grid_out = db.get_file(filename)
        
        if not grid_out:
            raise HTTPException(status_code=404, detail="Image not found")
            
        return StreamingResponse(
            grid_out, 
            media_type=grid_out.content_type
        )
    except Exception as e:
        logger.error(f"Error retrieving image {filename}: {e}")
        raise HTTPException(status_code=500, detail="Could not retrieve image")

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

@app.delete("/registrations/{transactionId}")
async def delete_registration(transactionId: str, secret: str = ""):
    admin_secret = os.getenv("ADMIN_SECRET", "mathrix-admin-2026")
    if secret != admin_secret:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    db = MongoDBService()
    if db.delete_registration(transactionId):
        return {"status": "success", "message": "Registration deleted"}
    else:
        raise HTTPException(status_code=404, detail="Registration not found or failed to delete")

from utils.pdf_service import generate_ticket
# StreamingResponse is already imported above if strict organization, 
# but ensuring it's available for both endpoints.

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
