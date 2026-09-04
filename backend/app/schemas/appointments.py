from datetime import datetime
from pydantic import BaseModel


class Appointments(BaseModel):
    id: int
    patient_id: str
    scheduled_start: datetime
    scheduled_end: datetime
    status: str
    reason: str
    location: str
    created_at: datetime
    staff_id: str