@echo off
setlocal

echo ========================================
echo           VISTRA Setup
echo ========================================
echo.

REM ========================================
REM BACKEND
REM ========================================

echo [BACKEND]
cd /d "%~dp0backend"

if exist ".venv" (
    echo [OK] .venv exists.
) else (
    echo [MISSING] Creating .venv...
    python -m venv .venv

    if errorlevel 1 (
        echo [ERROR] Failed to create .venv.
        pause
        exit /b 1
    )

    echo [OK] .venv created.
)

if exist "requirements.txt" (
    echo Checking Python dependencies...
    call ".venv\Scripts\python.exe" -m pip install -r requirements.txt

    if errorlevel 1 (
        echo [ERROR] Failed to install Python dependencies.
        pause
        exit /b 1
    )

    echo [OK] Python dependencies ready.
) else (
    echo [SKIP] requirements.txt not found.
    exit /b 1
)

echo.


REM ========================================
REM FRONTEND
REM ========================================

echo [FRONTEND]
cd /d "%~dp0frontend"

if exist "node_modules" (
    echo [OK] node_modules exists.
) else (
    echo [MISSING] Installing Node dependencies...
    call npm install

    if errorlevel 1 (
        echo [ERROR] Failed to install Node dependencies.
        pause
        exit /b 1
    )

    echo [OK] Node dependencies installed.
)

echo.

REM ========================================
REM DONE
REM ========================================

cd /d "%~dp0"

echo ========================================
echo          VISTRA Setup Complete
echo ========================================
echo.

pause