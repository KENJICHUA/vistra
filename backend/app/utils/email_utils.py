def remove_ucc_domain(email: str) -> str:
    return email.removesuffix("@ucc.com")
def add_ucc_domain(username: str) -> str:
    if username.endswith("@ucc.com"):
        return username
    return f"{username}@ucc.com"

def staff_id_format(email: str) -> str:
    email = remove_ucc_domain(email)
    return email.upper()
