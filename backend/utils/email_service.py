import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from configs.config import SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD

logger = logging.getLogger(__name__)

def send_email_via_smtp(name: str, user_email: str, message: str) -> bool:
    """
    Sends an email using SMTP (STARTTLS).
    """
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        logger.error("Email credentials not configured.")
        return False

    try:
        # Construct the email
        msg = MIMEMultipart()
        msg["Subject"] = f"New Contact Message from {name}"
        msg["From"] = SMTP_USERNAME
        msg["To"] = "mathrix.ceg@gmail.com"  # Send to Admin
        msg["Reply-To"] = user_email # Allow replying to the user

        text = f"""
        Name: {name}
        Email: {user_email}
        
        Message:
        {message}
        """
        msg.attach(MIMEText(text, "plain"))

        # Connect using STARTTLS for port 587
        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls(context=context) # Upgrade the connection to secure
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            
        logger.info(f"Email sent successfully from {user_email}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False
