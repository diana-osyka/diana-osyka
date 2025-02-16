from datetime import datetime, timedelta
from ..config import db
from ..services.lesson_service import get_students_by_lesson_id

current_list_of_students = []
lesson_active = False
lesson_end_time=None
lesson_id=None

current_week = 7


weeks = [
    "23.09.2024", "30.09.2024", "07.10.2024", "14.10.2024", "21.10.2024",
    "28.10.2024", "04.11.2024", "11.11.2024", "18.11.2024", "25.11.2024",
    "02.12.2024", "09.12.2024", "16.12.2023"
]


def get_current_week():
    return current_week

def get_current_day(day):
    today = datetime.today().weekday()

    days_map = {
        0: "Pondelok",
        1: "Utorok",
        2: "Streda",
        3: "Štvrtok",
        4: "Piatok",
        5: "Sobota",
        6: "Nedela",
    }
    day_number = None
    for key, value in days_map.items():
        if value == day:
            day_number = key
            break
    return today,day_number

def get_lesson_by_date_time_and_lab(date_time_str, lab):
    global lesson_end_time
    date_time_obj = datetime.fromisoformat(date_time_str)

    days_map = {
        0: "Pondelok",
        1: "Utorok",
        2: "Streda",
        3: "Štvrtok",
        4: "Piatok",
        5: "Sobota",
        6: "Nedela",
    }
    day_of_week = days_map[date_time_obj.weekday()]

    current_time = (date_time_obj + timedelta(hours=1)).time()

    print(f"Day of week: {day_of_week}, Adjusted time: {current_time}")
    lessons_ref = db.collection("hodina").where("den", "==", day_of_week).where("miestnost", "==", lab.capitalize()).stream()

    for lesson in lessons_ref:
        lesson_data = lesson.to_dict()
        start_time = datetime.strptime(lesson_data["cas_od"], "%H:%M").time()
        lesson_end_time = datetime.strptime(lesson_data["cas_do"], "%H:%M").time()

        if start_time <= current_time <= lesson_end_time:
            return lesson.id
    lesson_end_time = None
    return None


def initialize_current_list(date_time_str, lab):
    global current_list_of_students, lesson_active,lesson_id
    print("Start initialize")
    if lesson_active:
        print("Lesson already active.")
        return None

    lesson_id = get_lesson_by_date_time_and_lab(date_time_str, lab)
    if not lesson_id:
        print("No lesson found.")
        return None
    print(f"Lesson found! {lesson_id}")
    student_list = get_students_by_lesson_id(lesson_id)
    current_list_of_students.clear()
    for student in student_list:
        student_entry = {
            "lesson_id": lesson_id,
            "id_student": student["id"],
            "name": f"{student['name']} {student['surname']}",
            "id_cip_student": student["id_cip_student"],
            "attendance": False,
        }
        current_list_of_students.append(student_entry)

    lesson_active = True
    return lesson_id


def mark_student_attendance(isic_id_cip):
    if not current_list_of_students:
        print("No active lesson or student list.")
        return

    for student in current_list_of_students:
        if student["id_cip_student"] == isic_id_cip:
            student["attendance"] = True
            print(current_list_of_students)
            break
    print(f"student {isic_id_cip} is successfully mark attendance.")

def get_lesson_end_time():
    global lesson_end_time
    return lesson_end_time

async def finalize_lesson():
    global current_list_of_students, lesson_active
    print("Finalizing lesson. Attendance data:")
    print(current_list_of_students)
    save_in_database(current_list_of_students)
    current_list_of_students = []
    lesson_active = False
    print("Lesson finalized successfully.")


def save_in_database(current_list_of_students):
    print("///// Start saving //////")
    lesson_ref=db.collection("hodina").document(lesson_id)
    for student in current_list_of_students:
        student_id=student.get("id_student")
        student_ref=db.collection("student").document(student_id)
        student_lessons_ref=db.collection("student_hodina").where("id_hodina","==",lesson_ref).where("id_student","==",student_ref)
        doc = next(student_lessons_ref.stream(), None)
        if doc:
            absences = doc.to_dict().get("absencia", [])
            if not student.get("attendance") and current_week not in absences:
                absences.append(current_week)
                db.collection("student_hodina").document(doc.id).update({"absencia": absences})
    print("/////// Saving was successful. ////////")

def get_current_list(id):
    global lesson_id
    if id==lesson_id:
        print(f"Get current list: {current_list_of_students}")
        return current_list_of_students
    return None

def get_lesson_status():
    global lesson_active
    return lesson_active

# def update_attendance()