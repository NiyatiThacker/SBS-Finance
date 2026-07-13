# ChatbotBaba Integration Guide

This folder contains all the files needed to integrate the FinAI Chatbot into another React + FastAPI website.

## Structure
- `/chatbot-backend/`: The FastAPI Python backend service.
- `/client/src/components/chatbot/`: The React components for the Chatbot UI.
- `/client/src/hooks/useChat.ts`: The React hook to connect the UI to the backend.
- `start_website.bat`: One-click startup script for running both frontend and backend locally.

## Steps to Integrate:
1. **Move files:** Copy the folders/files to the matching directories in your project.
2. **Install Frontend Dependencies:**
   Run in your frontend directory:
   `npm install framer-motion lucide-react react-hot-toast react-markdown`
3. **Configure API Keys:**
   Create or edit the `/chatbot-backend/.env` file with your Groq API Key:
   `GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE`
4. **App.jsx Integration:**
   Import `ChatWidget` and `FloatingButton` in your main `App.jsx`, declare states, and render the chatbot at the bottom before your Router closes.
