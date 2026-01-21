from django.db import models

# Create your models here.
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime


class Employee(Document):
    employee_id = StringField(required=True, unique=True)
    full_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    department = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "employees"
    }

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"

from mongoengine import ReferenceField, DateField


class Attendance(Document):
    STATUS_CHOICES = ("Present", "Absent")

    employee = ReferenceField(Employee, required=True)
    date = DateField(required=True)
    status = StringField(required=True, choices=STATUS_CHOICES)

    meta = {
        "collection": "attendance",
        "indexes": [
            {
                "fields": ["employee", "date"],
                "unique": True
            }
        ]
    }

    def __str__(self):
        return f"{self.employee.employee_id} - {self.date} - {self.status}"
