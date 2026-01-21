from rest_framework import serializers
from mongoengine.errors import NotUniqueError

from .models import Employee, Attendance


class EmployeeSerializer(serializers.Serializer):
    employee_id = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    department = serializers.CharField(required=True)

    def validate_employee_id(self, value):
        if Employee.objects(employee_id=value).first():
            raise serializers.ValidationError("Employee ID already exists")
        return value

    def validate_email(self, value):
        if Employee.objects(email=value).first():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        employee = Employee(**validated_data)
        employee.save()
        return employee


class AttendanceSerializer(serializers.Serializer):
    employee_id = serializers.CharField(required=True)
    date = serializers.DateField(required=True)
    status = serializers.ChoiceField(choices=["Present", "Absent"])

    def create(self, validated_data):
        employee_id = validated_data.pop("employee_id")

        employee = Employee.objects(employee_id=employee_id).first()
        if not employee:
            raise serializers.ValidationError(
                {"employee_id": "Employee not found"}
            )

        try:
            attendance = Attendance(
                employee=employee,
                **validated_data
            )
            attendance.save()
            return attendance

        except NotUniqueError:
            raise serializers.ValidationError(
                {"message": "Attendance already marked for this employee on this date"}
            )
