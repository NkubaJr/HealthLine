HealthLine Rwanda 🩺🇷🇼
A multi-role digital healthcare platform that helps Rwandan clinics manage appointments, queues, and lab results in one place — while giving patients an easier way to access care.
Built with FastAPI + PostgreSQL on the backend and React + TypeScript (Vite + Tailwind) on the frontend.

1. Project Overview
HealthLine Rwanda is a full-stack prototype that simulates the daily operations of a small clinic or health centre:
Patients can sign up, log in (password or OTP), book appointments, and view lab results.


Doctors see their daily schedule and key patient details.


Lab Technicians upload test results linked to appointments.


Front Desk Staff manage bookings and real-time queues.


The system is designed as a single SPA with role-based dashboards powered by a clean REST API and a relational PostgreSQL database.

2. Core Features
🔑 Authentication & Security
Email + password login with secure password hashing (pbkdf2_sha256 via Passlib).


OTP-based login flow (/auth/login-otp-request + /auth/login-otp-verify).


JWT-based authentication with /me endpoint to fetch the current user.


👤 Multi-Role Dashboards
Patient Dashboard


View upcoming appointment


Book new appointments


View lab results


Update profile & preferences


Doctor Dashboard


See daily appointment list


Access basic patient info for each appointment


Lab Technician Dashboard


View tests to be processed


Upload lab results tied to appointments


Front Desk Dashboard


Register walk-ins


Book appointments on behalf of patients


Manage queues and appointment status


🌍 Local Context & UX
Language switcher: EN / RW / FR


Light / dark mode toggle


Designed for Rwandan healthcare workflows and local clinic settings



3. Tech Stack
Backend
Python 3.11+


FastAPI


SQLAlchemy


PostgreSQL


Passlib (pbkdf2_sha256) for password hashing


python-jose for JWT


python-dotenv for environment variables


Frontend
React 18 + TypeScript


Vite


TailwindCSS


shadcn/ui components


React Context API for auth + role state


Custom role-based navigation



4. Repository Structure
HealthLine/
├─ Backend/
│  ├─ healthline_backend/
│  │  ├─ __init__.py
│  │  ├─ main.py              # FastAPI entrypoint
│  │  ├─ database.py          # SQLAlchemy engine & session
│  │  ├─ models.py            # ORM models (User, Patient, Appointment, etc.)
│  │  ├─ schemas.py           # Pydantic schemas
│  │  ├─ security.py          # Auth, hashing, JWT helpers
│  │  ├─ auth.py              # /auth routes (register, login, OTP)
│  │  ├─ me.py                # /me endpoint
│  │  ├─ appointments.py      # Appointment & queue endpoints
│  │  ├─ lab_results.py       # Lab result upload + retrieval
│  │  ├─ notifications.py     # OTP + notification helpers (email/SMS hooks)
│  │  └─ ...
│  ├─ .env                    # Backend environment config (local)
│  └─ requirements.txt
│
├─ Revised_Frontend/
│  ├─ src/
│  │  ├─ App.tsx              # Root app, context, routing
│  │  ├─ App.css
│  │  ├─ translations.ts      # EN/RW/FR strings
│  │  ├─ components/
│  │  │  ├─ WelcomePage.tsx
│  │  │  ├─ LoginPage.tsx
│  │  │  ├─ SignupPage.tsx
│  │  │  ├─ UssdFlow.tsx
│  │  │  ├─ patient/...
│  │  │  ├─ doctor/DoctorDashboard.tsx
│  │  │  ├─ lab/LabTechDashboard.tsx
│  │  │  └─ frontdesk/FrontDeskDashboard.tsx
│  ├─ index.html
│  ├─ vite.config.ts
│  └─ package.json
│
└─ docs/
   └─ (report, diagrams, etc.)


5. API Overview
Auth
POST /auth/register


POST /auth/login-password


POST /auth/login-otp-request


POST /auth/login-otp-verify


User
GET /me – returns current user details + role


Appointments
POST /appointments


GET /appointments/me


Lab Results
POST /lab/results


GET /lab/results/{patient_id}


All endpoints return JSON and are documented automatically via Swagger at /docs.

6. Local Setup
6.1 Prerequisites
OS: Windows 10/11 (tested) or any OS supporting Python + Node


Backend:


Python 3.11+


PostgreSQL (local or Docker)


Frontend:


Node.js 18+


npm or yarn



6.2 Backend Setup (FastAPI + PostgreSQL)
From the repo root:
cd Backend
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate   # Mac / Linux

pip install -r requirements.txt

Option A: Run PostgreSQL with Docker (recommended)
docker run -d --name healthline-db ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=healthline123 ^
  -e POSTGRES_DB=healthline_db ^
  -p 5432:5432 postgres:16

Create .env in Backend/
APP_ENV=dev

JWT_SECRET=super-secret-jwt-key-change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

POSTGRES_USER=postgres
POSTGRES_PASSWORD=healthline123
POSTGRES_DB=healthline_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

DATABASE_URL=postgresql+psycopg2://postgres:healthline123@localhost:5432/healthline_db

# Email (optional, for OTP delivery hooks)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_app_password
FROM_EMAIL_NAME=HealthLine Rwanda

Make sure DATABASE_URL matches how your database.py builds the SQLAlchemy engine.
Run database table creation
main.py already calls Base.metadata.create_all(bind=engine) on startup, so tables will be created automatically the first time you run the API.
Start the backend
uvicorn healthline_backend.main:app --reload

API: http://127.0.0.1:8000


Docs: http://127.0.0.1:8000/docs



6.3 Frontend Setup (React + Vite)
From the repo root:
cd Revised_Frontend
npm install

Check that the API base URL is correct in your frontend code (e.g. LoginPage.tsx, SignupPage.tsx):
const API_BASE_URL = "http://127.0.0.1:8000";

Run the dev server:
npm run dev

Visit http://localhost:5173 (or whatever port Vite prints) to use the app.

7. Docker Deployment (Backend)
7.1 Backend Dockerfile (example)
Place this in Backend/Dockerfile:
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY healthline_backend ./healthline_backend
COPY .env .env

EXPOSE 8000

CMD ["uvicorn", "healthline_backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

7.2 Docker Compose (API + DB)
Create docker-compose.yml at the repo root (or inside Backend/ and adjust paths):
version: "3.9"

services:
  db:
    image: postgres:16
    container_name: healthline-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: healthline123
      POSTGRES_DB: healthline_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: ./Backend
    container_name: healthline-api
    env_file:
      - ./Backend/.env
    depends_on:
      - db
    ports:
      - "8000:8000"

volumes:
  pgdata:

Then:
docker compose up --build

Backend will be available at http://localhost:8000.
You can later add a frontend service (e.g., a Vite build + Nginx) if required by your assignment.

8. How the System Addresses the Problem
Replaces paper-based queues with structured bookings and status updates.


Gives patients self-service access to appointments and lab results.


Provides clear role separation (Patient, Doctor, Lab, Front Desk) within a single app.


Uses realistic, production-aligned technologies (FastAPI, PostgreSQL, React) that can scale.



9. Future Enhancements
Real SMS and email integration (Twilio, MTN Rwanda, etc.) for OTP and appointment reminders.


Real-time queue updates via WebSockets.


Analytics dashboards for clinic performance.


Mobile app (React Native).


Integration with national eHealth / insurance systems.



10. License
This project was built as part of the BSc Software Engineering Final Project (ALU).
 You can adapt the code for educational use; for production or commercial use, please contact the authors/team.


