from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeListCreateAPI(APIView):
    """
    GET  -> List all employees
    POST -> Add new employee
    """

    def get(self, request):
        employees = Employee.objects.all()

        data = []
        for emp in employees:
            data.append({
                "employee_id": emp.employee_id,
                "full_name": emp.full_name,
                "email": emp.email,
                "department": emp.department,
                "created_at": emp.created_at
            })

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            employee = serializer.save()
            return Response(
                {
                    "message": "Employee created successfully",
                    "employee_id": employee.employee_id
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class EmployeeDeleteAPI(APIView):
    def delete(self, request, employee_id):
        employee = Employee.objects(employee_id=employee_id).first()

        if not employee:
            return Response(
                {"message": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        employee.delete()
        return Response(
            {"message": "Employee deleted successfully"},
            status=status.HTTP_200_OK
        )


from .models import Attendance
from .serializers import AttendanceSerializer


class AttendanceCreateAPI(APIView):
    """
    POST -> Mark attendance
    """

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Attendance marked successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class AttendanceListAPI(APIView):
    """
    GET -> View attendance for an employee
    """

    def get(self, request, employee_id):
        employee = Employee.objects(employee_id=employee_id).first()
        if not employee:
            return Response(
                {"message": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        records = Attendance.objects(employee=employee)

        data = []
        for record in records:
            data.append({
                "date": record.date,
                "status": record.status
            })

        return Response(data, status=status.HTTP_200_OK)
