# HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.  
It allows an admin to manage employee records and track daily attendance through a clean, usable, and professional interface.

This project evaluates end-to-end full-stack development skills including frontend UI, backend APIs, database persistence, and deployment.

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

### Employee Management
- Add new employee
- View all employees
- Delete employee
- Server-side validation
- Duplicate employee ID & email handling

### Attendance Management
- Mark daily attendance (Present / Absent)
- View attendance records per employee

---

## 🔗 API Endpoints

- `POST /api/employees/` – Create employee  
- `GET /api/employees/` – List employees  
- `DELETE /api/employees/{employee_id}` – Delete employee  
- `POST /api/attendance/` – Mark attendance  
- `GET /api/attendance/{employee_id}` – View attendance  

---

## ▶️ Steps to Run Project Locally

### 1️⃣ Backend Setup

```bash
git clone https://github.com/sandeepanshu/HRMS-Lite.git
cd HRMS-Lite/hrms_backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
