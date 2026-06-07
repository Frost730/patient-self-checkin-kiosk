from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
from models import Base, Patient
from schemas import PatientCreate

from datetime import datetime

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Patient Kiosk API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database session helper
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Token Generator
def generate_token(department):

    prefixes = {
        "General Medicine": "GM",
        "Cardiology": "CAR",
        "Orthopedics": "ORT",
        "Dermatology": "DER",
        "Pediatrics": "PED"
    }

    db = SessionLocal()

    count = db.query(Patient).filter(
        Patient.department == department
    ).count()

    db.close()

    return f"{prefixes[department]}{count + 1:03}"


# Home Route
@app.get("/")
def home():
    return {
        "message": "Patient Kiosk API Running"
    }


# Create Patient
@app.post("/api/patients")
def create_patient(patient: PatientCreate):

    # Validation

    if not patient.name.strip():
        raise HTTPException(
            status_code=400,
            detail="Name is required"
        )

    if not patient.gender:
        raise HTTPException(
            status_code=400,
            detail="Gender is required"
        )

    if patient.age < 1 or patient.age > 120:
        raise HTTPException(
            status_code=400,
            detail="Age must be between 1 and 120"
        )

    if len(patient.mobile) != 10 or not patient.mobile.isdigit():
        raise HTTPException(
            status_code=400,
            detail="Mobile number must contain exactly 10 digits"
        )

    if not patient.department:
        raise HTTPException(
            status_code=400,
            detail="Department is required"
        )

    db = SessionLocal()

    token = generate_token(patient.department)

    new_patient = Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        mobile=patient.mobile,
        address=patient.address,
        department=patient.department,
        token=token,
        created_at=datetime.now()
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    response = {
        "id": new_patient.id,
        "name": new_patient.name,
        "department": new_patient.department,
        "token": new_patient.token,
        "created_at": new_patient.created_at
    }

    db.close()

    return response


# Get All Patients
@app.get("/api/patients")
def get_patients(search: str = ""):

    db = SessionLocal()

    query = db.query(Patient)

    if search:
        query = query.filter(
            Patient.name.contains(search)
        )

    patients = query.all()

    db.close()

    return patients


# Get Patient By ID
@app.get("/api/patients/{patient_id}")
def get_patient(patient_id: int):

    db = SessionLocal()

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    db.close()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return patient

