from rest_framework import serializers
from .models import Employee


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
