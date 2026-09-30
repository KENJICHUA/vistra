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
