from app.schemas.query import FilterDental
from app.schemas.response_dto.reponses import PaginatedResponse
from app.utils.supabase_query_builder import SupabaseQueryBuilder


class DentalRepositories:
    def __init__(self, supabase):
        self.supabase = supabase

    def create(self, data, staff_id):
        response = (
            self.supabase
            .table("DENTAL_VISIT")
            .insert({
                "patient_id": data.patient_id,
                "last_dental_visit": data.last_dental_visit,
                "brushing_frequency": data.brushing_frequency,
                "floss": data.floss,
                "calculus_severity": data.calculus_severity,
                "current_medications": data.current_medications,
                "notes": data.notes,
                "status": data.status,
                "staff_id": staff_id,
            })
            .execute()
        )

        if not response.data:
            return None

        return response.data[0]["id"]

    def create_odontogram(
            self,
            data,
            patient_id,
            dental_record_id: int
    ):
        teeth = [
            {
                "patient_id": patient_id,
                "tooth_number": item.tooth_number,
                "is_permanent": item.dentition == "permanent",
                "condition": item.condition,
                "notes": item.notes,
                "dental_record_id": dental_record_id,
            }
            for item in data
        ]
        response = (
            self.supabase
            .table("ODONTOGRAM")
            .insert(teeth)
            .execute()
        )

        return response.data

    def get_dental_visits(self, filters: FilterDental):
        query = (
            SupabaseQueryBuilder(
                self.supabase,
                "dental_tab",
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
            query = (
                query
                .gte("visit_date", filters.date)
                .lt(
                    "visit_date",
                    filters.date + timedelta(days=1)
                )
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
