from fastapi import APIRouter, Depends
from supabase import Client

from app.config.security import get_current_user
from app.database.database_client import get_supabase_for_user
from app.schemas.query import FilterMedical
from app.services.medical import get_all_medical_visits, delete_medical_visit

protected_medical_router = APIRouter(
    prefix="/medical",
    tags=["medical"],
    dependencies=[Depends(get_current_user)]
)


@protected_medical_router.get("/")
def get_medical_visits(
        filters: FilterMedical = Depends(),
        supabase: Client = Depends(get_supabase_for_user)
):
    return get_all_medical_visits(filters, supabase)


@protected_medical_router.delete("/{medical_visit_id}/")
def delete(
        medical_visit_id: int,
        supabase: Client = Depends(get_supabase_for_user)
):
    return delete_medical_visit(medical_visit_id, supabase)
