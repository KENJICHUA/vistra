from fastapi import APIRouter, Depends
from supabase import Client

from app.config.security import get_current_user
from app.database.database_client import get_supabase_for_user
from app.schemas.patient import CreatePatientRequest
from app.schemas.query import FilterPatient
from app.services.patient import get_all_patients, create_patient, get_patient_by_id, get_all_patient_profiles, \
    get_patient_summary_record, delete_patient

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
    print("CreatePatientRequest:", CreatePatientRequest)
    print("CreatePatientRequest type:", type(CreatePatientRequest))
    print("ROUTE request:", request)
    print("ROUTE request type:", type(request))
    return create_patient(request, supabase)

@protected_patients_router.get("/profiles/")
def get_all_profiles(filters : FilterPatient = Depends(), supabase: Client = Depends(get_supabase_for_user)):
    return get_all_patient_profiles(supabase, filters)

@protected_patients_router.get("/{patient_id}/")
def get_patient(patient_id: str, supabase: Client = Depends(get_supabase_for_user)):
    return get_patient_by_id(patient_id, supabase)

@protected_patients_router.get("/profiles/{patient_id}/")
def profile_summary(patient_id: str ,supabase: Client = Depends(get_supabase_for_user)):
    return get_patient_summary_record(supabase, patient_id)

@protected_patients_router.delete("/{patient_id}/")
def delete(patient_id: str, supabase: Client = Depends(get_supabase_for_user)):
    return delete_patient(patient_id, supabase)

