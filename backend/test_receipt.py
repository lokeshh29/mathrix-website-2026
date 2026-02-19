from receipt.generator import generate_receipt
import os

mock_data = {
    "fullName": "Test User",
    "college": "Test College",
    "transactionId": "TXN123456",
    "mathrixId": "123456",
    "email": "test@example.com",
    "phone": "9876543210",
    "year": "3",
    "course": "B.Tech",
    "specialization": "IT",
    "events": ["IPL Auction"],
    "timestamp": "2026-02-18T21:30:00"
}

buffer = generate_receipt(mock_data)

if buffer:
    with open("test_receipt.pdf", "wb") as f:
        f.write(buffer.read())
    print("Receipt generated successfully: test_receipt.pdf")
else:
    print("Failed to generate receipt")
