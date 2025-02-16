from fastapi import APIRouter, Request
from bcrypt import hashpw, gensalt
from ..config import db
from ..services.subject_service import get_all_subjects, get_subject_name_by_id, add_subject, verify_subject_password

subject_router = APIRouter()

@subject_router.get("/get-subjects")

async def get_subjects():
    return [subject.__dict__ for subject in get_all_subjects()]


@subject_router.get("/get-subjects-name/{subject_id}")
async def get_name_by_id_subject(subject_id):
    doc_ref = db.collection("predmet").document(subject_id)
    doc = doc_ref.get()
    if doc.exists:
        name = doc.to_dict().get("nazov")
        print(name)
        return name
    return None



@subject_router.post("/add-subject")
async def create_subject(request: Request):
    data = await request.json()
    name = data.get("name")
    period = data.get("period")
    semester = data.get("semester")
    password = data.get("password")
    password_hash = hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')
    print(password_hash)
    add_subject(name, period, semester, password_hash)
    return {"message": "Success"}


@subject_router.get("/verify-password/{id_subject}/{password}")
async def verify_password(id_subject: str, password: str):
    if not password:
        return {"Error value is null"}

    result = verify_subject_password(id_subject, password)
    print(type(result))
    return result
