import io

import pandas as pd
from fastapi import APIRouter, Request, UploadFile, File
from ..config import db
from ..services.lesson_service import get_lessons_by_subject, add_lesson_student

lesson_router = APIRouter()

@lesson_router.get("/get-lessons/{subject_id}")
async def get_lessons(subject_id: str):
    return [lesson.__dict__ for lesson in get_lessons_by_subject(subject_id)]

@lesson_router.post("/add-lesson/{subject_id}")
# async def create_lesson(subject_id: str,start_time: str,end_time: str,day: str,email: str,teacher: str,lab: str,excel_file: UploadFile = File(...)):
async def create_lesson(request: Request, subject_id: str):
    form = await request.form()
    start_time = form.get("start_time")
    end_time = form.get("end_time")
    day = form.get("day")
    email = form.get("email")
    teacher = form.get("teacher")
    lab = form.get("lab")
    excel_file = form.get("excelFile")

    # print(f"Adding lesson: {start_time}, {end_time}, {day}, {teacher}, {lab}")
    # print(f"Subject ID: {subject_id}")
    # print(f"Excel data: {excel_file}")

    if not all([start_time, end_time, day, teacher, subject_id, lab, excel_file]):
        return {"error": "Invalid values"}
    try:
        content = await excel_file.read()
        df = pd.read_excel(io.BytesIO(content), header=None)

        add_lesson_student(start_time, end_time, day, email, teacher, subject_id, lab, df)
        return {"message": "Success"}
    except Exception as e:
        return {"error": f"Error: {str(e)}"}


@lesson_router.get("/check-isic-id/{id_lesson}/{isic_id}")
async def check_isic_id_exists(id_lesson: str, isic_id: str):
    try:

        student_ref = db.collection("student").document(isic_id)
        lesson_ref = db.collection("hodina").document(id_lesson)

        students_lessons_ref = db.collection("student_hodina").where("id_student", "==", student_ref).where("id_hodina", "==", lesson_ref)

        doc = next(students_lessons_ref.stream(), None)

        if doc:
            absences = doc.to_dict().get("absencia", [])
            print(f"Document ID: {doc.id}, Absences: {absences}")
            return absences, len(absences)
        else:
            print(f"Not found.")
            return None

    except Exception as e:
        print(f"Error: {str(e)}")
        return None


@lesson_router.delete("/delete-student-on-the-lesson/{id_lesson}")
async def delete_student_on_the_lesson(id_lesson: str):
    lesson_ref=db.collection("hodina").document(id_lesson)
    docs = db.collection("student_hodina").where("id_hodina", "==", lesson_ref).stream()
    try:
        for doc in docs:
            print(f"Delete document with ID: {doc.id}")
            db.collection("student_hodina").document(doc.id).delete()
        return {"Success"}
    except Exception as e:
        return {"error": f"Error: {str(e)}"}