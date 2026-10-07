from app.schemas.response_dto.reponses import PaginatedResponse
from app.utils.supabase_query_builder import SupabaseQueryBuilder


class PatientRepository:

    def __init__(self, supabase):
        self.supabase = supabase

    def get_by_id(self, patient_id: str):
        response = (
            self.supabase
            .table("PATIENT")
            .select("*")
            .eq("patient_id", patient_id)
            .limit(1)
            .execute()
        )

        if response:
            return response.data

        return None

    def get_all(self):
        response = (
            self.supabase
            .table("PATIENT")
            .select("*")
            .execute()
        )

        return response.data

    def create(self, patient_data):
        return (
            self.supabase
            .table("PATIENT")
            .insert(patient_data.model_dump(mode="json"))
            .execute()
        )

    def create_profile(self, patient_profile):
        return (
            self.supabase
            .table("PATIENT_PROFILE")
            .insert(patient_profile.model_dump(mode="json"))
            .execute()
        )

    def get_profiles(self, filters):

        query = (
            SupabaseQueryBuilder(
                self.supabase,
                "PATIENT_PROFILE",
                count="exact",
            )
            .eq("sex", filters.sex)
            .eq("status", filters.status)
            .eq("course_department", filters.course)
            .eq("year_section", filters.year_section)
            .eq("person_type", filters.user_type)
        )

        if filters.search:
            query.or_(
                f"first_name.ilike.%{filters.search}%,"
                f"last_name.ilike.%{filters.search}%,"
                f"patient_id.ilike.%{filters.search}%"
            )

        response = (
            query
            .paginate(
                filters.page,
                filters.page_size,
            )
            .build()
            .execute()
        )

        total = response.count or 0

        return PaginatedResponse(
            items=response.data,
            total=total,
            page=filters.page,
            page_size=filters.page_size,
        )

    def get_summary_records(self, patient_id):
        return (
            self.supabase
            .table("patient_summary")
            .select("*")
            .eq("patient_id", patient_id)
            .single()
            .execute()
        )

    def delete_profile(self, patient_id: str):
        response = (
            self.supabase.table("PATIENT_PROFILE")
            .delete()
            .eq("patient_id", patient_id)
            .execute()
        )
        return bool(response.data)

    def delete(self, patient_id: str):
        response = (
            self.supabase.table("PATIENT")
            .delete()
            .eq("patient_id", patient_id)
            .execute()
        )
        return bool(response.data)