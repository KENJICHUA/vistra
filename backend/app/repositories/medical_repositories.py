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
            query = query.date_day("visit_date", filters.date)

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

    def delete_visit(self, medical_visit_id: int):
        response = (
            self.supabase.table("MEDICAL_VISIT")
            .delete()
            .eq("id", medical_visit_id)
            .execute()
        )
        return bool(response.data)

    def create(self, data):
        visit_log = data.visit_log[0] if data.visit_log else None

        response = (
            self.supabase
            .table("MEDICAL_VISIT")
            .insert({
                "patient_id": data.patient_id,
                "staff_id": data.staff_id,
                "type": data.type.value,
                "visit_date": data.visit_date.isoformat(),
                "visit_log": {
                    "date": data.visit_date.isoformat(),
                    "complaint": visit_log.complaint if visit_log else "",
                    "treatment": visit_log.treatment if visit_log else "",
                },
                "status": data.status.value,
            })
            .execute()
        )

        if not response.data:
            return None

        return response.data[0]["id"]
