from enum import Enum


class MedicalVisitTypes(str, Enum):
    MEDICAL_CONSULTATION = "Medical Consultation"
    FOLLOWUP = "Follow-up"

class MedicalVisitStatus(str, Enum):
    CLEARED = "Cleared"
    NOT_CLEARED = "Not Cleared"
    SECOND_OPTION = "Second Option"
    RECOVERED = "Recovered"
    REFERRED = "Referred"
    ONGOING_TREATMENT = "Ongoing Treatment"
