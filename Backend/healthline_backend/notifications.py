# app/notifications.py
import os
import random
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta

from dotenv import load_dotenv
from sqlalchemy.orm import Session

from . import models

load_dotenv()

# SMS / WhatsApp provider
SMS_PROVIDER = os.getenv("SMS_PROVIDER", "").lower()  # "twilio" or "africastalking" or ""
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM", "")  # e.g. whatsapp:+14155238886

# Email provider (SMTP)
EMAIL_ENABLED = os.getenv("EMAIL_ENABLED", "false").lower() == "true"
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
EMAIL_FROM = os.getenv("EMAIL_FROM", "HealthLine Rwanda <no-reply@example.com>")


def send_sms(phone: str, message: str):
    if not phone:
        print("[SMS] No phone, skipping.")
        return

    if SMS_PROVIDER == "twilio" and TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
        try:
            from twilio.rest import Client
            client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

            client.messages.create(
                body=message,
                from_=TWILIO_FROM_NUMBER,
                to=phone,
            )

            # Optional: WhatsApp too
            if TWILIO_WHATSAPP_FROM and phone.startswith("+"):
                client.messages.create(
                    body=message,
                    from_=TWILIO_WHATSAPP_FROM,
                    to=f"whatsapp:{phone}",
                )

            print(f"[SMS] Sent via Twilio to {phone}")
        except Exception as e:
            print("[SMS] Twilio error:", e)

    else:
        # Demo fallback
        print(f"[SMS DEMO] To {phone}: {message}")


def send_email(to_email: str, subject: str, body: str):
    if not EMAIL_ENABLED:
        print(f"[EMAIL DISABLED] To {to_email} | {subject}")
        return

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        print(f"[EMAIL] Sent to {to_email}")
    except Exception as e:
        print("[EMAIL] Error:", e)


# ---------- OTP flows ----------

def generate_otp_code() -> str:
    return f"{random.randint(100000, 999999)}"


def create_and_send_otp(db: Session, phone: str):
    code = generate_otp_code()
    expires_at = datetime.utcnow() + timedelta(minutes=5)

    otp = models.OtpCode(phone=phone, code=code, expires_at=expires_at)
    db.add(otp)
    db.commit()

    send_sms(phone, f"Your HealthLine login code is: {code}. It expires in 5 minutes.")


# ---------- Domain notifications ----------

def send_appointment_notification(user: models.User, appt: models.Appointment):
    dt_str = appt.datetime.strftime("%Y-%m-%d %H:%M")
    msg = f"Your appointment is booked for {dt_str} at facility ID {appt.facility_id}."

    if user.phone:
        send_sms(user.phone, msg)

    if user.email:
        send_email(
            to_email=user.email,
            subject="HealthLine Rwanda – Appointment Confirmation",
            body=msg,
        )


def send_lab_result_notification(user: models.User, result: models.LabResult):
    msg = (
        "Your lab result is ready. "
        f"Use this link (once): https://healthline.example.com/lab/{result.access_token}"
    )

    if user.phone:
        send_sms(user.phone, msg)

    if user.email:
        send_email(
            to_email=user.email,
            subject="HealthLine Rwanda – Lab Results Ready",
            body=msg,
        )
