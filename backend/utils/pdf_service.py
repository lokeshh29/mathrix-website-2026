from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
import qrcode
import os
import io

def generate_ticket(data):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # --- Header ---
    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(colors.purple)
    c.drawString(1 * inch, height - 1 * inch, "Mathrix 2026 Ticket")
    
    # --- Mathrix ID ---
    mathrix_id = data.get('mathrixId', 'PENDING')
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 16)
    c.drawRightString(7.5 * inch, height - 1 * inch, f"ID: {mathrix_id}")
    
    c.setFont("Helvetica", 12)
    c.drawString(1 * inch, height - 1.3 * inch, "Department of Mathematics, Anna University")
    
    # --- Check for Timestamp ---
    timestamp = data.get('timestamp', 'N/A')
    c.drawString(1 * inch, height - 1.5 * inch, f"Registered on: {timestamp}")

    c.line(1 * inch, height - 1.7 * inch, 7.5 * inch, height - 1.7 * inch)

    # --- Student Details ---
    y = height - 2.5 * inch
    c.setFont("Helvetica-Bold", 14)
    c.drawString(1 * inch, y, "Attendee Details")
    y -= 0.3 * inch
    
    c.setFont("Helvetica", 12)
    details = [
        f"Name: {data.get('fullName', 'N/A')}",
        f"Email: {data.get('email', 'N/A')}",
        f"Phone: {data.get('phone', 'N/A')}",
        f"College: {data.get('college', 'N/A')}",
        f"Department: {data.get('dept', 'N/A')} (Year {data.get('year', 'N/A')})",
        f"Transaction ID: {data.get('transactionId', 'N/A')}"
    ]

    for detail in details:
        c.drawString(1.2 * inch, y, detail)
        y -= 0.25 * inch

    y -= 0.5 * inch

    # --- Events ---
    c.setFont("Helvetica-Bold", 14)
    c.drawString(1 * inch, y, "Registered Events")
    y -= 0.3 * inch
    
    c.setFont("Helvetica", 12)
    events = data.get('events', [])
    if events:
        for event in events:
            c.drawString(1.2 * inch, y, f"- {event}")
            y -= 0.25 * inch
    else:
        c.drawString(1.2 * inch, y, "No events selected")
        y -= 0.25 * inch

    # --- Workshops ---
    if data.get('workshops'):
        y -= 0.3 * inch
        c.setFont("Helvetica-Bold", 14)
        c.drawString(1 * inch, y, "Registered Workshops")
        y -= 0.3 * inch
        c.setFont("Helvetica", 12)
        for workshop in data.get('workshops', []):
            c.drawString(1.2 * inch, y, f"- {workshop}")
            y -= 0.25 * inch

    # --- QR Code ---
    # Create QR code instance
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    # Data to encode in QR (Use Transaction ID or a verification URL)
    qr_data = f"MATHRIX2026:{data.get('transactionId', 'UNKNOWN')}"
    qr.add_data(qr_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save QR code to a temporary file
    temp_qr_path = f"temp_qr_{data.get('transactionId')}.png"
    img.save(temp_qr_path)

    # Draw QR code on PDF
    # Position it at bottom right
    c.drawImage(temp_qr_path, 5.5 * inch, height - 4 * inch, width=2 * inch, height=2 * inch)
    
    # Clean up temp file
    if os.path.exists(temp_qr_path):
        os.remove(temp_qr_path)
        
    # --- Footer ---
    c.setFont("Helvetica-Oblique", 10)
    c.setFillColor(colors.gray)
    c.context.setLineWidth(1)
    c.line(1 * inch, 1 * inch, 7.5 * inch, 1 * inch)
    c.drawString(1 * inch, 0.8 * inch, "Please present this ticket at the registration desk.")
    c.drawCentredString(width / 2, 0.5 * inch, "Mathrix 2026 | mathrix.co.in")

    c.showPage()
    c.save()

    buffer.seek(0)
    return buffer
