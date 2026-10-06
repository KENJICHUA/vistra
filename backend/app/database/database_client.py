from app.config.settings import Config
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client

security = HTTPBearer()


def _base_client(key: str | None = None) -> Client:
    return create_client(
        Config.supabase_url(),
        key or Config.supabase_key(),
    )


if not Config.supabase_url() or not Config.supabase_key():
    raise ValueError("Missing Supabase URL or key in environment.")

supabase: Client = _base_client()


def get_supabase_for_user(
        credentials: HTTPAuthorizationCredentials = Depends(security)
):
    client = _base_client()

    client.postgrest.auth(credentials.credentials)

    return client


supabase_admin: Client | None = None

if Config.supabase_privilege_key():
    supabase_admin = _base_client(Config.supabase_privilege_key())
