
from fastapi import FastAPI,APIRouter ,Depends,HTTPException
from sqlalchemy.orm import Session
from src.database import SessionLocal,engine,Base
from src.models.user import User
from src.schemas.user import UserCreate,  UserLogin
from src.utils.hash import hash_password, verify_password
from src.utils.jwt import create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db=SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email Already Registered ")
    
    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, email=user.email,password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_token({
        "user_id": new_user.id,
        "email": new_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": new_user.username
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password, Please Correct entered Data") 
    
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password Please Correct entered Data")
    
    token = create_token({"user_id": db_user.id, "email": db_user.email})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.username
    }

