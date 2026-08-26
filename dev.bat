@echo off
echo ===================================================
echo [Arson Devs Inc.] Starting Dev Environment...
echo ===================================================
docker compose up -d
echo.
echo Dev server is launching at: http://localhost:5173
echo.
echo To view live logs, run: docker compose logs -f app
echo To stop, run: stop
