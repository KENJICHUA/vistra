from fastapi import HTTPException
from app.database.database_client import supabase
from app.services.auth.login import login_user
from app.utils.email_utils import add_ucc_domain, staff_id_format


def staff_login(request):
    return login_user(request)

def auth_refresh_token(request):
    try:
        auth_response = supabase.auth.refresh_session(
            request.refresh_token
        )

        session = auth_response.session

        if not session:
            raise HTTPException(
                status_code=401,
                detail="Invalid or expired refresh token"
            )

        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token
        }

    except HTTPException:
        raise

    except Exception as e:
        print(f"Token refresh error: {e}")

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token"
        )