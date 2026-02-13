import requests
import random
import uuid
import json
import time

API_URL = "http://localhost:8000/register/bulk"
NUM_REQUESTS = 20  # Reduced to avoid too much load, checking logic mainly

# Valid data options
EVENTS = [
    "SQL – Query Quest", "MagicMatix", "Code Matrix", "Through the Lens",
    "IPL Auction", "Paper Presentation", "GoofyChess", "Math Quiz",
    "Find The Fixed Points", "Mathkinator", "Treasure Hunt"
]

def generate_dummy_attendees(num_attendees=1):
    attendees = []
    transaction_id = f"TXN_{str(uuid.uuid4())[:8]}"
    
    for i in range(num_attendees):
        uid = str(uuid.uuid4())[:8]
        # Pick 1-3 random events
        num_events = random.randint(1, 3)
        selected_events = random.sample(EVENTS, num_events)
        
        attendee = {
            "id": i + 1, # Frontend uses ID for tracking
            "fullName": f"Test User {uid}",
            "email": f"testuser_{uid}@example.com",
            "phone": f"9{random.randint(100000000, 999999999)}",
            "college": "Test College of Engineering" if random.choice([True, False]) else "CEG, Anna University",
            "course": "B.Tech",
            "specialization": "CSE",
            "year": str(random.randint(1, 4)),
            "events": selected_events,
            "workshops": [],
            "transactionId": transaction_id
        }
        attendees.append(attendee)
        
    return attendees

def run_stress_test():
    print(f"Starting BULK stress test: {NUM_REQUESTS} batches...")
    successful_registrations = 0
    total_attendees = 0
    mathrix_ids = []
    errors = []

    dummy_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82'

    start_time = time.time()

    for i in range(1, NUM_REQUESTS + 1):
        # Random group size 1-3
        group_size = random.randint(1, 3)
        attendees = generate_dummy_attendees(group_size)
        
        data = {
            'registrations': json.dumps(attendees)
        }
        files = {
            'screenshot': ('screenshot.png', dummy_image_content, 'image/png')
        }

        try:
            response = requests.post(API_URL, data=data, files=files)
            
            if response.status_code == 200:
                resp_json = response.json()
                ids = resp_json.get('ids', [])
                if ids and len(ids) == group_size:
                    successful_registrations += 1
                    total_attendees += group_size
                    mathrix_ids.extend(ids)
                    print(f"[{i}/{NUM_REQUESTS}] Success | Group Size: {group_size} | IDs: {ids}")
                else:
                    print(f"[{i}/{NUM_REQUESTS}] Partial/Failed: {response.text}")
                    errors.append(f"Request {i}: Mismatch IDs")
            else:
                print(f"[{i}/{NUM_REQUESTS}] Failed (Status {response.status_code}): {response.text}")
                errors.append(f"Request {i}: Status {response.status_code}")

        except Exception as e:
            print(f"[{i}/{NUM_REQUESTS}] Error: {str(e)}")
            errors.append(f"Request {i}: Exception {str(e)}")

    end_time = time.time()
    duration = end_time - start_time

    print("\n" + "="*40)
    print("STRESS TEST REPORT")
    print("="*40)
    print(f"Total Batches: {NUM_REQUESTS}")
    print(f"Successful Batches: {successful_registrations}")
    print(f"Total Attendees: {total_attendees}")
    print(f"Failed Batches: {len(errors)}")
    print(f"Time Taken: {duration:.2f} seconds")
    
    unique_ids = set(mathrix_ids)
    print(f"Unique Mathrix IDs: {len(unique_ids)}")
    
    if len(unique_ids) == total_attendees:
        print("\n✅ PASSED: All attendees verified unique.")
    else:
        print(f"\n❌ FAILED: Duplicate IDs found! ({len(mathrix_ids) - len(unique_ids)} duplicates)")

if __name__ == "__main__":
    run_stress_test()
