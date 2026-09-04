from typing import Optional
from pydantic import BaseModel


class SeparatedName(BaseModel):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str


def separate_name(full_name: str) -> SeparatedName:
    parts = full_name.strip().split()

    if len(parts) < 2:
        raise ValueError(
            "Full name must contain at least a first and last name"
        )

    return SeparatedName(
        first_name=parts[0],
        middle_name=" ".join(parts[1:-1]) if len(parts) > 2 else None,
        last_name=parts[-1],
    )