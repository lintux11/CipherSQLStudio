Project Title: CipherSQLStudio

Objective : CipherSQLStudio is a browser-based SQL learning platform where students can practice SQL queries on pre-configured assignments with real-time execution and intelligent hints. The platform focuses on understanding SQL concepts rather than just getting correct answers.

Features : 
View SQL assignments with difficulty levels
Explore pre-loaded table schemas and sample data
Write and execute SQL queries in real time
Get intelligent hints (not full solutions) using LLM
See query results instantly
Secure, isolated SQL execution environment

Tech Stack:

Frontend : 
React.js
Vanilla SCSS (mobile-first)
Fetch API

Backend :
Node.js
Express.js

Databases:
PostgreSQL (SQL sandbox execution)
MongoDB Atlas (assignments & metadata)

Editor:
Monaco Editor (recommended)

LLM:
OpenAI API (for hint generation)

project Structure:
CipherSQLStudio/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── config/
│   │   └── app.js
│   ├── server.js
│   └── seedAssignments.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
└── README.md

Environment Variables:
Backend .env
PORT=5050
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_key

How to Run the Project
Backend Setup
cd backend
npm install
npm run dev

Backend runs on: http://localhost:5050

Frontend Setup 
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

API Endpoints
GET /api/assignments – Fetch all SQL assignments
GET /api/assignments/:id – Fetch assignment details
POST /api/execute – Execute user SQL query
POST /api/hint – Get an intelligent hint for the query

Data Flow Overview
User selects an assignment on the frontend
Assignment data is fetched from MongoDB
User writes a SQL query and submits it
Backend validates and executes the query in PostgreSQL
Query results are returned to the frontend
If requested, the backend calls the LLM API to generate a hint

Important Notes
Assignments and sample data are pre-configured by the administrator
Users cannot modify database schemas
SQL execution is sandboxed to ensure safety of the model
The LLM provides hints only, not complete SQL solutions

Author
Rakesh Kumar Jagdev
B.Tech Computer Science Engineering

Diagram
A hand-drawn data-flow diagram is included as part of the submission

