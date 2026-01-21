## HRMS Lite Backend

### Overview
Lightweight HRMS backend built using Django, DRF, and MongoDB.

### Tech Stack
- Django
- Django REST Framework
- MongoDB Atlas
- MongoEngine

### Features
- Employee management
- Attendance tracking
- Validation & error handling

### API Endpoints
- POST /api/employees/
- GET /api/employees/
- DELETE /api/employees/{employee_id}
- POST /api/attendance/
- GET /api/attendance/{employee_id}

### Setup (Local)
1. Create virtualenv
2. pip install -r requirements.txt
3. python manage.py runserver

### Assumptions
- Single admin
- No authentication
