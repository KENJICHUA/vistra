from fastapi import HTTPException

from app.database.database_client import supabase
from app.utils.email_utils import add_ucc_domain, remove_ucc_domain


def _resolve_identifier(request) -> str:
    raw = (
        getattr(request, "identifier", None)
        or getattr(request, "email", None)
        or getattr(request, "staff_id", None)
        or getattr(request, "patient_id", None)
    )

    if not raw or not str(raw).strip():
        raise HTTPException(
            status_code=422,
            detail="identifier, email, staff_id, or patient_id is required",
        )

    return str(raw).strip()


def login_user(request):
    try:
        identifier = _resolve_identifier(request)
        password = request.password

        auth_response = supabase.auth.sign_in_with_password({
            "email": add_ucc_domain(identifier),
            "password": password,
        })

        user = auth_response.user
        session = auth_response.session

        if not user or not session:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        app_metadata = getattr(user, "app_metadata", None) or {}
        if isinstance(app_metadata, dict):
            role = app_metadata.get("role")
        else:
            role = getattr(app_metadata, "role", None)

        return {
            "success": True,
            "user": {
                "id": user.id,
                "user_id": remove_ucc_domain(user.email).upper(),
                "email": user.email,
                "role": role,
            },
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
        }

    except HTTPException:
        raise

    except Exception as e:
        print(f"Login error: {e}")

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )
