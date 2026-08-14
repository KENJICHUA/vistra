import os

from dotenv import load_dotenv
from fastapi import FastAPI
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is missing.")

if not SUPABASE_SECRET_KEY:
    raise ValueError("SUPABASE_SECRET_KEY is missing.")

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY
)

app = FastAPI()


@app.get("/")
def root():
    return {
        "success": True,
        "message": "VISTRA API is running"
    }


@app.get("/supabase-test")
def supabase_test():
    try:
        response = (
            supabase
            .table("patient")
            .select("*")
            .limit(1)
            .execute()
        )

        return {
            "success": True,
            "data": response.data
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }