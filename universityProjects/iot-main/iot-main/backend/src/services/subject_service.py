import bcrypt

from ..config import db
from ..models.subject_model import Subject


def get_all_subjects():
    docs = db.collection("predmet").stream()
    return [Subject.from_firestore(doc) for doc in docs]

def get_subject_name_by_id(subject_id):
    doc = db.collection("predmet").document(subject_id).get()
    return doc.to_dict().get("nazov") if doc.exists else None

def add_subject(name, period, semester, password_hash):
    doc_ref = db.collection("predmet").document()
    doc_ref.set({
        "nazov": name,
        "heslo": password_hash,
        "obdobie": period,
        "semester": semester,
    })


def verify_subject_password(id_subject, input_password):
    try:
        subject_ref = db.collection("predmet").document(id_subject)
        doc = subject_ref.get()

        if doc.exists:
            stored_password = doc.to_dict().get("heslo")

            if bcrypt.checkpw(input_password.encode('utf-8'), stored_password.encode('utf-8')):
                return True
        return False

    except Exception as e:
        return False
