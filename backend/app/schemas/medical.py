from datetime import datetime

from pydantic import BaseModel

from app.enums.medical_terms import MedicalVisitTypes, MedicalVisitStatus


class MedicalVisitLog(BaseModel):
    complaint: str
    treatment: str

class MedicalVisitCreateRequest(BaseModel):
    patient_id: str
    staff_id: str
    status: MedicalVisitStatus
    type: MedicalVisitTypes
    visit_date: datetime
    visit_log: list[MedicalVisitLog]

    def to_db_dict(self) -> dict:
        first_log = self.visit_log[0] if self.visit_log else None
        visit_date_iso = self.visit_date.isoformat()

        return {
            "patient_id": self.patient_id,
            "staff_id": self.staff_id,
            "type": self.type.value,
            "visit_date": visit_date_iso,
            "visit_log": {
                "date": visit_date_iso,
                "complaint": first_log.complaint if first_log else "",
                "treatment": first_log.treatment if first_log else "",
            },
            "status": self.status.value,
        }

class MedicalVisitTab(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    course: str
    visit_date: datetime
    staff_id: str
    status: MedicalVisitStatus
    type: MedicalVisitTypes
