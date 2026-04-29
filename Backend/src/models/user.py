
from sqlalchemy import Column,Integer,String,DateTime
from datetime import datetime
from src.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    username=Column(String(50),unique=True, nullable=False,index=True)
    email=Column(String(100),unique=True, nullable=False,index=True)
    password=Column(String(250),nullable=False)
    created_at=Column(DateTime, default=datetime.utcnow)
    posts = relationship("Post", back_populates="user")


    