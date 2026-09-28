from fastapi import APIRouter, Depends
from supabase import Client

from app.config.security import get_current_user
from app.database.database_client import get_supabase_for_user
from app.services.dental import create_dental_record, get_all_dental_visits
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
