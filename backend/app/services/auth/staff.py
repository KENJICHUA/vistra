from app.database.DataBaseClient import  supabase
from app.utils.email_utils import add_ucc_domain

def staff_login(request):
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": add_ucc_domain(request.email),
            "password": request.password
        })

        user = auth_response.user
        session = auth_response.session

        return {
            "success": True,
            "user": {
                "id": user.id,
                "email": user.email
            },
            "access_token": session.access_token
        }

    except Exception:
        return {
            "success": False,
            "message": "Invalid email or password"
        }