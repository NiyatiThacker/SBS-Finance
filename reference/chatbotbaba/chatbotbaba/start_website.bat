@echo off
echo Starting SBS Lala Website and AI Chatbot...
echo.

:: Start the Python Backend in a new terminal window
start "AI Chatbot Backend" cmd /k "cd chatbot-backend && if not exist venv (echo Setting up AI Brain for the first time... && python -m venv venv && call venv\Scripts\activate.bat && pip install -r requirements.txt) else (call venv\Scripts\activate.bat) && python -m uvicorn main:app --host 0.0.0.0 --port 8001"

:: Start the React Frontend in a new terminal window
start "SBS Lala Frontend" cmd /k "cd client && echo Checking frontend dependencies... && npm install && npm run dev"

echo Both servers are starting up!
echo ---------------------------------------------------
echo 1. The Frontend will automatically run (check the Frontend window for the local link).
echo 2. The AI Backend will run on http://localhost:8001
echo ---------------------------------------------------
echo NOTE: Please leave the two new black windows open to keep the website running!
echo.
pause
