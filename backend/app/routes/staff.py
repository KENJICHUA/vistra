from fastapi import APIRouter
from app.schemas.staff import CreateStaffRequest
from app.services.staff import create_staff

create_staff_router = APIRouter(
    prefix="/staff",
    tags=["Staff"]
)

@create_staff_router.post("/")
def create(request: CreateStaffRequest):
    return create_staff(request)