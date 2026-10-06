import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_PRIVILEGE_KEY = os.getenv("SUPABASE_PRIVILEGE_KEY")

    SELFHOSTED_SUPABASE_URL = os.getenv("SELFHOSTED_SUPABASE_URL")
    SELFHOSTED_SUPABASE_KEY = os.getenv("SELFHOSTED_SUPABASE_KEY")
    SELFHOSTED_PRIVILEGE_KEY = os.getenv("SELFHOSTED_PRIVILEGE_KEY")

    USE_SELFHOSTED_SUPABASE = os.getenv("USE_SELFHOSTED_SUPABASE", "false").lower() == "true"

    IS_PROD = os.getenv("IS_PROD", "false").lower() == "true"

    LOCAL_FRONTEND_URL = os.getenv("LOCAL_FRONTEND_URL")
    PROD_FRONTEND_URL = os.getenv("PROD_FRONTEND_URL")

    @classmethod
    def supabase_source(cls) -> str:
        return "selfhosted" if cls.USE_SELFHOSTED_SUPABASE else "cloud"

    @classmethod
    def _pick(cls, cloud_value, selfhosted_value):
        if cls.USE_SELFHOSTED_SUPABASE:
            return selfhosted_value

        return cloud_value

    @classmethod
    def supabase_url(cls):
        return cls._pick(cls.SUPABASE_URL, cls.SELFHOSTED_SUPABASE_URL)

    @classmethod
    def supabase_key(cls):
        return cls._pick(cls.SUPABASE_KEY, cls.SELFHOSTED_SUPABASE_KEY)

    @classmethod
    def supabase_privilege_key(cls):
        return cls._pick(cls.SUPABASE_PRIVILEGE_KEY, cls.SELFHOSTED_PRIVILEGE_KEY)

    @classmethod
    def frontend_url(cls) -> str:
        url = (
            cls.PROD_FRONTEND_URL
            if cls.IS_PROD
            else cls.LOCAL_FRONTEND_URL
        )

        if not url:
            environment = "PROD" if cls.IS_PROD else "LOCAL"
            raise ValueError(
                f"Frontend URL is missing for {environment} environment"
            )

        return url

    @classmethod
    def validate(cls):
        if cls.USE_SELFHOSTED_SUPABASE:
            required = {
                "SELFHOSTED_SUPABASE_URL": cls.SELFHOSTED_SUPABASE_URL,
                "SELFHOSTED_SUPABASE_KEY": cls.SELFHOSTED_SUPABASE_KEY
            }
        else:
            required = {
                "SUPABASE_URL": cls.SUPABASE_URL,
                "SUPABASE_KEY": cls.SUPABASE_KEY
            }

        missing = [
            name for name, value in required.items()
            if not value
        ]

        if missing:
            raise ValueError(
                f"Missing required environment variables: "
                f"{', '.join(missing)}"
            )

        cls.frontend_url()


Config.validate()