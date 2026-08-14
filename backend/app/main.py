import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import Config
from app.routes import health, login, staff


app = FastAPI(
    title="VISTRA API",
    version="2.0.1"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Config.frontend_url()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(login.staff_auth_router)
app.include_router(staff.create_staff_router)