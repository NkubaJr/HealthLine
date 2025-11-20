# app/auth.py
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .database import get_db
from . import models, schemas
from .security import (
    hash_password,
    authenticate_password_user,
    create_access_token,
)
from .notifications import create_and_send_otp

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=schemas.Token)
def register_user(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=payload.role,
        phone=payload.phone,
    )
    db.add(user)
    db.flush()  # get user.id

    if payload.role == "patient":
        patient = models.Patient(
            user_id=user.id,
            first_name=payload.first_name,
            last_name=payload.last_name,
            wants_email=payload.wants_email,
            wants_sms=payload.wants_sms,
        )
        db.add(patient)

    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.id})
    return schemas.Token(access_token=token)


@router.post("/login-password", response_model=schemas.Token)
def login_with_password(payload: schemas.LoginPassword, db: Session = Depends(get_db)):
    user = authenticate_password_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = create_access_token({"sub": user.id})
    return schemas.Token(access_token=token)


@router.post("/login-otp-request")
def request_otp(payload: schemas.LoginOtpRequest, db: Session = Depends(get_db)):
    # You can also check if phone exists in Users table
    create_and_send_otp(db, payload.phone)
    return {"message": "OTP sent if phone is registered."}


@router.post("/login-otp-verify", response_model=schemas.Token)
def verify_otp(payload: schemas.LoginOtpVerify, db: Session = Depends(get_db)):
    otp = (
        db.query(models.OtpCode)
        .filter(
            models.OtpCode.phone == payload.phone,
            models.OtpCode.code == payload.code,
            models.OtpCode.is_used == False,
            models.OtpCode.expires_at > datetime.utcnow(),
        )
        .first()
    )
    if not otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    # Mark used
    otp.is_used = True
    db.commit()

    # For simplicity: find user by phone
    user = db.query(models.User).filter(models.User.phone == payload.phone).first()
    if not user:
        raise HTTPException(status_code=404, detail="No user linked to this phone")

    token = create_access_token({"sub": user.id})
    return schemas.Token(access_token=token)
