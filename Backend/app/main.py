# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .auth import router as auth_router
from .appointments import router as appt_router
from .lab_results import router as lab_router

# 1. Create tables in the database (only for dev/student projects)
Base.metadata.create_all(bind=engine)

# 2. This is the ASGI app uvicorn is looking for:
app = FastAPI(title="HealthLine Rwanda API")

# 3. Allow your frontend (HTML/JS) to talk to this backend
origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Simple health-check route
@app.get("/")
def root():
    return {"status": "ok", "app": "HealthLine Rwanda"}


# 5. Register your routers (endpoints)
app.include_router(auth_router)
app.include_router(appt_router)
app.include_router(lab_router)
