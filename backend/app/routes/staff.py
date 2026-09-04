from fastapi import APIRouter, Depends

from app.config.security import get_current_user
from app.schemas.staff import CreateStaffRequest
from app.services.staff import create_staff, get_staff_by_id
from app.database.database_client import get_supabase_for_user

protected_staff_router = APIRouter(
    prefix="/staff",
    tags=["Staff"],
    dependencies=[Depends(get_current_user)]
)

@protected_staff_router.post("/")
def create(request: CreateStaffRequest, supabase=Depends(get_supabase_for_user)):
    return create_staff(request, supabase)

@protected_staff_router.get("/{staff_id}/")
def get_by_id(staff_id: str, supabase=Depends(get_supabase_for_user)):
    return get_staff_by_id(staff_id, supabase)
