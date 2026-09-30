from datetime import date, timedelta

from app.schemas.query import FilterMedical
from app.schemas.response_dto.reponses import PaginatedResponse
from app.utils.supabase_query_builder import SupabaseQueryBuilder


class MedicalRepositories:
    def __init__(self, supabase):
        self.supabase = supabase

    def get_medical_visits(self, filters: FilterMedical):
        query = (
            SupabaseQueryBuilder(
                self.supabase,
                "medical_tab",
                columns=(
                    "id, patient_id, patient_name, course, "
                    "visit_date, staff_id, status"
                ),
                count="exact",
            )
            .order("visit_date", desc=True)
            .eq("status", filters.status)
            .eq("course", filters.course)
        )

        if filters.date:
            day = date.fromisoformat(filters.date)
            query = query.gte(
                "visit_date",
                str(day)
            ).lt(
                "visit_date",
                str(day + timedelta(days=1))
            )

        if filters.search:
            like = f"%{filters.search}%"
            query = query.or_(
                f"patient_name.ilike.{like},"
                f"patient_id.ilike.{like},"
            )

        response = (
            query
            .paginate(filters.page, filters.page_size)
            .build()
            .execute()
        )

        return PaginatedResponse(
            items=response.data or [],
            total=response.count or 0,
            page=filters.page,
            page_size=filters.page_size,
        )
