from datetime import date, datetime
from uuid import UUID
from pydantic import BaseModel, Field, field_validator
from app.utils.name_utils import separate_name

class Patient(BaseModel):
    id: UUID
    patient_id: str
    created_by: str


class PatientProfile(BaseModel):
    patient_id: str
    first_name: str
    middle_name: str | None = None
    last_name: str
    birthday: date
    age: float
    sex: str
    complete_address: str
    barangay: str
    civil_status: str
    course: str | None = None
    contact_no: str | None = None
    school_year: str | None = None


class PatientMedicalHistory(BaseModel):
    id: int
    patient_id: str
    hospitalization_operation: str | None = None
    hospitalization_year: str | None = None
    diagnosis: str | None = None
    allergy_medicine: str | None = None
    allergy_food: str | None = None
    smoking: bool | None = None
    vaping: bool | None = None
    alcohol_intake: bool | None = None
    last_menstrual_period: str | None = "N/A"
    family_planning_method: str | None = None


class PatientVitalSigns(BaseModel):
    id: int
    patient_id: str
    temperature: float | None = None
    blood_pressure: float | None = None
    hearth_rate: float | None = None
    respiratory_rate: float | None = None
    eyes: float | None = None
    recorded_at: date | None = None


class PatientFamilyMedicalHistory(BaseModel):
    id: int
    patient_id: str
    condition: str | None = "NONE"
    other_condition: str | None = "NONE"





class CreatePatientRequest(BaseModel):
    patient_id: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=8, max_length=128)
    created_by: str = Field(..., min_length=1)

    name: str = Field(..., min_length=2, max_length=150)
    address: str = Field(..., min_length=1, max_length=255)
    age: int = Field(..., ge=0, le=150)
    barangay: str = Field(..., min_length=1, max_length=100)
    birthday: date

    mobile_number: str = Field(..., min_length=10, max_length=15)

    sex: str
    civil_status: str
    classification: str

    course: str | None = None
    school_year: str | None = None
    section: str | None = None
    department: str | None = None
    position: str | None = None

    def to_patient_profile(self) -> PatientProfile:
        name = separate_name(self.name)

        return PatientProfile(
            patient_id=self.patient_id,
            first_name=name.first_name,
            middle_name=name.middle_name,
            last_name=name.last_name,
            birthday=self.birthday,
            age=self.age,
            sex=self.sex,
            complete_address=self.address,
            barangay=self.barangay,
            civil_status=self.civil_status,
            course=self.course,
            contact_no=self.mobile_number,
            school_year=self.school_year,
        )
    
    @field_validator("name", "address", "barangay")
    @classmethod
    def validate_not_blank(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Field cannot be blank")

        return value

    @field_validator("mobile_number")
    @classmethod
    def validate_mobile_number(cls, value: str):
        value = value.strip()

        if not value.isdigit():
            raise ValueError("Mobile number must contain only digits")

        if len(value) not in (10, 11):
            raise ValueError("Invalid mobile number")

        return value

    @field_validator("sex")
    @classmethod
    def validate_sex(cls, value: str):
        allowed = {"Male", "Female"}

        if value not in allowed:
            raise ValueError(
                f"Sex must be one of: {', '.join(allowed)}"
            )

        return value

    @field_validator("civil_status")
    @classmethod
    def validate_civil_status(cls, value: str):
        allowed = {
            "Single",
            "Married",
            "Widowed",
            "Separated"
        }

        if value not in allowed:
            raise ValueError(
                f"Civil status must be one of: {', '.join(allowed)}"
            )

        return value
