from fastapi import FastAPI
from app.api import identity, appointment, queue, notification

app = FastAPI(title="HealthLine API")

app.include_router(identity.router, prefix="/identity", tags=["Identity"])
app.include_router(appointment.router, prefix="/appointments", tags=["Appointments"])
app.include_router(queue.router, prefix="/queue", tags=["Queue"])
app.include_router(notification.router, prefix="/notifications", tags=["Notifications"])
