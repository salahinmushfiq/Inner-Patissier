@echo off
:: Get the directory where this script is located
set SCRIPT_DIR=%~dp0

:: Set relative paths based on script location
set REACT_PROJECT_DIR=%SCRIPT_DIR%inner_patissier_react
set DJANGO_STATIC_DIR=%SCRIPT_DIR%Inner_Patissier_Django\react
set DJANGO_PROJECT_DIR=%SCRIPT_DIR%Inner_Patissier_Django

:: Remove old build files in Django project
rmdir /s /q "%DJANGO_STATIC_DIR%\build"
if errorlevel 1 (
    echo Failed to delete old build files.
    pause
    exit /b 1
)

:: Copy new build files
robocopy "%REACT_PROJECT_DIR%\build" "%DJANGO_STATIC_DIR%\build" /e
if %errorlevel% GEQ 8 (
    echo Failed to copy build files.
    pause
    exit /b 1
)



echo Build and copy completed successfully!
pause
