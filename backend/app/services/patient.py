from fastapi import status, HTTPException

from app.repositories.patient_repositories import PatientRepository
from app.schemas.patient import Patient, CreatePatientRequest, PatientProfile
from app.schemas.response_dto.reponses import Response
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


def _compensate_auth_user(user_id: str, db_message: str, rollback_prefix: str):
    delete_response = delete_auth_user(user_id)

    if not delete_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{rollback_prefix}: {delete_response['message']}",
        )

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=db_message,
    )


def create_patient(request: CreatePatientRequest, supabase):
    patient_id = remove_ucc_domain(request.patient_id)

    patient_repo = PatientRepository(supabase)

    # 1. Check if patient already exists
    existing_patient = patient_repo.get_by_id(patient_id)

    if existing_patient:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Patient ID already exists",
        )

    # 2. Create Auth user
    auth_response = create_auth_user(
        user_id=patient_id,
        password=request.password,
        role=request.classification,
    )

    if not auth_response["success"]:
        raise HTTPException(
            status_code=auth_response.get(
                "status_code",
                status.HTTP_400_BAD_REQUEST,
            ),
            detail=auth_response["message"],
        )

    user = auth_response["user"]

    # 3. Insert PATIENT
    patient_data = Patient(
        id=user.id,
        patient_id=patient_id,
        created_by=request.created_by,
    )

    insert_response = insert_patient_into_db(
        patient_data,
        supabase,
    )

    if not insert_response["success"]:
        _compensate_auth_user(
            user.id,
            insert_response["message"],
            "Failed to insert patient into database and failed "
            "to delete user from auth",
        )

    # 4. Convert request into profile
    patient_profile = request.to_patient_profile()

    # 5. Insert patient profile
    profile_response = insert_patient_profile_into_db(
        patient_profile,
        supabase,
    )

    if not profile_response["success"]:
        _compensate_auth_user(
            user.id,
            profile_response["message"],
            "Failed to insert patient profile and failed "
            "to delete auth user",
        )

    # Everything succeeded
    return {
        "success": True,
        "message": "Patient created successfully",
    }


def delete_patient(patient_id: str, supabase):
    try:
        patient_repo = PatientRepository(supabase)
        existing = patient_repo.get_by_id(patient_id)

        if not existing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Patient not found"
            )

        patient_repo.delete_profile(patient_id)
        deleted = patient_repo.delete(patient_id)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Patient not found"
            )

        delete_response = delete_auth_user(existing[0]["id"])

        if not delete_response["success"]:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=(
                    "Patient deleted from database but failed "
                    f"to delete user from auth: {delete_response['message']}"
                )
            )

        return {
            "success": True,
            "message": "Patient deleted successfully"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


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


def get_all_patient_profiles(supabase, filters):
    try:
        patient_repo = PatientRepository(supabase)
        response = patient_repo.get_profiles(filters)

        return {
            "success": True,
            "data": response
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


def get_patient_summary_record(supabase, patient_id):
    try:
        patient_repo = PatientRepository(supabase)

        response = patient_repo.get_summary_records(patient_id)

        return Response(
            success=True,
            data=response.data
        )

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
