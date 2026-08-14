from fastapi import APIRouter

from app.schemas.auth import LoginRequest
from app.services.auth.staff import staff_login


staff_auth_router = APIRouter(
    prefix="/staff/auth",
    tags=["Staff"]
)
@staff_auth_router.post("/login")
def login(request: LoginRequest):
    return staff_login(request)