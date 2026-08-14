import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_PRIVILEGE_KEY = os.getenv("SUPABASE_PRIVILEGE_KEY")

    IS_PROD = os.getenv("IS_PROD", "false").lower() == "true"

    LOCAL_FRONTEND_URL = os.getenv("LOCAL_FRONTEND_URL")
    PROD_FRONTEND_URL = os.getenv("PROD_FRONTEND_URL")

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