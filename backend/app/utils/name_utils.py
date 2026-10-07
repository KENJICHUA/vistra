from typing import Optional
from pydantic import BaseModel


class SeparatedName(BaseModel):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str


def separate_name(full_name: str) -> SeparatedName:
    parts = [part.strip() for part in full_name.split(",")]

    if len(parts) < 2:
        raise ValueError(
            "Name must contain at least a last name and first name"
        )

    last_name = parts[0]
    first_name = parts[1]
    middle_name = parts[2] if len(parts) > 2 else None

    return SeparatedName(
        last_name=last_name,
        first_name=first_name,
        middle_name=middle_name,
    )