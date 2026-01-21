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
    """
    DELETE -> Delete employee by employee_id
    """

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
            status=status.HTTP_204_NO_CONTENT
        )
