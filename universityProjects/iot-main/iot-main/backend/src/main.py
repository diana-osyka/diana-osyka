from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.subject_routes import subject_router
from .routes.lesson_routes import lesson_router
from .routes.excel_routes import excel_router
from .routes.current_routes import current_router
from .routes.attendance_routes import attendance_router
from .routes.iot_routes import iot_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(subject_router)
app.include_router(lesson_router)
app.include_router(excel_router)

app.include_router(current_router)

app.include_router(attendance_router)
app.include_router(iot_router)

