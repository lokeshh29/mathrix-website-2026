import http.client
import json
import random
import time

HOST = "localhost"
PORT = 8000

def send_request(method, path, body=None):
    conn = http.client.HTTPConnection(HOST, PORT)
    headers = {"Content-Type": "application/json"}
    try:
        if body:
            conn.request(method, path, body, headers)
        else:
            conn.request(method, path, headers=headers)
        response = conn.getresponse()
        data = response.read().decode('utf-8')
        conn.close()
        return response.status, data
    except Exception as e:
        print(f"Request Failed: {e}")
        return 0, str(e)

def register_participant(i):
    # Generate unique details
    email = f"test_user_{i}_{random.randint(1000,9999)}@ceg.annauniv.edu"
    name = f"Test User {i}"
    phone = f"987654321{i}"
    
    # Payload for a CEG student registering for IPL Auction
    attendee = {
        "fullName": name,
        "email": email,
        "phone": phone,
        "college": "CEG, Anna University",
        "course": "B.E.",
        "specialization": "CSE",
        "year": "3",
        "events": ["IPL Auction"], # Restricted Event
        "workshops": [],
        "transactionId": "" # Free for CEG
    }
    
    # Bulk endpoint usually expects form-data for file upload, but we can try sending JSON if backend supports it?
    # Wait, the backend uses `registrations: str = Form(...)`.
    # So we need to send it as form data.
    # http.client for multipart is painful.
    # Let's use `requests` but if it fails, I'll switch to `curl` commands via subprocess.
    pass

import urllib.request
import urllib.parse

def register_participant_form(i):
    email = f"test_user_{i}_{random.randint(1000,9999)}@ceg.annauniv.edu"
    registrations_json = json.dumps([{
        "fullName": f"Test User {i}",
        "email": email,
        "phone": f"987654321{i}",
        "college": "CEG, Anna University",
        "course": "B.E.",
        "specialization": "CSE",
        "year": "3",
        "events": ["Math Wizz"], # Testing Math Wizz Limit (6)
        "workshops": [],
        "transactionId": ""
    }])
    
    # Encode as form data
    data = urllib.parse.urlencode({'registrations': registrations_json}).encode('utf-8')
    req = urllib.request.Request(f"http://{HOST}:{PORT}/register/bulk", data=data)
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Request {i}: Status {response.getcode()} - Success")
            return True
    except urllib.error.HTTPError as e:
        print(f"Request {i} Failed: {e.code} - {e.read().decode('utf-8')}")
        return False
    except Exception as e:
        print(f"Request {i} Error: {e}")
        return False

def check_availability():
    try:
        with urllib.request.urlopen(f"http://{HOST}:{PORT}/events/availability?college=ceg") as response:
            data = json.loads(response.read().decode('utf-8'))
            print("\n--- Availability ---")
            event_data = data.get("Math Wizz", {})
            print(f"Math Wizz: Count={event_data.get('count')}, Limit={event_data.get('limit')}, Full={event_data.get('isFull')}")
            print("--------------------\n")
    except Exception as e:
        print(f"Check Availability Failed: {e}")

if __name__ == "__main__":
    print("Starting Test: Registering 7 participants for Math Wizz...")
    check_availability()
    
    for i in range(1, 8):
        # Register 1 person at a time to test incremental limit
        register_participant_form(i)
        # check_availability() # Optional: check after each to see count increment
        time.sleep(0.5)
        
    check_availability()
