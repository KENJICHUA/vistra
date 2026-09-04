from fastapi import APIRouter

from app.schemas.auth import LoginRequest, RefreshTokenRequest
from app.services.auth.staff import staff_login, auth_refresh_token


staff_auth_router = APIRouter(
    prefix="/staff/auth",
    tags=["Staff"]
)
@staff_auth_router.post("/login/")
def login(request: LoginRequest):
    return staff_login(request)

@staff_auth_router.post("/refresh/")
def refresh(request: RefreshTokenRequest):
    return auth_refresh_token(request)