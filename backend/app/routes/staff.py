from fastapi import APIRouter, Depends

from app.schemas.staff import CreateStaffRequest
from app.services.staff import create_staff, get_staff_by_id
from app.config.security import get_current_user

create_staff_router = APIRouter(
    prefix="/staff",
    tags=["Staff"],
    dependencies=[Depends(get_current_user)]
)
get_staff_by_id_router = APIRouter(
    prefix="/staff/{staff_id}",
    tags=["Staff"],
    dependencies=[Depends(get_current_user)]
)
@create_staff_router.post("/")
def create(request: CreateStaffRequest):
    return create_staff(request)

@get_staff_by_id_router.get("/")
def get_by_id(staff_id):
    return get_staff_by_id(staff_id)
