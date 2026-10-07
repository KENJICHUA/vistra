from datetime import datetime
from pydantic import BaseModel


class Appointments(BaseModel):
    id: int
    patient_id: str
    scheduled_start: datetime
    scheduled_end: datetime
    status: str
    reason: str | None = None
    location: str | None = None
    created_at: datetime
    staff_id: str | None = None
    notes: str | None = None
    decline_reason: str | None = None

class CreateAppointmentRequest(BaseModel):
    patient_id: str
    scheduled_start: datetime
    scheduled_end: datetime
    reason: str | None = None
    location: str | None = None

class UpdateAppointmentRequest(BaseModel):
    status: str | None = None
    reason: str | None = None
    location: str | None = None

class AppointmentSummary(BaseModel):
    id: int
    title: str
    date: datetime
    details: str
    provider: str