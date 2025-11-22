# app/appointments.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from . import models, schemas
from .security import get_current_user
from .notifications import send_appointment_notification

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("/", response_model=schemas.AppointmentOut)
def create_appointment(
    payload: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Ensure user is a patient
    patient = db.query(models.Patient).filter(models.Patient.user_id == current_user.id).first()
    if not patient:
        raise HTTPException(status_code=403, detail="Only patients can book appointments")

    facility = db.query(models.Facility).get(payload.facility_id)
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")

    doctor = db.query(models.Doctor).get(payload.doctor_id)
    if not doctor or doctor.facility_id != facility.id:
        raise HTTPException(status_code=404, detail="Doctor not found at this facility")

    # Double booking check: same doctor, same datetime
    exists = (
        db.query(models.Appointment)
        .filter(
            models.Appointment.doctor_id == payload.doctor_id,
            models.Appointment.datetime == payload.datetime,
            models.Appointment.status == "booked",
        )
        .first()
    )
    if exists:
        raise HTTPException(status_code=400, detail="Timeslot already booked")

    appt = models.Appointment(
        patient_id=patient.id,
        facility_id=facility.id,
        doctor_id=doctor.id,
        datetime=payload.datetime,
        reason=payload.reason,
    )
    db.add(appt)
    db.commit()
    db.refresh(appt)

    send_appointment_notification(current_user, appt)

    return appt


@router.get("/me", response_model=List[schemas.AppointmentOut])
def my_appointments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    patient = db.query(models.Patient).filter(models.Patient.user_id == current_user.id).first()
    if not patient:
        raise HTTPException(status_code=403, detail="Only patients can view this")

    appts = (
        db.query(models.Appointment)
        .filter(models.Appointment.patient_id == patient.id)
        .order_by(models.Appointment.datetime.desc())
        .all()
    )
    return appts
