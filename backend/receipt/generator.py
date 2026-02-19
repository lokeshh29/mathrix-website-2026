from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
import os
import io
import logging

logger = logging.getLogger(__name__)

from reportlab.lib.utils import simpleSplit

def draw_receipt_panel(c, x, y, width, height, data, copy_type):
    """Draws a single receipt panel (half-width, 1/3-height)"""
    
    # --- Layout Constants ---
    MARGIN = 0.2 * inch
    inner_width = width - 2 * MARGIN
    
    # --- Logos ---
    # Left: Colloquium
    colloquium_logo_path = os.path.join(os.path.dirname(__file__), '../../frontend/src/assets/mathematics_colloquium_logo.jpeg')
    # Right: Mathrix
    mathrix_logo_path = os.path.join(os.path.dirname(__file__), '../../frontend/src/assets/logo.png')
    
    logo_size = 0.6 * inch
    logo_y = y + height - 0.8 * inch # Top of logo

    if os.path.exists(colloquium_logo_path):
        c.drawImage(colloquium_logo_path, x + MARGIN, logo_y, width=logo_size, height=logo_size, mask='auto')
        
    if os.path.exists(mathrix_logo_path):
        c.drawImage(mathrix_logo_path, x + width - MARGIN - logo_size, logo_y, width=logo_size, height=logo_size, mask='auto')

    # --- Header Text (Center) ---
    center_x = x + width / 2
    header_y = y + height - 0.3 * inch
    
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(center_x, header_y, "MATHEMATICS COLLOQUIUM")
    
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(center_x, header_y - 0.15 * inch, "Department of Mathematics")
    c.drawCentredString(center_x, header_y - 0.30 * inch, "Anna University, Chennai - 600 025")
    c.drawCentredString(center_x, header_y - 0.45 * inch, "MATHRIX '26")
    
    c.setFont("Helvetica-Oblique", 7)
    c.drawCentredString(center_x, header_y - 0.60 * inch, f"({copy_type})")
    
    # --- Content ---
    content_y = y + height - 1.2 * inch
    
    college = data.get('college', '')
    is_ceg = 'ceg' in college.lower() if college else False
    amount = "0" if is_ceg else "100"
    name = data.get('fullName', '__________________')
    
    c.setFont("Helvetica", 9)
    line_height = 0.25 * inch
    
    # Text Lines
    c.drawString(x + MARGIN, content_y, f"Received with thanks a sum of Rupees {amount}/-")
    content_y -= line_height
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x + MARGIN, content_y, f"from {name},")
    c.setFont("Helvetica", 9)
    content_y -= line_height
    
    # College Line (Wrapped)
    # Use simpleSplit to wrap text within the panel width
    max_text_width = width - 2 * MARGIN
    wrapped_college = simpleSplit(f"{college},", "Helvetica", 9, max_text_width)
    
    for line in wrapped_college:
        c.drawString(x + MARGIN, content_y, line)
        content_y -= line_height

    c.drawString(x + MARGIN, content_y, "towards Registration fee for Mathrix '26 conducted on 20/02/2026.")
    
    # --- Footer ---
    footer_y = y + 0.3 * inch
    c.setFont("Helvetica-Oblique", 8)
    c.drawRightString(x + width - MARGIN, footer_y, "Treasurer")
    
    # --- Details ---
    c.setFont("Helvetica", 7)
    c.drawString(x + MARGIN, footer_y, f"ID: {data.get('mathrixId', 'N/A')}")
    c.drawString(x + MARGIN, footer_y - 0.12 * inch, f"Date: {data.get('timestamp', '').split('T')[0]}")
    c.drawString(x + MARGIN, footer_y - 0.24 * inch, f"Private Key: {data.get('serial_number', 'N/A')}")


def draw_receipt_row(c, y, row_height, width, data):
    """Draws a single row containing Office Copy (Left) and Student Copy (Right) for one user"""
    col_width = width / 2
    
    # Left Panel (Office Copy)
    draw_receipt_panel(c, 0, y, col_width, row_height, data, "Office Copy")
    
    # Right Panel (Student Copy)
    draw_receipt_panel(c, col_width, y, col_width, row_height, data, "Student Copy")
    
    # Draw Separator Lines
    c.setStrokeColor(colors.black)
    c.setLineWidth(0.5)
    c.setDash(3, 3) # Dotted line
    
    # Vertical Line (Middle)
    c.line(col_width, y, col_width, y + row_height)
    
    c.setDash([]) # Reset dash

def generate_receipt(data):
    try:
        buffer = io.BytesIO()
        c = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        
        # Default behavior for single user generation:
        # Draw just one row at the top? Or 3 copies?
        # User's previous request was 3 copies per page. 
        # But for the SINGLE receipt endpoint, maybe they still want 3 copies of the SAME user?
        # Or maybe just 1 copy? 
        # Typically for a download, 1 copy is enough, but to be safe with "3 copies in one a4", 
        # I'll stick to 3 copies of SAME user for the single download endpoint.
        
        row_height = height / 3
        
        for row in range(3):
            y = height - (row + 1) * row_height
            draw_receipt_row(c, y, row_height, width, data)
            
            # Horizontal Line (Bottom of row, except last)
            if row < 2:
                c.setStrokeColor(colors.black)
                c.setLineWidth(0.5)
                c.setDash(3, 3)
                c.line(0, y, width, y)
                c.setDash([])

        c.showPage()
        c.save()
        
        buffer.seek(0)
        return buffer
        
    except Exception as e:
        logger.error(f"Error generating receipt: {e}", exc_info=True)
        return None
