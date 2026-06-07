# Patient Self Check-In Kiosk

A healthcare self-service kiosk application built using React, FastAPI, and SQLite.

## Features

### Patient Registration
- Full Name
- Age Validation (1-120)
- Gender Selection
- Mobile Number Validation (10 digits)
- Address
- Department Selection

### Token Generation
- Unique department-based token generation
- Registration timestamp
- Printable token
- Automatic return to home screen

### Admin Dashboard
- View all registered patients
- Search patients by name
- Filter by department
- Total patients statistics
- Today's registrations statistics
- Department count statistics

## Technology Stack

### Frontend
- React
- React Router
- Axios
- Vite

### Backend
- FastAPI
- SQLAlchemy
- SQLite

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn sqlalchemy pydantic

python -m uvicorn main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```
http://localhost:5173
```

## API Endpoints

### Create Patient

POST

```
/api/patients
```

### Get All Patients

GET

```
/api/patients
```

### Search Patients

GET

```
/api/patients?search=name
```

### Get Patient By ID

GET

```
/api/patients/{id}
```

## Screenshots

- Welcome Page
- Registration Page
- Token Page
- Admin Dashboard

