from app.repositories.appointment_repositories import AppointmentRepository
from app.schemas.appointments import Appointments, CreateAppointmentRequest, UpdateAppointmentRequest
from app.utils.service_helpers import handle_service_errors, or_404


def create_appointment(request: CreateAppointmentRequest, supabase):
    try:
        appointment_repo = AppointmentRepository(supabase)

        response = appointment_repo.create_appointment(request.model_dump(mode="json"))
        return {
            "success": True,
            "data": response
        }
    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


def get_all_appointments(filters, supabase):
    try:
        appointment_repo = AppointmentRepository(supabase)
        response = appointment_repo.get_appointments(filters)

        return {
            "success": True,
            "data": response
        }
    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


@handle_service_errors
def get_appointment_by_id(appointment_id: int, patient_id: str, supabase):
    return {
        "success": True,
        "data": or_404(
            AppointmentRepository(supabase).get_appointment_by_id(appointment_id, patient_id),
            "Appointment not found",
        ),
    }


@handle_service_errors
def update_appointment(appointment_id: int, request: UpdateAppointmentRequest, supabase):
    appointment_repo = AppointmentRepository(supabase)
    response = appointment_repo.update_appointment(appointment_id,
                                                   request.model_dump(mode="json", exclude_unset=True))

    return {
        "success": True,
        "data": or_404(response, "Appointment not found"),
    }


@handle_service_errors
def delete_appointment(appointment_id: int, supabase):
    appointment_repo = AppointmentRepository(supabase)
    response = appointment_repo.delete_appointment(appointment_id)

    if or_404(response, "Appointment not found"):
        return {
            "success": True,
            "message": "Appointment deleted successfully"
        }
