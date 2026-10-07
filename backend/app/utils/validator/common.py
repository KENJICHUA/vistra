from datetime import date
from enum import Enum
from typing import TypeVar
import re

E = TypeVar("E", bound=Enum)

def confirm_phone_number(phone: str) -> bool:
    pattern = r"^((\+[0-9]{2})|0)[.\- ]?9[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{4}$"
    return bool(re.fullmatch(pattern, phone))


def confirm_birthday(value: date) -> date:
    today = date.today()

    hundred_years_ago = today.replace(year=today.year - 100)

    if value <= hundred_years_ago:
        raise ValueError("Birthday must be for someone younger than 100 years old")

    return value


def confirm_age(age: int, birthday: date) -> int:
    today = date.today()

    calculated_age = today.year - birthday.year

    if (today.month, today.day) < (
        birthday.month,
         birthday.day,
    ):
        calculated_age -= 1

    if age != calculated_age:
        raise ValueError(
            f"Age does not match birthday. "
            f"Expected {calculated_age}, got {age}"
        )

    return age


def confirm_enum(value: str, enum_class: type[E]) -> str:
    if value not in [item.value for item in enum_class]:
        raise ValueError(
            f"Value must be one of: {', '.join(item.value for item in enum_class)}"
        )

    return value


def confirm_not_blank(value: str) -> str:
    value = value.strip()

    if not value:
        raise ValueError("Field cannot be blank")

    return value


def confirm_mobile_number(value: str) -> str:
    value = value.strip()

    if not value.isdigit():
        raise ValueError("Mobile number must contain only digits")

    if len(value) not in (10, 11):
        raise ValueError("Invalid mobile number")

    return value
