from fastapi import APIRouter

router = APIRouter()

@router.get("/next")
def get_next_patient():
    # Logic to fetch next patient
    return {"patient_id": 123, "status": "Ready"}
