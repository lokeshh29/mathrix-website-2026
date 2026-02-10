from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
import qrcode
import os
import io
import logging

# Ensure logging hits stdout
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16)/255.0 for i in (0, 2, 4))

def generate_ticket(data):
    try:
        logger.info(f"Generating ticket for: {data.get('email')}")
        buffer = io.BytesIO()
        c = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        # --- Colors (Safe Conversion) ---
        PURPLE = colors.Color(*hex_to_rgb("#A855F7"))
        DARK_PURPLE = colors.Color(*hex_to_rgb("#6B21A8"))
        LIGHT_GRAY = colors.Color(*hex_to_rgb("#F3F4F6"))
        TEXT_BLACK = colors.Color(*hex_to_rgb("#1F2937"))
        TEXT_GRAY = colors.Color(*hex_to_rgb("#4B5563"))
        RED_STROKE = colors.Color(*hex_to_rgb("#EF4444"))
        RED_TEXT = colors.Color(*hex_to_rgb("#B91C1C"))
        LIGHT_GRAY_TEXT = colors.Color(*hex_to_rgb("#9CA3AF"))

        # --- Modern Layout Constants ---
        MARGIN = 0.75 * inch
        CONTENT_WIDTH = width - (2 * MARGIN)
        
        # --- Background ---
        # Minimalist purple top edge
        c.setFillColor(PURPLE)
        c.rect(0, height - 0.5 * inch, width, 0.5 * inch, fill=1, stroke=0)

        # --- Header ---
        # Logo
        logo_path = os.path.join(os.path.dirname(__file__), '../../frontend/src/assets/logo.png')
        if os.path.exists(logo_path):
            c.drawImage(logo_path, MARGIN, height - 1.8 * inch, width=1 * inch, height=1 * inch, mask='auto')

        # Event Title
        c.setFont("Helvetica-Bold", 32)
        c.setFillColor(DARK_PURPLE)
        c.drawString(MARGIN + 1.2 * inch, height - 1.4 * inch, "MATHRIX 2026")
        
        c.setFont("Helvetica", 12)
        c.setFillColor(TEXT_GRAY)
        c.drawString(MARGIN + 1.25 * inch, height - 1.65 * inch, "Department of Mathematics, Anna University")

        # ID Badge (Floating Card Style)
        mathrix_id = data.get('mathrixId', 'PENDING')
        
        # ID Box
        id_box_width = 2.2 * inch
        id_box_height = 0.9 * inch
        id_x = width - MARGIN - id_box_width
        id_y = height - 1.8 * inch
        
        c.setFillColor(PURPLE)
        c.roundRect(id_x, id_y, id_box_width, id_box_height, 6, fill=1, stroke=0)
        
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(id_x + id_box_width/2, id_y + 0.6 * inch, "ADMIT CARD ID")
        c.setFont("Helvetica-Bold", 24)
        c.drawCentredString(id_x + id_box_width/2, id_y + 0.25 * inch, f"{mathrix_id}")
        
        # Reset Fill
        c.setFillColor(TEXT_BLACK)

        # --- Divider ---
        y = height - 2.2 * inch
        c.setStrokeColor(LIGHT_GRAY)
        c.setLineWidth(1)
        c.line(MARGIN, y, width - MARGIN, y)
        
        # --- Timestamp (Subtle) ---
        timestamp = data.get('timestamp', 'N/A').split('T')[0]
        c.setFont("Helvetica", 9)
        c.setFillColor(TEXT_GRAY)
        c.drawRightString(width - MARGIN, y - 0.2 * inch, f"Issued Date: {timestamp}")

        # --- Attendee Profile ---
        y -= 0.6 * inch
        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(PURPLE)
        c.drawString(MARGIN, y, "ATTENDEE PROFILE")
        y -= 0.3 * inch

        # Grid Layout for Details
        details = [
            ("FULL NAME", data.get('fullName', 'N/A')),
            ("EMAIL", data.get('email', 'N/A')),
            ("PHONE", data.get('phone', 'N/A')),
            ("COLLEGE", data.get('college', 'N/A')),
            ("DEPARTMENT", f"{data.get('dept', 'N/A')} (Year {data.get('year', 'N/A')})"),
            ("TRANSACTION ID", data.get('transactionId', 'N/A'))
        ]

        # Two columns
        col1_x = MARGIN
        col2_x = width / 2 + 0.2 * inch
        
        for i, (label, value) in enumerate(details):
            is_col2 = i % 2 != 0
            curr_x = col2_x if is_col2 else col1_x
            curr_y = y
            
            # Label (Modern uppercase gray)
            c.setFont("Helvetica-Bold", 8)
            c.setFillColor(LIGHT_GRAY_TEXT) # Lighter Gray
            c.drawString(curr_x, curr_y, label)
            
            # Value (Bold Dark)
            c.setFont("Helvetica-Bold", 11)
            c.setFillColor(TEXT_BLACK)
            c.drawString(curr_x, curr_y - 0.2 * inch, str(value))
            
            # Shift Y down every 2 items
            if is_col2:
                y -= 0.6 * inch

        y -= 0.2 * inch
        
        # --- Events Section ---
        c.setStrokeColor(LIGHT_GRAY)
        c.line(MARGIN, y, width - MARGIN, y)
        y -= 0.4 * inch
        
        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(PURPLE)
        c.drawString(MARGIN, y, "REGISTERED EVENTS")
        y -= 0.3 * inch
        
        events = data.get('events', [])
        workshops = data.get('workshops', [])
        
        # Event Bubbles (Modern Tags)
        c.setFont("Helvetica", 11)
        
        curr_x = MARGIN
        row_height = 0.4 * inch
        
        all_items = events + workshops
        if not all_items:
            c.setFillColor(TEXT_GRAY)
            c.drawString(MARGIN, y, "No events selected")
        else:
            for item in all_items:
                # Draw bullet
                c.setFillColor(PURPLE)
                c.circle(curr_x + 0.05*inch, y + 0.05*inch, 3, fill=1, stroke=0)
                
                c.setFillColor(TEXT_BLACK)
                c.drawString(curr_x + 0.2*inch, y, item)
                y -= 0.35 * inch

        # --- Security Footer (Clean) ---
        footer_y = 1.2 * inch
        c.setStrokeColor(RED_STROKE) # Red
        c.setLineWidth(1)
        c.line(MARGIN, footer_y + 0.5 * inch, width - MARGIN, footer_y + 0.5 * inch)
        
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(RED_TEXT) # Dark Red
        c.drawCentredString(width/2, footer_y + 0.25 * inch, "OFFICIAL ENTRY PASS • SECURITY CHECK REQUIRED")
        
        c.setFont("Helvetica", 9)
        c.setFillColor(TEXT_GRAY)
        c.drawCentredString(width/2, footer_y, "Please present this pass along with your valid College ID Card.")

        c.showPage()
        c.save()
        
        buffer.seek(0)
        return buffer

    except Exception as e:
        logger.error(f"Error generating PDF: {e}", exc_info=True)
        # Return a simple text PDF on error to avoid 500
        error_buffer = io.BytesIO()
        c = canvas.Canvas(error_buffer, pagesize=letter)
        c.drawString(100, 700, f"Error generating ticket: {str(e)}")
        c.save()
        error_buffer.seek(0)
        return error_buffer
