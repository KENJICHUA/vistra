from fastapi import HTTPException, status

from app.repositories.medical_repositories import MedicalRepositories


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


def delete_medical_visit(medical_visit_id: int, supabase):
    try:
        medical_repository = MedicalRepositories(supabase)
        deleted = medical_repository.delete_visit(medical_visit_id)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Medical record not found"
            )

        return {
            "success": True,
            "message": "Medical record deleted successfully"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
