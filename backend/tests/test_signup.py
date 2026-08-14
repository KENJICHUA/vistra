import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
)

email = "20249573-S@UCC.com"
password = "TestPassword123!"
school_id = email.split('@')[0]

first_name = "John"
last_name = "Doe"

try:
    # 1. Create Supabase Auth user
    auth_response = supabase.auth.sign_up({
        "email": email,
        "password": password,
        "email_confirm": True
    })

    user = auth_response.user

    print("AUTH USER CREATED")
    print("Auth UUID:", user.id)

    # 2. Create PATIENT record using the Auth UUID
    patient_response = supabase.table("PATIENT").insert({
        "id": user.id,
        "first_name": first_name,
        "school_id": school_id,
        "last_name": last_name
    }).execute()

    print("PATIENT RECORD CREATED")
    print(patient_response.data)

except Exception as e:
    print("FAILED")
    print(type(e).__name__)
    print(e)