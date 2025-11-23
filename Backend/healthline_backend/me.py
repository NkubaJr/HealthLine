# healthline_backend/me.py
from fastapi import APIRouter, Depends
from .security import get_current_user

router = APIRouter(tags=["profile"])


@router.get("/me")
def read_me(current_user=Depends(get_current_user)):
    """
    Returns a fixed demo profile for Tifare Kaseke.
    Frontend uses this to show 'current user' and greeting.
    """
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "phone": current_user.phone,
        "patient": {
            "first_name": "Tifare",
            "last_name": "Kaseke",
        },
    }
