from enum import Enum


class CivilStatus(str, Enum):
    SINGLE = "Single"
    MARRIED = "Married"
    WIDOWED = "Widowed"
    SEPARATED = "Separated"