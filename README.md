# Job Detective

Job Detective is an AI-powered job application tracker that helps users understand patterns in their job search instead of just keeping a list of applications.

I built Job Detective for the AI Builders Hackathon. The idea came from my own experience of applying for jobs and wondering why some applications progressed while others received no response or were rejected.

Instead of simply tracking applications, Job Detective uses AI to analyse application history, identify patterns and provide practical recommendations.

## Features

- Add and track job applications
- Record company, role and job type
- Track application stages such as Applied, Interview, Assessment/Trial and Offer
- Track outcomes such as Pending, No Response, Rejected, Withdrawn and Hired
- Edit and delete applications
- Store application data using SQLite
- View application statistics and stage visualisations
- Generate AI-powered job search insights
- Receive patterns, possible issues and recommendations based on application history

## AI Analysis

The main feature of Job Detective is the **Analyse My Applications** tool.

When analysis is requested:

1. The React frontend retrieves the user's saved applications.
2. Application data is sent to the Flask backend.
3. The backend sends the application history to the OpenAI API.
4. The AI analyses the job search data and returns structured insights.
5. React displays the results in the Job Detective Report.

The report contains:

- 🔎 **Pattern Detected** – a noticeable pattern in the user's applications
- ⚠️ **Possible Issue** – something that may be affecting the job search
- 🎯 **Recommendation** – a practical suggestion based on the available data

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- CSS
- Recharts

**Backend**
- Python
- Flask
- Flask-CORS

**Database**
- SQLite

**AI**
- OpenAI API

## How It Works

```text
React Frontend
      ↓
Flask REST API
      ↓
SQLite Database

For AI analysis:

Application Data
      ↓
React
      ↓
POST /analyse
      ↓
Flask
      ↓
OpenAI API
      ↓
Structured AI Insights
      ↓
Job Detective Report
```

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/hasijadishita-cell/job-detective
cd job-detective
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install flask flask-cors openai python-dotenv
```

Create a `.env` file inside the `backend` folder and add your OpenAI API key:

```text
OPENAI_API_KEY=your_api_key_here
```

Start the Flask server:

```bash
python -m flask --app app run --debug
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in the browser.

## Why I Built This

Job searching can become confusing when applications are spread across different websites and it is difficult to see what is actually working.

I wanted to build something that did more than store applications. Job Detective combines application tracking with AI analysis so that the information users already have can become useful feedback.

## What I Learned

I built this project as a learning challenge while learning React and Flask.

Through Job Detective, I learned how to:

- Manage state and user interactions in React
- Use React hooks such as `useState` and `useEffect`
- Build REST API endpoints using Flask
- Send data between a frontend and backend using HTTP requests
- Store and retrieve application data using SQLite
- Integrate an AI API into a full-stack application
- Work with structured JSON responses
- Debug frontend/backend integration problems

Building the project helped me understand how the different parts of a full-stack application communicate rather than treating the frontend, backend and database as separate pieces.

## Security

The OpenAI API key is stored using environment variables and is excluded from Git using `.gitignore`.


##  Future Improvements

Some features I would like to explore in the future include:

- User authentication
- More detailed application analytics
- Resume-based insights
- Job search trend analysis
- Deployment as a publicly accessible web application

## 👩‍💻 Author

**Dishita Hasija**

Built as a solo project for the **AI Builders Hackathon 2026**.