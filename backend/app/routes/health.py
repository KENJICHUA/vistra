from fastapi import APIRouter

router = APIRouter(
    prefix="/api/health",
    tags=["Health"]
)


@router.get("/")
def health_check():
    return {
        "success": True,
        "message": "API is running"
    }