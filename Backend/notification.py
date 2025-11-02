from fastapi import APIRouter
from app.services.sms_service import send_sms

router = APIRouter()

@router.post("/sms")
def send_sms_alert(to: str, message: str):
    send_sms(to, message)
    return {"msg": "SMS sent"}
