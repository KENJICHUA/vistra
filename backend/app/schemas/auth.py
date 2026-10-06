from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str

class UnifiedLoginRequest(BaseModel):
    identifier: str | None = None
    email: str | None = None
    patient_id: str | None = None
    staff_id: str | None = None
    password: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str