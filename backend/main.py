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
    transactionId: Optional[str] = Form(None),
    events: str = Form(...), # Received as JSON string
    workshops: str = Form(...), # Received as JSON string
    screenshot: Optional[UploadFile] = File(None)
):
    try:
        db = MongoDBService()
        screenshot_url = ""

        if screenshot:
            # Save file to GridFS
            file_extension = screenshot.filename.split(".")[-1]
            # If transactionId is None at this point, use email for filename
            safe_tid = transactionId if transactionId else "NO_TID"
            filename = f"{safe_tid}_{email}.{file_extension}"
            
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
        
        # Generate Mathrix ID first to use in transactionId if needed
        import random
        mathrix_id = str(random.randint(100000, 999999))
        
        # If no transaction ID provided (e.g. CEG student), generate one
        final_transaction_id = transactionId if transactionId else f"FREE-{mathrix_id}"

        data = {
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "college": college,
            "course": course,
            "specialization": specialization,
            "year": year,
            "transactionId": final_transaction_id,
            "events": events_list,
            "workshops": workshops_list,
            "screenshotUrl": screenshot_url,
            "timestamp": None,
            "mathrixId": mathrix_id
        }
        
        # Add timestamp
        import datetime
        data['timestamp'] = datetime.datetime.now().isoformat()

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
    screenshot: Optional[UploadFile] = File(None)
):
    try:
        db = MongoDBService()
        screenshot_url = ""
        
        if screenshot:
            # Save file to GridFS
            file_extension = screenshot.filename.split(".")[-1]
            import uuid
            group_id_file = str(uuid.uuid4())
            filename = f"bulk_{group_id_file}.{file_extension}"
            
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
        import uuid
        timestamp = datetime.datetime.now().isoformat()
        group_id = str(uuid.uuid4())
        
        # 1. Event Constraints Validation (Per Team)
        event_counts = {}
        event_limits = {
            "Math Wizz": 2,
            "IPL Auction": 3,
            "SQL – Query Quest": 2
        }

        for attendee in attendees_list:
            for event in attendee.get('events', []):
                event_counts[event] = event_counts.get(event, 0) + 1
        
        for event, limit in event_limits.items():
            if event_counts.get(event, 0) > limit:
                raise HTTPException(status_code=400, detail=f"Event '{event}' allows maximum {limit} participants per team.")

        # 2. Global Event Limit Check (DB-based)
        # Check if this is a CEG registration
        first_attendee_college = attendees_list[0].get('college', '')
        is_ceg = 'ceg' in first_attendee_college.lower() if first_attendee_college else False
        
        if is_ceg:
            # Check availability
            current_db_counts = db.get_event_counts(college_type='ceg')
            global_limits = {
                "IPL Auction": 9,  # 3 teams * 3 members
                "Math Wizz": 6     # 3 teams * 2 members
            }
            
            # Events being registered for in this batch
            batch_events = {}
            for attendee in attendees_list:
                for event in attendee.get('events', []):
                    batch_events[event] = batch_events.get(event, 0) + 1
            
            for event, new_count in batch_events.items():
                limit = global_limits.get(event)
                if limit is not None:
                    # Current count from DB (participants)
                    current_participants = current_db_counts.get(event, 0)
                    
                    if (current_participants + new_count) > limit:
                         raise HTTPException(status_code=400, detail=f"Registration for '{event}' is full (Max {limit} participants reached for CEG).")

        for attendee in attendees_list:
            mathrix_id = str(random.randint(100000, 999999))
            
            # Handle empty transaction ID in bulk
            txn_id = attendee.get('transactionId')
            if not txn_id:
                txn_id = f"FREE-{mathrix_id}"
            
            data = {
                "fullName": attendee.get('fullName'),
                "email": attendee.get('email'),
                "phone": attendee.get('phone'),
                "college": attendee.get('college'),
                "course": attendee.get('course'),
                "specialization": attendee.get('specialization'),
                "year": attendee.get('year'),
                "transactionId": txn_id,
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

@app.get("/events/availability")
async def get_event_availability(college: str = "other"):
    try:
        db = MongoDBService()
        counts = db.get_event_counts(college_type=college)
        
        # Define limits (Only for CEG as per requirements)
        limits = {}
        if college == 'ceg':
            limits = {
                "IPL Auction": 9,  # 3 teams * 3 members
                "Math Wizz": 6     # 3 teams * 2 members
            }
        
        availability = {}
        all_events = [
            "SQL – Query Quest", "MagicMatix", "Code Matrix", "Through the Lens",
            "IPL Auction", "Paper Presentation", "Math Wizz",
            "Mathkinator", "Treasure Hunt"
        ]
        
        for event in all_events:
            current_count = counts.get(event, 0)
            limit = limits.get(event)
            is_full = False
            if limit is not None and current_count >= limit:
                is_full = True
            
            availability[event] = {
                "count": current_count,
                "limit": limit,
                "isFull": is_full
            }
            
        return availability
    except Exception as e:
        logger.error(f"Error checking availability: {e}")
        raise HTTPException(status_code=500, detail="Could not check availability")

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

@app.get("/ticket/search")
async def search_tickets(q: str = ""):
    if not q or len(q) < 3:
        raise HTTPException(status_code=400, detail="Please enter at least 3 characters")
    
    db = MongoDBService()
    registrations = db.get_all_registrations()
    
    # Search by mathrixId or phone (with or without +91 prefix)
    phone_variants = [q]
    if q.isdigit() and len(q) == 10:
        phone_variants.append(f"+91{q}")
        phone_variants.append(f"+91 {q}")
    elif q.startswith("+91"):
        phone_variants.append(q.replace("+91", "").strip())
    
    matches = [
        {
            "fullName": r.get("fullName"),
            "mathrixId": r.get("mathrixId"),
            "phone": r.get("phone"),
            "events": r.get("events", []),
            "college": r.get("college"),
        }
        for r in registrations
        if r.get("mathrixId") == q or r.get("phone") in phone_variants
    ]
    
    return {"results": matches}

@app.get("/ticket/{transactionId}")
async def get_ticket(transactionId: str):
    db = MongoDBService()
    registrations = db.get_all_registrations()
    
    # Find registration by mathrixId (preferred) or transactionId
    user_data = next((r for r in registrations if r.get('mathrixId') == transactionId or r.get('transactionId') == transactionId), None)
    
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
