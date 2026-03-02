import csv
import os
import sys
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Add the current directory and parent directory to sys.path to import local modules
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from utils.db_service import MongoDBService

def export_4th_year_data():
    load_dotenv()
    
    try:
        db = MongoDBService()
        print("Connected to MongoDB successfully.")
        
        # Fetch all registrations
        all_registrations = db.get_all_registrations()
        print(f"Total registrations found: {len(all_registrations)}")
        
        # Filter for 3rd and 4th year students
        target_years = ['3', '4']
        filtered_data = [
            reg for reg in all_registrations 
            if str(reg.get('year', '')) in target_years
        ]
        
        if not filtered_data:
            print("No 3rd or 4th-year registrations found.")
            return

        print(f"Found {len(filtered_data)} registrations for 3rd and 4th year.")
        
        # Define CSV filename
        filename = "mathrix_3rd_and_4th_year_registrations.csv"
        
        # Fields to include in CSV
        fields = ['Full Name', 'Phone', 'Email', 'College', 'Year']
        
        with open(filename, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=fields)
            writer.writeheader()
            
            for reg in filtered_data:
                writer.writerow({
                    'Full Name': reg.get('fullName', '-'),
                    'Phone': reg.get('phone', '-'),
                    'Email': reg.get('email', '-'),
                    'College': reg.get('college', '-'),
                    'Year': reg.get('year', '-')
                })
        
        print(f"Successfully exported 3rd and 4th-year data to {filename}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    export_4th_year_data()
