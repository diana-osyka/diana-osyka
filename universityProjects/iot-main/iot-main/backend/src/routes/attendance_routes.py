from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi import APIRouter

from ..config import db
from ..services.attendance_service import get_attendance_for_week_by_lesson_id, set_attendance
from ..services.current_time import get_current_week, get_current_list, get_current_day

attendance_router = APIRouter()

@attendance_router.get("/get-attendance-for-week-by-lesson-id/{lesson_id}/{week}")
async def get_attendance_for_week(lesson_id: str,week: int):
    if week>get_current_week():
        return None
    if week!=get_current_week():
        print("History of attendance")
        return get_attendance_for_week_by_lesson_id(lesson_id,week)
    else:
        print("Current week")
        lesson_ref = db.collection("hodina").document(lesson_id)
        doc = lesson_ref.get()

        if doc.exists:
            end_time_str=doc.to_dict().get("cas_do")
            today,day_lesson=get_current_day(doc.to_dict().get("den"))
            end_time = datetime.strptime(end_time_str, "%H:%M").time()
            current_time = datetime.now(ZoneInfo('Europe/Bratislava')).time()
            if (current_time >= end_time and today==day_lesson) or today>day_lesson:
                return get_attendance_for_week_by_lesson_id(lesson_id, week)
        return None

@attendance_router.get("/get-attendance-current-time/{lesson_id}")
async def get_attendance_current_time(lesson_id: str):
    print(f"Current time lesson: {lesson_id}")
    return get_current_list(lesson_id)


@attendance_router.post("/set-attendance-for-week-by-lesson-id/{lesson_id}/{week}/{isic_id}/{state}")
async def set_attendance_for_week(lesson_id: str,isic_id: str,state: bool,week: int):
    return set_attendance(lesson_id,isic_id,state,week)