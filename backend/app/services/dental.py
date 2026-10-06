from app.schemas.dental import DentalVisitCreateRequest

from app.repositories.dental_repositories import DentalRepositories
from app.utils.email_utils import staff_id_format
from app.utils.service_helpers import handle_service_errors, or_404


def create_dental_record(request: DentalVisitCreateRequest, supabase, current_user):
    try:
        staff_id = staff_id_format(current_user.email)
        dental_repository = DentalRepositories(supabase)

        dental_record_id = dental_repository.create(request, staff_id)

        if not dental_record_id:
            raise Exception("Failed to create dental record")

        dental_repository.create_odontogram(
            request.tooth_records,
            request.patient_id,
            dental_record_id
        )

        return {
            "success": True,
            "dental_record_id": dental_record_id
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def get_all_dental_visits(filters, supabase):
    try:
        dental_repository = DentalRepositories(supabase)
        response = dental_repository.get_dental_visits(filters)

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
def delete_dental_visit(dental_visit_id: int, supabase):
    dental_repository = DentalRepositories(supabase)
    dental_repository.delete_odontogram_by_visit(dental_visit_id)
    deleted = dental_repository.delete_visit(dental_visit_id)

    if or_404(deleted, "Dental record not found"):
        return {
            "success": True,
            "message": "Dental record deleted successfully"
        }


@handle_service_errors
def get_dental_record_by_id(patient_id: str, dental_visit_id: int, supabase):
    dental_repository = DentalRepositories(supabase)
    response = dental_repository.get_dental_record(patient_id, dental_visit_id)

    return {
        "success": True,
        "data": or_404(response, "Dental record not found"),
    }