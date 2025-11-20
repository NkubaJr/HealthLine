# app/schemas.py
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr


# --------- AUTH ---------

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    phone: Optional[str] = None
    role: str = "patient"
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    wants_email: bool = True
    wants_sms: bool = True


class LoginPassword(BaseModel):
    email: EmailStr
    password: str


class LoginOtpRequest(BaseModel):
    phone: str


class LoginOtpVerify(BaseModel):
    phone: str
    code: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --------- FACILITY / DOCTOR ---------

class FacilityBase(BaseModel):
    name: str
    district: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None


class FacilityCreate(FacilityBase):
    pass


class FacilityOut(FacilityBase):
    id: int
    class Config:
        orm_mode = True


class DoctorOut(BaseModel):
    id: int
    specialization: Optional[str]
    facility: FacilityOut

    class Config:
        orm_mode = True


# --------- APPOINTMENTS ---------

class AppointmentCreate(BaseModel):
    facility_id: int
    doctor_id: int
    datetime: datetime
    reason: Optional[str] = None


class AppointmentOut(BaseModel):
    id: int
    datetime: datetime
    status: str
    reason: Optional[str]
    facility: FacilityOut
    doctor: Optional[DoctorOut] = None

    class Config:
        orm_mode = True


# --------- LAB RESULTS ---------

class LabResultCreate(BaseModel):
    appointment_id: int
    report: str
    file_url: Optional[str] = None


class LabResultOut(BaseModel):
    id: int
    appointment_id: int
    report: str
    file_url: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
