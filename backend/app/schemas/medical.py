from datetime import datetime

from pydantic import BaseModel

from app.enums.medical_terms import MedicalVisitTypes, MedicalVisitStatus


class MedicalVisitLog(BaseModel):
    complaint: str
    treatment: str

class MedicalVisitCreateRequest(BaseModel):# this schema is from MEDICAL_VISIT in db
    patient_id: str
    staff_id: str
    status: MedicalVisitStatus
    type: MedicalVisitTypes
    visit_date: datetime
    visit_log: list[MedicalVisitLog]

class MedicalVisitTab(BaseModel): # this schema is from medical_tab in db
    id: str
    patient_id: str
    patient_name: str
    course: str
    visit_date: datetime
    staff_id: str
    status: MedicalVisitStatus
    type: MedicalVisitTypes
