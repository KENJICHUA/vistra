from app.schemas.dental import DentalVisitCreateRequest

from app.repositories.dental_repositories import DentalRepositories
from app.utils.email_utils import staff_id_format


def create_dental_record(request: DentalVisitCreateRequest, supabase, current_user):
    try:
        staff_id = staff_id_format(current_user.email)
        dental_repository = DentalRepositories(supabase)

        dental_record_id = dental_repository.create(request, staff_id)

        print("dental_record_id", request)
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