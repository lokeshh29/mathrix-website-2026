import boto3
import os
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

class S3Service:
    def __init__(self):
        self.s3_client = boto3.client('s3', region_name=os.getenv('AWS_REGION', 'us-east-1'))
        self.bucket_name = os.getenv('S3_BUCKET', 'mathrix-screenshots-2026')

    def generate_presigned_url(self, object_name: str, expiration=3600):
        """Generate a presigned URL to share an S3 object"""
        try:
            response = self.s3_client.generate_presigned_url('put_object',
                                                             Params={'Bucket': self.bucket_name,
                                                                     'Key': object_name,
                                                                     'ContentType': 'image/jpeg'},
                                                             ExpiresIn=expiration)
            return response
        except ClientError as e:
            logger.error(f"Error generating presigned URL: {e}")
            return None
