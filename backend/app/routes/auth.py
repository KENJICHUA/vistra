from fastapi import APIRouter

from app.schemas.auth import RefreshTokenRequest, LoginRequest
from app.services.auth.login import login_user
from app.services.auth.staff import auth_refresh_token


auth_router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@auth_router.post("/login/")
def login(request: LoginRequest):
    return login_user(request)

@auth_router.post("/refresh/")
def refresh(request: RefreshTokenRequest):
    return auth_refresh_token(request)
