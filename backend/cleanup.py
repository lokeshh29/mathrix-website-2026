import os
import logging
from pymongo import MongoClient

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use the same URI logic as db_service, or allow override
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "mathrix_db"

def cleanup_test_data():
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db.registrations
        
        # Criteria for identifying test users created by stress_test.py
        # They all have "Test User" in fullName and "TXN_" in transactionId
        query = {
            "fullName": {"$regex": "^Test User"},
            "transactionId": {"$regex": "^TXN_"}
        }
        
        # Count before delete
        count = collection.count_documents(query)
        
        if count == 0:
            logger.info("No test data found to clean up.")
            return

        print(f"Found {count} test entries. Deleting...")
        
        # Delete
        result = collection.delete_many(query)
        
        print(f"Deleted {result.deleted_count} documents.")
        
        # Optional: Clean up GridFS chunks? 
        # This is harder without the file IDs unless we tracked them.
        # But for 'remove the datas from the mongo db', removing the registration docs is primary.
        # Ideally we should also remove the images from GridFS to save space.
        
        # Start simplistic GridFS cleanup (warning: this is expensive if many files)
        # We can find files that have filenames matching the pattern logic if we know it.
        # Logic was: filename = f"{transactionId}_{email}.{file_extension}"
        
        import gridfs
        fs = gridfs.GridFS(db)
        
        # Find files matching our test pattern (filenames contain TXN_ and testuser)
        # GridFS doesn't support regex find easily on filename in all versions, 
        # but we can query fs.files collection.
        
        files_collection = db["fs.files"]
        file_query = {"filename": {"$regex": "^TXN_.*testuser"}}
        files_to_delete = files_collection.find(file_query)
        
        file_count = 0
        for f in files_to_delete:
            fs.delete(f._id)
            file_count += 1
            
        print(f"Deleted {file_count} associated files from GridFS.")

    except Exception as e:
        logger.error(f"Error during cleanup: {e}")

if __name__ == "__main__":
    # Safety Check
    confirm = input(f"About to delete test data from DB at {MONGO_URI}. Type 'yes' to proceed: ")
    if confirm.lower() == 'yes':
        cleanup_test_data()
    else:
        print("Cleanup aborted.")
