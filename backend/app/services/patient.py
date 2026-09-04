from httpx import Client

from app.repositories.patient_repositories import PatientRepository
from app.schemas.patient import Patient, CreatePatientRequest, PatientProfile
from app.services.auth.user import create_auth_user, delete_auth_user
from app.utils.email_utils import remove_ucc_domain


def get_all_patients(supabase):
    try:
        patient_repo = PatientRepository(supabase)
        response = patient_repo.get_all()

        return {
            "success": True,
            "data": response
        }
    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


def get_patient_by_id(patient_id: str, supabase):
    try:
        patient_repo = PatientRepository(supabase)
        response = patient_repo.get_by_id(patient_id)

        print("patient_id:", repr(patient_id))
        print("response:", response)

        if response:
            return {
                "success": True,
                "data": response
            }

        return {
            "success": False,
            "message": f"Patient not found for {patient_id}"
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


def create_patient(request: CreatePatientRequest, supabase):
    patient_id = remove_ucc_domain(request.patient_id)

    # 1. Create Auth user
    auth_response = create_auth_user(
        user_id=patient_id,
        password=request.password,
        role=request.classification
    )

    if not auth_response["success"]:
        return auth_response

    user = auth_response["user"]

    # 2. Insert PATIENT
    patient_data = Patient(
        id=user.id,
        patient_id=patient_id,
        created_by=request.created_by
    )

    insert_response = insert_patient_into_db(patient_data, supabase)

    if not insert_response["success"]:
        delete_response = delete_auth_user(user.id)

        if delete_response["success"]:
            return {
                "success": False,
                "message": insert_response["message"]
            }

        return {
            "success": False,
            "message": (
                "Failed to insert patient into database and failed to "
                f"delete user from auth: {delete_response['message']}"
            )
        }

    # 3. Convert request into profile
    patient_profile = request.to_patient_profile()

    # 4. Insert patient profile
    profile_response = insert_patient_profile_into_db(patient_profile, supabase)

    if not profile_response["success"]:
        delete_response = delete_auth_user(user.id)

        return {
            "success": False,
            "message": profile_response["message"]
        }

    # Everything succeeded
    return {
        "success": True,
        "message": "Patient created successfully"
    }


def insert_patient_into_db(patient_data: Patient, supabase):
    try:
        patient_repo = PatientRepository(supabase)
        response = patient_repo.create(patient_data)

        return {
            "success": True,
            "data": response.data
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


def insert_patient_profile_into_db(patient_profile: PatientProfile, supabase):
    try:
        patient_repo = PatientRepository(supabase)
        response = patient_repo.create_profile(patient_profile)

        return {
            "success": True,
            "data": response.data
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

def get_all_patient_profiles(supabase):
    try:
        patient_repo = PatientRepository(supabase)
        response = patient_repo.get_all_profile()

        return {
            "success": True,
            "data": response
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }
