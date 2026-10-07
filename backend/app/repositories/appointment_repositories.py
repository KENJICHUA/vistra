from app.schemas.response_dto.reponses import PaginatedResponse
from app.utils.supabase_query_builder import SupabaseQueryBuilder


class AppointmentRepository:
    def __init__(self, supabase):
        self.supabase = supabase

    def create_appointment(self, appointment_data):
        response = (
            self.supabase
            .table("APPOINTMENT")
            .insert(appointment_data)
            .execute()
        )

        if response.data:
            return response.data[0]

        return None

    def get_appointments(self, filters):
        query = (
            SupabaseQueryBuilder(
                self.supabase,
                "APPOINTMENT",
                columns="""
                    *,
                    PATIENT(
                        PATIENT_PROFILE(
                            first_name,
                            middle_name,
                            last_name,
                            course
                        )
                    )
                """,
                count="exact"
            )
            .order("scheduled_start")
            .eq("status", filters.status)
            .eq("type", filters.type)
            .eq("course", filters.course)
        )

        if filters.date:
            query = query.date_day("scheduled_start", filters.date)

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

        items = [
            self._map_appointment(appointment)
            for appointment in response.data
        ]

        return PaginatedResponse(
            items=items,
            total=total,
            page=filters.page,
            page_size=filters.page_size,
        )

    def get_appointment_by_id(self, appointment_id: int, patient_id: str):
        response = (
            self.supabase
            .table("APPOINTMENT")
            .select("""
                *,
                PATIENT(
                    PATIENT_PROFILE(
                        first_name,
                        middle_name,
                        last_name,
                        course
                    )
                )
            """)
            .eq("id", appointment_id)
            .eq("patient_id", patient_id)
            .limit(1)
            .execute()
        )

        if not response.data:
            return None

        return self._map_appointment(response.data[0])

    def update_appointment(self, appointment_id: int, updated_appointment_data: dict):
        response = (
            self.supabase
            .table("APPOINTMENT")
            .update(updated_appointment_data)
            .eq("id", appointment_id)
            .execute()
        )

        if response.data:
            return response.data[0]

        return None

    def delete_appointment(self, appointment_id: int):
        response = (
            self.supabase.table("APPOINTMENT")
            .delete()
            .eq("id", appointment_id)
            .execute()
        )
        return bool(response.data)

    @staticmethod
    def _map_appointment(appointment):
        patient = appointment.pop("PATIENT", {})
        profile = patient.get("PATIENT_PROFILE", {})

        return {
            **appointment,
            "first_name": profile.get("first_name"),
            "middle_name": profile.get("middle_name"),
            "last_name": profile.get("last_name"),
            "course": profile.get("course"),
        }
