from zoneinfo import ZoneInfo

from fastapi import APIRouter
import asyncio
from datetime import datetime
from ..services.current_time import (
    initialize_current_list,
    mark_student_attendance,
    finalize_lesson, current_list_of_students, get_lesson_end_time, get_lesson_by_date_time_and_lab, lesson_active,
    get_lesson_status,
)

iot_router = APIRouter()
lesson_task = None


@iot_router.post("/post-card-info")
async def post_card_info(data: dict):
    global lesson_task
    try:
        data_metric = data.get("metrics")[0]
        date_time_str = data_metric.get("dt")
        lab = data_metric.get("room")
        isic_id_cip = data_metric.get("value")
        print(f"=========Time: {date_time_str}, Lab: {lab}, ISIC: {isic_id_cip}")

        if not lesson_task:
            lesson_id = initialize_current_list(date_time_str, lab)
            if not lesson_id:
                return {"status": "error", "message": "No active lesson found."}
            print("Initial lesson_task")
            lesson_task = asyncio.create_task(monitor_lesson_end())

        mark_student_attendance(isic_id_cip)

        for s in current_list_of_students:
            print(f"name: {s["name"]}, attendance: {s["attendance"]}")

        return {
            "current_students": [
                {"name": s["name"], "attendance": s["attendance"]}
                for s in current_list_of_students
            ]
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def monitor_lesson_end():
    lesson_active=get_lesson_status()
    print(f"Lesson active: {lesson_active}")
    while lesson_active:
        current_time = datetime.now(ZoneInfo('Europe/Bratislava')).time()
        print("Current time: ", current_time)
        print(f"Checking end time: {get_lesson_end_time()}")
        if current_time >= get_lesson_end_time():
            print("End time reached, finalizing lesson.")
            await finalize_lesson()
            break
        await asyncio.sleep(1)




@iot_router.post("/failed-connection")
async def failed_connection(data: dict):
    try:
        data_metrics=data.get("metrics")
        date_time_str=[]
        lab=[]
        isic_id_cip=[]
        for data_metric in data_metrics:
            date_time_str=data_metric.get("dt")
            lab=data_metric.get("room")
            isic_id_cip=data_metric.get("value")
            # update_attendance()
        print(f"Time {date_time_str}. Lab: {lab}. ISIC: {isic_id_cip}")
        return {"status": "success", "message": "Data processed successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}