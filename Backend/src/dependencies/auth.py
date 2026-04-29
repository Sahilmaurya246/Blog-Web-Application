from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.utils.jwt import verify_token
from src.models.user import User


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme),db: Session = Depends(get_db)):
    print("TOKEN:", token)
    payload = verify_token(token)
    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")

    if user_id is None:
        raise HTTPException(status_code=401, detail="Token missing user_id")

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user

