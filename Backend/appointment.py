from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class Appointment(BaseModel):
    patient_id: int
    provider_id: int
    time: datetime

@router.post("/")
def book_appointment(appointment: Appointment):
    # Save to DB
    return {"msg": "Appointment booked"}
