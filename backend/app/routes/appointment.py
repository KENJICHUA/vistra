from fastapi import APIRouter, Depends
from supabase import Client

from app.config.security import get_current_user
from app.database.database_client import get_supabase_for_user
from app.schemas.appointments import (CreateAppointmentRequest,UpdateAppointmentRequest)
from app.schemas.query import FilterAppointment
from app.services.appointment import (
    create_appointment,get_all_appointments,
    get_appointment_by_id,update_appointment,
    delete_appointment)

protected_appointments_router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
    dependencies=[Depends(get_current_user)]
)

@protected_appointments_router.post("/")
def create(request: CreateAppointmentRequest,supabase: Client = Depends(get_supabase_for_user)):
    return create_appointment(request, supabase)

@protected_appointments_router.get("/")
def get_appointments(filters: FilterAppointment = Depends(), supabase: Client = Depends(get_supabase_for_user)):
    return get_all_appointments(filters, supabase)

@protected_appointments_router.get("/{patient_id}/{appointment_id}")
def get_appointment(appointment_id: int, patient_id: str, supabase: Client = Depends(get_supabase_for_user)):
    return get_appointment_by_id(appointment_id , patient_id, supabase)

@protected_appointments_router.patch("/{appointment_id}/")
def update(appointment_id: int, request: UpdateAppointmentRequest,supabase: Client = Depends(get_supabase_for_user)):
    return update_appointment(appointment_id, request, supabase)

@protected_appointments_router.delete("/{appointment_id}/")
def delete(appointment_id: int,supabase: Client = Depends(get_supabase_for_user)):
    return delete_appointment(appointment_id, supabase)