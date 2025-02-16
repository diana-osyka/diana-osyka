from ..config import db


def get_attendance_for_week_by_lesson_id(lesson_id: str, week: int):
    lesson_ref = db.collection("hodina").document(lesson_id)
    students_lessons_ref = db.collection("student_hodina").where("id_hodina", "==", lesson_ref)
    result = []

    for doc in students_lessons_ref.stream():
        student_ref = doc.to_dict().get("id_student")
        absences = doc.to_dict().get("absencia", [])
        student_doc = student_ref.get()

        if student_doc.exists:
            student_data = student_doc.to_dict()
            student_name = student_data.get("meno")
            student_surname = student_data.get("priezvisko")
            student_id_cip=student_data.get("isic_id_cip")
            student_id_isic = student_ref.id
            student={
                "lesson_id":lesson_id,
                "id_student": student_id_isic,
                "name":f"{student_name} {student_surname}",
                "id_cip_student":student_id_cip,
                "attendance":False if week in absences else True
            }
            result.append(student)
        else:
            print(f"Student document {student_ref.id} not found.")
    return result


def set_attendance(lesson_id: str,isic_id: str,state: bool ,week: int):
    lesson_ref = db.collection("hodina").document(lesson_id)
    student_ref = db.collection("student").document(isic_id)
    students_lessons_ref = db.collection("student_hodina").where("id_hodina", "==", lesson_ref).where("id_student", "==", student_ref)
    doc = next(students_lessons_ref.stream(), None)
    if doc:
        absences = doc.to_dict().get("absencia", [])
        if state and week in absences:
            absences.remove(week)
        elif not week in absences and not state:
            absences.append(week)
        db.collection("student_hodina").document(doc.id).update({"absencia": absences})
        return "Successful"
    return "Failed"

