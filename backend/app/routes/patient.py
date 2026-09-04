from fastapi import APIRouter,Depends

from app.config.security import get_current_user
from app.schemas.patient import CreatePatientRequest
from app.services.patient import get_all_patients, create_patient, get_patient_by_id, get_all_patient_profiles
from app.database.database_client import get_supabase_for_user
from supabase import Client

protected_patients_router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
    dependencies=[Depends(get_current_user)]
)

@protected_patients_router.get("/")
def get_patients(supabase: Client = Depends(get_supabase_for_user)):
    return get_all_patients(supabase)

@protected_patients_router.post("/")
def create(request: CreatePatientRequest, supabase: Client = Depends(get_supabase_for_user)):
    return create_patient(request, supabase)

@protected_patients_router.get("/profiles/")
def get_all_profiles(supabase: Client = Depends(get_supabase_for_user)):
    return get_all_patient_profiles(supabase)

@protected_patients_router.get("/{patient_id}/")
def get_patient(patient_id: str, supabase: Client = Depends(get_supabase_for_user)):
    return get_patient_by_id(patient_id, supabase)

