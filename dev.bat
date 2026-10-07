@echo off
title Development Servers

echo Starting Backend...
start "Backend" cmd /k "cd /d "%~dp0backend" && call .venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

echo Starting Frontend...
start "Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Development servers started.
pause