import os
import sys
from dotenv import load_dotenv

# Load env for DB connection (Must be before imports that use env vars)
load_dotenv()

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from utils.db_service import MongoDBService
from receipt.generator import draw_receipt_row

def generate_all_receipts():
    output_filename = "Mathrix_All_Receipts.pdf"
    print(f"Starting bulk receipt generation -> {output_filename}")
    
    try:
        # 1. Fetch all registrations
        db = MongoDBService()
        all_registrations = db.get_all_registrations()
        
        print(f"Total entries fetched: {len(all_registrations)}")
        
        # 2. Deduplicate
        unique_users = {}
        for reg in all_registrations:
            # Use mathrixId as primary key, fallback to email
            key = reg.get('mathrixId') or reg.get('email')
            if key and key not in unique_users:
                unique_users[key] = reg
        
        users_list = list(unique_users.values())
        print(f"Unique users after deduplication: {len(users_list)}")
        
        if not users_list:
            print("No users found. Exiting.")
            return

        # 3. Setup PDF Canvas
        c = canvas.Canvas(output_filename, pagesize=A4)
        width, height = A4
        row_height = height / 3
        
        # 4. Loop in chunks of 3
        for i in range(0, len(users_list), 3):
            # Get up to 3 users for this page
            batch = users_list[i:i+3]
            
            for row_idx, user_data in enumerate(batch):
                y = height - (row_idx + 1) * row_height
                
                # Draw User
                draw_receipt_row(c, y, row_height, width, user_data)
                
                # Draw Horizontal Divider (if not the last row on page)
                # Note: We want dividers between rows.
                if row_idx < 2:
                    c.setStrokeColor(colors.black)
                    c.setLineWidth(0.5)
                    c.setDash(3, 3)
                    c.line(0, y, width, y)
                    c.setDash([])
            
            # Finish Page
            c.showPage()
            
            if (i // 3) % 10 == 0:
                print(f"Processed page {i // 3 + 1}...")
                
        # 5. Save
        c.save()
        print(f"Successfully generated {output_filename} with {len(users_list)} receipts on {(len(users_list) + 2) // 3} pages.")
        
    except Exception as e:
        print(f"Error during bulk generation: {e}")

if __name__ == "__main__":
    generate_all_receipts()
