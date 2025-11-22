# app/lab_results.py
import secrets
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from . import models, schemas
from .security import get_current_user
from .notifications import send_lab_result_notification

router = APIRouter(prefix="/lab", tags=["lab"])


@router.post("/results", response_model=schemas.LabResultOut)
def upload_result(
    payload: schemas.LabResultCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # In real system: check role == lab_tech or doctor
    appt = db.query(models.Appointment).get(payload.appointment_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if appt.lab_result:
        raise HTTPException(status_code=400, detail="Result already exists for this appointment")

    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(days=7)  # link valid 7 days

    lab = models.LabResult(
        appointment_id=appt.id,
        report=payload.report,
        file_url=payload.file_url,
        access_token=token,
        token_expires_at=expires_at,
    )
    db.add(lab)
    db.commit()
    db.refresh(lab)

    patient_user = appt.patient.user
    send_lab_result_notification(patient_user, lab)

    return lab


@router.get("/results/by-token/{token}", response_model=schemas.LabResultOut)
def view_result_by_token(token: str, db: Session = Depends(get_db)):
    lab = (
        db.query(models.LabResult)
        .filter(
            models.LabResult.access_token == token,
            models.LabResult.token_expires_at > datetime.utcnow(),
        )
        .first()
    )
    if not lab:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return lab
