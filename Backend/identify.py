from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: User):
    # Save user to DB
    return {"msg": "User registered"}

@router.post("/login")
def login(user: User):
    # Validate and return JWT
    return {"access_token": "jwt-token", "token_type": "bearer"}
