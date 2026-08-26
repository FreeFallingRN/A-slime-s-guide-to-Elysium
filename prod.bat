@echo off
echo ===================================================
echo [Arson Devs Inc.] Building Production PWA...
echo ===================================================
docker compose up -d

echo Checking if workspace packages are installed...
:poll_vite
docker compose exec app test -f /workspace/node_modules/.bin/vite >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [System] Packages are downloading/installing inside container. Waiting 3 seconds...
    timeout /t 3 /nobreak >nul
    goto poll_vite
)

echo.
echo Packages ready! Compiling Svelte and bundling assets...
docker compose exec app npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Svelte build failed.
    exit /b %ERRORLEVEL%
)

echo.
echo Starting Production Preview Server on port 5174...
docker compose exec -d app npx vite preview --host --port 5174

echo.
echo ===================================================
echo Production preview is running at: http://localhost:5174
echo.
echo To stop all environments, run: .\stop
echo ===================================================
