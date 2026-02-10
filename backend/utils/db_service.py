import boto3
import os
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

class DynamoDBService:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb', region_name=os.getenv('AWS_REGION', 'us-east-1'))
        self.table_name = os.getenv('DYNAMODB_TABLE', 'MathrixRegistrations')
        self.table = self.dynamodb.Table(self.table_name)

    def save_registration(self, data: dict):
        try:
            self.table.put_item(Item=data)
            return True
        except ClientError as e:
            logger.error(f"Error saving registration: {e}")
            return False

    def get_registration(self, email: str):
        try:
            response = self.table.get_item(Key={'email': email})
            return response.get('Item')
        except ClientError as e:
            logger.error(f"Error getting registration: {e}")
            return None

    def get_all_registrations(self):
        try:
            response = self.table.scan()
            data = response.get('Items', [])
            while 'LastEvaluatedKey' in response:
                response = self.table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
                data.extend(response.get('Items', []))
            return data
        except ClientError as e:
            logger.error(f"Error getting all registrations: {e}")
            return []
