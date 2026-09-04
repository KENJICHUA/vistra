from pydantic import BaseModel


# -----------------------------
# Models
# -----------------------------

class StaffRequest(BaseModel):
    staff_id: str
    password: str
    first_name: str
    last_name: str
    middle_name: str
    position: str
    specialty: str
    phone: str
    email: str


class StaffData(BaseModel):
    id: str
    staff_id: str
    first_name: str
    last_name: str
    middle_name: str
    position: str
    specialty: str
    phone: str
    email: str


# -----------------------------
# Helpers
# -----------------------------

def remove_ucc_domain(staff_id: str):
    return staff_id.replace("@ucc.edu.ph", "")


def add_ucc_domain(staff_id: str):
    if "@ucc.edu.ph" not in staff_id:
        return f"{staff_id}@ucc.edu.ph"

    return staff_id


# -----------------------------
# Test create_staff
# -----------------------------

def create_staff(request):
    staff_id = remove_ucc_domain(request.staff_id)
    staff_auth_email = add_ucc_domain(request.staff_id)

    try:
        # Mock what Supabase Auth would normally return
        auth_user_id = "auth-user-12345"

        # Test the **request.model_dump() pattern
        staff_data = StaffData(
            id=auth_user_id,
            staff_id=staff_id,
            **request.model_dump(exclude={"staff_id", "password"})
        )

        return {
            "success": True,
            "auth_email": staff_auth_email,
            "staff": staff_data.model_dump()
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


# -----------------------------
# Test
# -----------------------------

request = StaffRequest(
    staff_id="2024-001@ucc.edu.ph",
    password="password123",
    first_name="Kenji",
    last_name="Chua",
    middle_name="Test",
    position="Doctor",
    specialty="General Medicine",
    phone="09123456789",
    email="kenji@example.com"
)

result = create_staff(request)

print("\nResult:")
print(result)