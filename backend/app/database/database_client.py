from app.config.settings import Config
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client

security = HTTPBearer()

if not Config.supabase_url() or not Config.supabase_key():
    raise ValueError("Missing Supabase URL or key in environment.")

supabase: Client = create_client(
    Config.supabase_url(),
    Config.supabase_key()
)


def get_supabase_for_user(
        credentials: HTTPAuthorizationCredentials = Depends(security)
):
    client = create_client(
        Config.supabase_url(),
        Config.supabase_key()
    )

    client.postgrest.auth(credentials.credentials)

    return client


supabase_admin: Client | None = None

if Config.SUPABASE_PRIVILEGE_KEY:
    supabase_admin = create_client(
        Config.SUPABASE_URL,
        Config.SUPABASE_PRIVILEGE_KEY
    )
