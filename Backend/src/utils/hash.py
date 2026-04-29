
from passlib.context import CryptContext

pwd_context=CryptContext(schemes=["bcrypt"], deprecated="auto")

# create token for sign UP
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# verify password  for login
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


