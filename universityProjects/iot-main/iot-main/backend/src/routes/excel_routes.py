from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..services.excel_service import generate_excel_for_lesson_attendance


excel_router = APIRouter()

@excel_router.get("/download-excel-lesson/{lesson_id}")
async def download_excel(lesson_id: str):
    excel_file = generate_excel_for_lesson_attendance(lesson_id)
    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename=lesson_{lesson_id}.xlsx"}
    )
