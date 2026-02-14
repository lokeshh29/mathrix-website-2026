
import requests
import json
import uuid

# Base URL
BASE_URL = "http://localhost:8000"

def check_availability():
    try:
        response = requests.get(f"{BASE_URL}/events/availability?college=ceg")
        print(f"Availability Status Code: {response.status_code}")
        print(f"Availability Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error checking availability: {e}")

if __name__ == "__main__":
    print("--- Checking Availability for CEG Students ---")
    check_availability()
