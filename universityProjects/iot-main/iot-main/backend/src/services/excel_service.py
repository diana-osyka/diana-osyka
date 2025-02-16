from openpyxl import Workbook
import io

from ..services.current_time import get_current_week
from ..config import db


def generate_lesson_attendance_table(lesson_id):
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
            student_id_isic = student_ref.id
            weeks = {str(week): ("-" if week in absences else "p") for week in range(1, get_current_week()+1)}

            student = {
                "id_student": student_id_isic,
                "name": f"{student_name} {student_surname}",
                **weeks
            }
            result.append(student)
        else:
            print(f"Student document {student_ref.id} not found.")

    return result

def generate_excel_for_lesson_attendance(lesson_id):
    data = generate_lesson_attendance_table(lesson_id)

    wb = Workbook()
    ws = wb.active
    ws.title = "Lesson Report"

    headers = ["ISIC", "MENO"] + [str(i) for i in range(1, 14)]
    ws.append(headers)

    for student in data:
        row = [student["id_student"], student["name"]] + [student[str(week)] for week in range(1, get_current_week()+1)]
        ws.append(row)

    ws.append([" "])
    ws.append(["-", "absencia"])
    ws.append(["p", "prítomnosť"])
    for col in ws.columns:
        max_length = 0
        column = col[0].column_letter
        for cell in col:
            if cell.value:
                max_length = max(max_length, len(str(cell.value)))
        ws.column_dimensions[column].width = max_length + 2

    excel_file = io.BytesIO()
    wb.save(excel_file)
    excel_file.seek(0)
    return excel_file

