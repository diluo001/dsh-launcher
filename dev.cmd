@echo off
setlocal
cd /d "%~dp0"
if exist "%~dp0..\.cargo-home" set "CARGO_HOME=%~dp0..\.cargo-home"
call npm.cmd run tauri dev
if errorlevel 1 pause
endlocal
