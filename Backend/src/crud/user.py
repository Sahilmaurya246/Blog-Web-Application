
from sqlalchemy.orm import Session
from src.models.user import User
from src.schemas.user import UserCreate
from src.utils.hash import hash_password


def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

