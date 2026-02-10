import sqlite3
import json
import logging
import os
from typing import List, Dict, Optional

logger = logging.getLogger(__name__)

DB_PATH = "registrations.db"

class SQLiteService:
    def __init__(self):
        self._init_db()

    def _init_db(self):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS registrations (
                email TEXT PRIMARY KEY,
                fullName TEXT,
                phone TEXT,
                college TEXT,
                dept TEXT,
                year TEXT,
                events TEXT, -- JSON string
                workshops TEXT, -- JSON string
                transactionId TEXT,
                screenshotUrl TEXT,
                timestamp TEXT
            )
        ''')
        conn.commit()
        conn.close()

    def save_registration(self, data: Dict) -> bool:
        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            
            # Convert lists to JSON strings
            events_json = json.dumps(data.get('events', []))
            workshops_json = json.dumps(data.get('workshops', []))
            
            cursor.execute('''
                INSERT OR REPLACE INTO registrations (
                    email, fullName, phone, college, dept, year, 
                    events, workshops, transactionId, screenshotUrl, timestamp
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['email'], data['fullName'], data['phone'], data['college'], 
                data['dept'], data['year'], events_json, workshops_json, 
                data['transactionId'], data['screenshotUrl'], data['timestamp']
            ))
            
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            logger.error(f"Error saving registration: {e}")
            return False

    def get_all_registrations(self) -> List[Dict]:
        try:
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row  # To access columns by name
            cursor = conn.cursor()
            
            cursor.execute('SELECT * FROM registrations')
            rows = cursor.fetchall()
            
            data = []
            for row in rows:
                item = dict(row)
                # Parse JSON strings back to lists
                item['events'] = json.loads(item['events']) if item['events'] else []
                item['workshops'] = json.loads(item['workshops']) if item['workshops'] else []
                data.append(item)
                
            conn.close()
            return data
        except Exception as e:
            logger.error(f"Error getting all registrations: {e}")
            return []
