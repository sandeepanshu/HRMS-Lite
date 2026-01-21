# HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System developed as a full-stack web application.  
It allows an admin to manage employee records and track daily attendance through a clean, usable, and professional interface.

This project was built as part of a **Full-Stack Coding Assignment** to evaluate end-to-end development skills, including frontend UI, backend APIs, database persistence, validations, and deployment readiness.

The scope is intentionally limited so that the focus remains on delivering a **clean, stable, and functional application**, not excessive features.

---

## 🛠 Tech Stack Used

### Frontend
- React (Vite)
- JavaScript
- Axios
- HTML, CSS

### Backend
- Python
- Django
- Django REST Framework
- MongoEngine

### Database
- MongoDB Atlas (Cloud)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🚀 Features

### 👨‍💼 Employee Management
The application allows an admin to:
- Add a new employee with:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- View a list of all employees
- Delete an employee

**Server-side validations included:**
- Required fields validation
- Valid email format
- Duplicate employee ID & email handling
- Proper HTTP status codes
- Meaningful error messages

---

### 🗓 Attendance Management
The application allows an admin to:
- Mark daily attendance for an employee with:
  - Date
  - Status (Present / Absent)
- View attendance records for each employee

---

## ⭐ Additional / Bonus Features (Implemented)

The following optional features were implemented after completing the core requirements:

- ✅ Filter attendance records by date range
- ✅ Display total present days per employee
- ✅ Basic dashboard summary

### 📊 Dashboard Summary Includes
- Total number of employees
- Total attendance records
- Employees marked present today

---

## 🔗 API Endpoints

### Employee APIs
- `POST /api/employees/` – Create employee  
- `GET /api/employees/` – List all employees  
- `DELETE /api/employees/{employee_id}/` – Delete employee  

### Attendance APIs
- `POST /api/attendance/` – Mark attendance  
- `GET /api/attendance/{employee_id}/` – View attendance (supports date filters)

### Analytics / Summary APIs
- `GET /api/employees/{employee_id}/present-count/` – Get total present days  
- `GET /api/dashboard/summary/` – Dashboard statistics

---

## ▶️ Steps to Run Project Locally

### 1️⃣ Backend Setup

```bash
git clone https://github.com/sandeepanshu/HRMS-Lite.git
cd HRMS-Lite/hrms_backend

python -m venv venv
source venv/bin/activate   # Mac/Linux
# venv\Scripts\activate    # Windows

pip install -r requirements.txt
