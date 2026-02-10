import os
import logging
from typing import List, Dict, Optional
from pymongo import MongoClient
from pymongo.errors import PyMongoError
import gridfs
import datetime

logger = logging.getLogger(__name__)

# Default to a placeholder if not set, but it won't connect without a real URI
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "mathrix_db"

class MongoDBService:
    def __init__(self):
        try:
            self.client = MongoClient(MONGO_URI)
            self.db = self.client[DB_NAME]
            self.collection = self.db.registrations
            self.fs = gridfs.GridFS(self.db)
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise e

    def save_file(self, file_content, filename, content_type):
        try:
            # Delete if exists to avoid duplicates with same name (optional strategy)
            existing = self.fs.find_one({"filename": filename})
            if existing:
                self.fs.delete(existing._id)
            
            self.fs.put(file_content, filename=filename, content_type=content_type)
            return True
        except Exception as e:
            logger.error(f"Error saving file to GridFS: {e}")
            return False

    def get_file(self, filename):
        try:
            return self.fs.find_one({"filename": filename})
        except Exception as e:
            logger.error(f"Error retrieving file from GridFS: {e}")
            return None

    def save_registration(self, data: Dict) -> bool:
        try:
            # Use email as the unique identifier for upsert
            email = data.get('email')
            if not email:
                logger.error("No email provided for registration")
                return False

            # Update if exists, insert if new
            self.collection.update_one(
                {'email': email},
                {'$set': data},
                upsert=True
            )
            return True
        except PyMongoError as e:
            logger.error(f"Error saving registration to MongoDB: {e}")
            return False

    def get_all_registrations(self) -> List[Dict]:
        try:
            cursor = self.collection.find({}, {'_id': 0}) # Exclude _id from result
            return list(cursor)
        except PyMongoError as e:
            logger.error(f"Error getting registrations from MongoDB: {e}")
            return []

