from fastapi import HTTPException

from app.database.database_client import supabase


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
