from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Transaction(Base):
  __tablename__ = "transactions"

  id = Column(Integer, primary_key=True, index=True)
  amount = Column(Float)
  category = Column(String, index=True)
  description = Column(String, index=True)
  is_income = Column(Boolean) 
  date = Column(String)
  
class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String, unique=True, index=True)
  hashed_password = Column(String)