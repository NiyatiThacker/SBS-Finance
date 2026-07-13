# SBS Financials

Welcome to the **SBS Financials** platform! This is a modern, full-stack financial services website built with Vite, React, Tailwind CSS, and a Python Serverless backend powered by FastAPI. 

## Features
- **Frontend**: A highly responsive and aesthetic interface built with React and Tailwind CSS.
- **Backend API**: A Python-based FastAPI backend that handles serverless routes (like `/api/chat`).
- **AI Chatbot**: A smart AI financial assistant (FinAI) powered by Groq and Google Gemini, capable of answering financial questions, providing live stock data, and performing RAG against company knowledge.
- **Vercel Ready**: The entire project is structured to deploy seamlessly on Vercel, with the React frontend running on edge nodes and the Python backend running as serverless functions.

## Local Development

### Requirements
- Node.js
- Python 3.9+

### Setup Instructions
1. Install JavaScript dependencies:
   ```bash
   npm install
   ```
2. Run the frontend development server:
   ```bash
   npm run dev
   ```
   *(Note: The `vite.config.js` is set up to automatically proxy `/api/chat` requests to the local Python server at `http://localhost:8001`)*

3. Start the Python Backend (in a separate terminal):
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\Activate.ps1
   # On Mac/Linux:
   source venv/bin/activate
   
   pip install -r requirements.txt
   python -m uvicorn api.chat:app --host 127.0.0.1 --port 8001
   ```

### API Keys
Make sure you create a `.env` file at the root of the project with the following keys for the AI chatbot to function:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

## Deployment
This project is configured for **Vercel**. 
1. Link your GitHub repository to Vercel.
2. Vercel will automatically build the React frontend and deploy the `api/` folder as Python serverless functions.
3. Don't forget to add your `.env` variables in the Vercel project settings!
