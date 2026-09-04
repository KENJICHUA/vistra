from app.config.settings import Config
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client

security = HTTPBearer()

if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in environment.")

supabase: Client = create_client(
    Config.SUPABASE_URL,
    Config.SUPABASE_KEY
)


def get_supabase_for_user(
        credentials: HTTPAuthorizationCredentials = Depends(security)
):
    client = create_client(
        Config.SUPABASE_URL,
        Config.SUPABASE_KEY
    )

    client.postgrest.auth(credentials.credentials)

    return client


supabase_admin: Client | None = None

if Config.SUPABASE_PRIVILEGE_KEY:
    supabase_admin = create_client(
        Config.SUPABASE_URL,
        Config.SUPABASE_PRIVILEGE_KEY
    )
