from pydantic import BaseModel
from typing import Optional


class CreateStaffRequest(BaseModel):
    staff_id: str
    first_name: str
    password: str
    position: str
    last_name: str
    middle_name: Optional[str] = None
    specialty: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class StaffData(BaseModel):
    id: str
    staff_id: str
    first_name: str
    last_name: str
    middle_name: Optional[str] = None
    position: str
    specialty: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
