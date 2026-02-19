
import os
import logging
from pymongo import MongoClient
from dotenv import load_dotenv
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from receipt.generator import draw_receipt_row
from datetime import datetime

# Configuration datetime

# Configuration
load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "mathrix_db"
OUTPUT_FILENAME = "Specific_Receipts_MCC.pdf"

MANUAL_USERS = [
    {"fullName": "Roselin Lydia P", "college": "Madras Christian College"},
    {"fullName": "Sathya C", "college": "Madras Christian College"},
    {"fullName": "Janani K", "college": "Madras Christian College"},
    {"fullName": "Anusuya S", "college": "Madras Christian College"},
    {"fullName": "Pavithra S", "college": "Madras Christian College"},
    {"fullName": "Preethi Kirthana P", "college": "Madras Christian College"}
]

def generate_specific_receipts():
    try:
        c = canvas.Canvas(OUTPUT_FILENAME, pagesize=A4)
        width, height = A4
        
        # Receipt dimensions
        receipt_height = height / 4
        
        print(f"Generating receipts for {len(MANUAL_USERS)} users...")

        # Drawing loop
        row_idx = 0
        
        for i, user_info in enumerate(MANUAL_USERS):
            if row_idx >= 4:
                c.showPage()
                row_idx = 0
            
            # Start from top of page downwards
            y = height - (row_idx * receipt_height)
            # The draw_receipt_row uses 'y' as the bottom-left corner of the receipt block?
            # Wait, let's check generator.py's implementation or logic from generate_all_receipts.py.
            # generate_all_receipts.py: y = height - (row_idx + 1) * row_height
            # So let's align with that.
            
            current_y = height - (row_idx + 1) * receipt_height
            
            # Manually construct data
            # Use defaults for missing fields
            user_data = {
                'fullName': user_info['fullName'],
                'college': user_info['college'],
                'course': '', 
                'specialization': '', 
                'year': '',
                'email': '',
                'phone': '',
                'transactionId': 'MANUAL',
                'mathrixId': f'MCC-{i+1:03d}',
                'timestamp': datetime.now().isoformat(),
                'serial_number': i + 1
            }

            draw_receipt_row(c, current_y, receipt_height, width, user_data)
            
            # Draw Divider (dashed line)
            # Only draw divider *between* rows on the same page?
            # Or at the bottom of each? Usually dashed lines are cutting guides.
            # generate_all_receipts logic:
            # if row_idx < 3:
            #      c.setDash(3, 3)
            #      c.line(0, y, width, y) 
            
            if row_idx < 3:
                 c.setDash(3, 3)
                 c.line(0, current_y, width, current_y)
                 c.setDash([]) # reset

            row_idx += 1

        c.save()
        logger.info(f"Successfully generated {OUTPUT_FILENAME}")

    except Exception as e:
        logger.error(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    generate_specific_receipts()
