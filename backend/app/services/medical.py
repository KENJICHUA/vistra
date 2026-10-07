from app.repositories.medical_repositories import MedicalRepositories
from app.schemas.medical import MedicalVisitCreateRequest
from app.utils.service_helpers import handle_service_errors, or_404


def create_medical_record(request: MedicalVisitCreateRequest, supabase):
    try:
        medical_repository = MedicalRepositories(supabase)

        medical_visit_id = medical_repository.create(request)

        if not medical_visit_id:
            raise Exception("Failed to create medical record")

        return {
            "success": True,
            "medical_visit_id": medical_visit_id
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def get_all_medical_visits(filters, supabase):
    try:
        medical_repository = MedicalRepositories(supabase)
        response = medical_repository.get_medical_visits(filters)

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
def get_medical_record_by_id(patient_id: str, medical_visit_id: int, supabase):
    medical_repository = MedicalRepositories(supabase)
    response = medical_repository.get_medical_record(patient_id, medical_visit_id)

    return {
        "success": True,
        "data": or_404(response, "Medical record not found"),
    }


@handle_service_errors
def delete_medical_visit(medical_visit_id: int, supabase):
    medical_repository = MedicalRepositories(supabase)
    deleted = medical_repository.delete_visit(medical_visit_id)

    if or_404(deleted, "Medical record not found"):
        return {
            "success": True,
            "message": "Medical record deleted successfully"
        }
