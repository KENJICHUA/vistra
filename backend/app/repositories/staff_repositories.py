class StaffRepository:

    def __init__(self, supabase):
        self.supabase = supabase

    def get_by_id(self, staff_id: str):
        response = (
            self.supabase
            .table("STAFF")
            .select("*")
            .eq("staff_id", staff_id)
            .execute()
        )

        if response:
            return response.data

        return None

    def create(self, staff_data):
        return (
            self.supabase
            .table("STAFF")
            .insert(staff_data.model_dump())
            .execute()
        )

    def get_all(self):
        response = (
            self.supabase
            .table("STAFF")
            .select("*")
            .execute()
        )

        return response.data