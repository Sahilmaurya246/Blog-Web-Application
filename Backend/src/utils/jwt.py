
from jose import JWTError, jwt
from datetime import datetime,timedelta

SECRET_KEY="mysecret_key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_token(data:dict):
    to_encode=data.copy()
    expire=datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp":expire})

    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

def verify_token(token:str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload

    except JWTError:
        return None
    
