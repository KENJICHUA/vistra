from typing import Generic, TypeVar

from pydantic import BaseModel, computed_field

from app.schemas.patient import PatientRecord

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int

    @computed_field
    @property
    def total_pages(self) -> int:
        return (self.total + self.page_size - 1) // self.page_size


class Response(BaseModel, Generic[T]):
    success: bool
    data: T | None = None
    message: str | None = None

class SummaryRecord(BaseModel):
    patient_id: str
    patient_name: str
    course: str | None
    department: str | None
    school_year: str | None
    appointment: list[PatientRecord]
    medical: list[PatientRecord]
    dental: list[PatientRecord]