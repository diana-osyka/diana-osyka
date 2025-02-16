# from .subject_service import get_subject_name_by_id
from ..config import db
from ..models.lesson_model import Lesson


def get_lessons_by_subject(subject_id):
    subject_ref = db.collection("predmet").document(subject_id)
    docs = db.collection("hodina").where("id_predmet", "==", subject_ref).stream()
    return [Lesson.from_firestore(doc) for doc in docs]

def add_lesson(start_time, end_time, day, email, teacher, subject_id, lab):
    lesson_ref=db.collection("hodina").add({
        "cas_od": start_time,
        "cas_do": end_time,
        "den": day,
        "email_ucitela": email,
        "meno_ucitela": teacher,
        "id_predmet": db.collection("predmet").document(subject_id),
        "miestnost": lab.capitalize(),
    })
    return lesson_ref[1]

def check_student(isic_id):
    student_ref = db.collection("student").document(isic_id)
    student_doc = student_ref.get()
    return student_doc.exists

def add_lesson_student(start_time, end_time, day, email, teacher, subject_id, lab, df):
    lesson_ref= add_lesson(start_time, end_time, day, email, teacher, subject_id, lab)

    students = []
    for index, row in df.iterrows():
        student = row.tolist()
        students.append(student)

    for student in students:
        if not check_student(student[0]):
            db.collection("student").document(student[0]).set({
                "email": student[4],
                "isic_id_cip": student[1],
                "meno": student[2],
                "priezvisko": student[3],
            })
        student_ref = db.collection("student").document(student[0])
        db.collection("student_hodina").add({
            "id_hodina":lesson_ref,
            "id_student":student_ref,
            "absencia":[]
        })


def get_students_by_lesson_id(lesson_id):
    lesson_ref = db.collection("hodina").document(lesson_id)
    students_lessons_ref = db.collection("student_hodina").where("id_hodina", "==", lesson_ref).stream()

    students = []
    for doc in students_lessons_ref:
        student_ref = doc.to_dict().get("id_student")
        student_doc = student_ref.get()
        if student_doc.exists:
            student_data = student_doc.to_dict()
            students.append({
                "id": student_doc.id,
                "name": student_data.get("meno"),
                "surname": student_data.get("priezvisko"),
                "email": student_data.get("email"),
                "id_cip_student": student_data.get("isic_id_cip")
            })
    return students