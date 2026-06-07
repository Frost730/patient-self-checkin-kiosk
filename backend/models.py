from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String, nullable=False)

    mobile = Column(String, nullable=False)

    address = Column(String)

    department = Column(String, nullable=False)

    token = Column(String)

    created_at = Column(DateTime)