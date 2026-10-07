from fastapi import APIRouter, Depends
from supabase import Client

from app.config.security import get_current_user
from app.database.database_client import get_supabase_for_user
from app.services.dental import (
    create_dental_record,
    get_all_dental_visits,
    get_dental_record_by_id,
    delete_dental_visit,
)
from app.schemas.dental import DentalVisitCreateRequest
from app.schemas.query import FilterDental

protected_dental_router = APIRouter(
    prefix="/dental",
    tags=["dental"],
    dependencies=[Depends(get_current_user)]
)


@protected_dental_router.post("/")
def create(
        request: DentalVisitCreateRequest,
        supabase: Client = Depends(get_supabase_for_user),
        current_user=Depends(get_current_user)
):
    return create_dental_record(request, supabase, current_user)


@protected_dental_router.get("/")
def get_dental_visits(
        filters: FilterDental = Depends(),
        supabase: Client = Depends(get_supabase_for_user)
):
    return get_all_dental_visits(filters, supabase)


@protected_dental_router.get("/{patient_id}/{dental_visit_id}")
def get_dental_record(
        patient_id: str,
        dental_visit_id: int,
        supabase: Client = Depends(get_supabase_for_user)
):
    return get_dental_record_by_id(patient_id, dental_visit_id, supabase)


@protected_dental_router.delete("/{dental_visit_id}/")
def delete(
        dental_visit_id: int,
        supabase: Client = Depends(get_supabase_for_user)
):
    return delete_dental_visit(dental_visit_id, supabase)
