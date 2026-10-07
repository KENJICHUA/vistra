from pydantic import BaseModel


class PaginationParams(BaseModel):
    page: int = 1
    page_size: int = 10


class FilterPatient(PaginationParams):
    search: str | None = None
    sex: str | None = None
    status: str | None = None
    course: str | None = None
    year_section: str | None = None
    user_type: str | None = None

# separated for flexibility


class VisitFilter(PaginationParams):
    search: str | None = None
    status: str | None = None
    type: str | None = None
    course: str | None = None
    date: str | None = None


class FilterAppointment(VisitFilter):
    pass


class FilterDental(VisitFilter):
    pass


class FilterMedical(VisitFilter):
    pass
