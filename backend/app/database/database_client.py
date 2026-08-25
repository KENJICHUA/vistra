from app.config.settings import Config
from supabase import create_client, Client


if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in environment.")


supabase: Client = create_client(
    Config.SUPABASE_URL,
    Config.SUPABASE_KEY
)

supabase_admin: Client | None = None

if Config.SUPABASE_PRIVILEGE_KEY:
    supabase_admin = create_client(
        Config.SUPABASE_URL,
        Config.SUPABASE_PRIVILEGE_KEY
    )
