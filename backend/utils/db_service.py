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

# Global client variable to reuse connection
_client = None

def get_mongo_client():
    global _client
    if _client is None:
         # Add connectTimeoutMS and socketTimeoutMS for better fail-fast behavior
        _client = MongoClient(MONGO_URI, connectTimeoutMS=10000, socketTimeoutMS=10000)
    return _client

class MongoDBService:
    def __init__(self):
        try:
            self.client = get_mongo_client()
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
            # Use mathrixId as unique identifier to prevent overwrites (especially in bulk)
            mathrix_id = data.get('mathrixId')
            email = data.get('email')
            
            filter_query = {'mathrixId': mathrix_id} if mathrix_id else {'email': email}
            
            if not mathrix_id and not email:
                 logger.error("No mathrixId or email provided")
                 return False

            # Update if exists, insert if new
            self.collection.update_one(
                filter_query,
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

    def delete_registration(self, transactionId: str) -> bool:
        try:
            result = self.collection.delete_one({'transactionId': transactionId})
            return result.deleted_count > 0
        except PyMongoError as e:
            logger.error(f"Error deleting registration from MongoDB: {e}")
            return False


    def get_event_counts(self, college_type: Optional[str] = None) -> Dict[str, int]:
        """
        Returns a dictionary mapping event names to the number of registered 'teams'.
        - For Team registrations (teamId is set): Counts distinct teamIds.
        - For Solo registrations (teamId is None): Counts individual registrations.
        """
        try:
            pipeline = []
            
            # Match stage: filter by college if provided
            match_stage = {}
            if college_type:
                # Regex for case-insensitive 'ceg' or specific college string if needed
                if college_type.lower() == 'ceg':
                    match_stage['college'] = {'$regex': 'CEG', '$options': 'i'}
                else:
                    match_stage['college'] = {'$not': {'$regex': 'CEG', '$options': 'i'}}
            
            if match_stage:
                pipeline.append({'$match': match_stage})

            # Unwind events to count per event
            pipeline.append({'$unwind': '$events'})
            
            # Group by event and count total participants (documents)
            # Each document is one participant.
            pipeline.append({
                '$group': {
                    '_id': '$events',
                    'count': {'$sum': 1}
                }
            })
            
            # Project
            pipeline.append({
                '$project': {
                    'event': '$_id',
                    'count': 1,
                    '_id': 0
                }
            })

            cursor = self.collection.aggregate(pipeline)
            counts = {doc['event']: doc['count'] for doc in cursor}
            return counts

        except PyMongoError as e:
            logger.error(f"Error getting event counts: {e}")
            return {}
