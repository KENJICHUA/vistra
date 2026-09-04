from app.database.database_client import supabase_admin
from app.utils.email_utils import add_ucc_domain

def create_auth_user(
    user_id: str,
    password: str,
    role: str
):
    auth_email = add_ucc_domain(user_id)

    try:
        auth_response = supabase_admin.auth.admin.create_user({
            "email": auth_email,
            "password": password,
            "email_confirm": True,
            "app_metadata": {
                "role": role
            }
        })

        return {
            "success": True,
            "user": auth_response.user
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

def delete_auth_user(user_id: str):
    try:
        response = supabase_admin.auth.admin.delete_user(user_id)

        return {
            "success": True,
            "data": response
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }