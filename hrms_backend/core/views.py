from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from .csrf import csrf_exempt_view


@csrf_exempt_view
class EmployeeListCreateAPI(APIView):

    def get(self, request):
        employees = Employee.objects.all()
        data = [{
            "employee_id": emp.employee_id,
            "full_name": emp.full_name,
            "email": emp.email,
            "department": emp.department,
            "created_at": emp.created_at
        } for emp in employees]

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

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt_view
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


@csrf_exempt_view
class AttendanceCreateAPI(APIView):

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Attendance marked successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt_view
class AttendanceListAPI(APIView):
    def get(self, request, employee_id):
        employee = Employee.objects(employee_id=employee_id).first()
        if not employee:
            return Response({"message": "Employee not found"}, status=404)

        date = request.GET.get("date")
        records = Attendance.objects(employee=employee)

        if date:
            records = records.filter(date=date)

        data = [
            {"date": r.date, "status": r.status}
            for r in records
        ]
        return Response(data, status=200)
