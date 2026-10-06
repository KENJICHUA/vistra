from fastapi import APIRouter

from app.schemas.auth import LoginRequest, RefreshTokenRequest, UnifiedLoginRequest
from app.services.auth.login import login_user
from app.services.auth.staff import staff_login, auth_refresh_token


auth_router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@auth_router.post("/login/")
def unified_login(request: UnifiedLoginRequest):
    return login_user(request)

@auth_router.post("/refresh/")
def unified_refresh(request: RefreshTokenRequest):
    return auth_refresh_token(request)


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