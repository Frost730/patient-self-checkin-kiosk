from pydantic import BaseModel

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    mobile: str
    address: str | None = None
    department: str


class PatientResponse(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    mobile: str
    address: str | None
    department: str
    token: str

    class Config:
        from_attributes = True