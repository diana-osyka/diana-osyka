import os

import firebase_admin
from firebase_admin import credentials, firestore

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

KEY_PATH = os.path.join(BASE_DIR, "key_database.json")

cred = credentials.Certificate(KEY_PATH)
firebase_admin.initialize_app(cred)

db = firestore.client()
