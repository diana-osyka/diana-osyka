from fastapi import APIRouter

from ..services.current_time import get_current_week

current_router = APIRouter()

@current_router.get("/get-current-week")
async def get_current_week_for_web():
    return get_current_week()