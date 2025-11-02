from twilio.rest import Client

def send_sms(to: str, message: str):
    client = Client("TWILIO_SID", "TWILIO_AUTH_TOKEN")
    client.messages.create(
        body=message,
        from_="TWILIO_PHONE",
        to=to
    )
