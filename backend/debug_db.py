from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "mathrix_db"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db.registrations

# Search for the transaction ID from the screenshot
tid = "397236009183"
with open("debug_results.txt", "w") as f:
    f.write(f"Searching for transactionId: {tid}\n")
    f.write(f"Found {len(results)} records.\n")
    for reg in results:
        f.write(f"Name: {reg.get('fullName')}\n")
        f.write(f"Email: {reg.get('email')}\n")
        f.write(f"ScreenshotURL: {reg.get('screenshotUrl')}\n")
        f.write("-" * 20 + "\n")
