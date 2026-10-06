from fastapi import HTTPException, status

from app.repositories.staff_repositories import StaffRepository
from app.schemas.staff import StaffData, CreateStaffRequest
from app.services.auth.user import create_auth_user, delete_auth_user
from app.utils.email_utils import remove_ucc_domain
from app.utils.service_helpers import handle_service_errors, or_404


def create_staff(request: CreateStaffRequest, supabase):
    staff_id = remove_ucc_domain(request.staff_id)

    auth_response = create_auth_user(
        user_id=staff_id,
        password=request.password,
        role="staff"
    )

    if not auth_response["success"]:
        return auth_response

    user = auth_response["user"]

    staff_data = StaffData(
        id=user.id,
        staff_id=staff_id,
        **request.model_dump(
            exclude={"staff_id", "password"}
        )
    )

    db_response = insert_staff_into_db(staff_data, supabase)

    if db_response["success"]:
        return {
            "success": True,
            "message": "Staff inserted into database"
        }
    
    delete_response = delete_auth_user(user.id)

    if delete_response["success"]:
        return {
            "success": False,
            "message": db_response["message"]
        }

    return {
        "success": False,
        "message": (
            "Failed to insert staff into database and failed to delete "
            f"user from auth: {delete_response['message']}"
        )
    }

def insert_staff_into_db(staff_data : StaffData, supabase):
    try:
        staff_repo = StaffRepository(supabase)
        response = staff_repo.create(staff_data)

        return {
            "success": True,
            "data": response.data
        }
    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

def get_staff_by_id(staff_id: str, supabase):
    try:
        staff_repo = StaffRepository(supabase)
        response = staff_repo.get_by_id(staff_id)

        if response:
            return {
                "success": True,
                "data": response
            }

        return {
            "success": False,
            "message": f"Staff not found for {staff_id}"
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


@handle_service_errors
def delete_staff(staff_id: str, supabase):
    staff_repo = StaffRepository(supabase)
    existing = staff_repo.get_by_id(staff_id)
    or_404(existing, "Staff not found")

    deleted = staff_repo.delete(staff_id)
    or_404(deleted, "Staff not found")

    delete_response = delete_auth_user(existing[0]["id"])

    if not delete_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Staff deleted from database but failed "
                f"to delete user from auth: {delete_response['message']}"
            )
        )

    return {
        "success": True,
        "message": "Staff deleted successfully"
    }