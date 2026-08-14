@echo off
title Development Servers

echo Starting Backend...
start "Backend" cmd /k "cd /d "%~dp0backend" && call .venv\Scripts\activate && uvicorn app.main:app --reload"

echo Starting Frontend...
start "Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Development servers started.
pause