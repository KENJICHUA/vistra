from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import Config
from app.routes import health, auth, staff, patient, appointment, dental, medical

app = FastAPI(
    title="VISTRA API",
    version="2.3.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Config.frontend_url()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.auth_router)
app.include_router(auth.staff_auth_router)
app.include_router(staff.protected_staff_router)
app.include_router(patient.protected_patients_router)
app.include_router(appointment.protected_appointments_router)
app.include_router(dental.protected_dental_router)
app.include_router(medical.protected_medical_router)