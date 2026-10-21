@echo off
title Educamp 2026 - Transparent Timer Overlay
echo ========================================================
echo  Educamp 2026 - Standalone Transparent Timer Overlay
echo ========================================================
echo  Menjalankan Transparent Borderless Timer Overlay...
echo  (Bisa digeser menggunakan mouse, klik kanan untuk opsi)
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python tidak ditemukan di PATH sistem Anda.
    echo Silakan install Python dari python.org terlebih dahulu.
    pause
    exit /b 1
)

start "" pythonw timer_overlay.py %*
exit
