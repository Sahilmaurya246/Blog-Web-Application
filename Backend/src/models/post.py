
from sqlalchemy import Column,String,Integer,DateTime,ForeignKey, Text
from datetime import datetime
from src.database import Base
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__="posts"
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String, nullable=False,index=True)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="posts")

    