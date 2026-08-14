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

try:
    # 1. Login using Supabase Auth
    auth_response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
    })

    user = auth_response.user
    session = auth_response.session

    print("LOGIN SUCCESSFUL")
    print("Auth UUID:", user.id)
    print("Email:", user.email)
    print("Access Token:", session.access_token)

except Exception as e:
    print("LOGIN FAILED")
    print(type(e).__name__)
    print(e)