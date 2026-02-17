
import os
import logging
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "mathrix_db"
TARGET_NAME = "Lakshana R"

def find_user():
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db.registrations

        # Case-insensitive search
        query = {"fullName": {"$regex": f"^{TARGET_NAME}$", "$options": "i"}}
        
        logger.info(f"Searching for user: {TARGET_NAME}...")
        
        results = list(collection.find(query))

        if not results:
            logger.info("No user found with that name.")
            return

        print(f"\nFound {len(results)} match(es):")
        for user in results:
            print("-" * 30)
            print(f"Name: {user.get('fullName')}")
            print(f"Course: {user.get('course')}")
            print(f"Specialization: {user.get('specialization')}")
            print(f"College: {user.get('college')}")
            print(f"Email: {user.get('email')}")
            print(f"Transaction ID: {user.get('transactionId')}")
            print("-" * 30)

    except Exception as e:
        logger.error(f"An error occurred: {e}")

if __name__ == "__main__":
    find_user()
