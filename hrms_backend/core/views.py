from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from .csrf import csrf_exempt_view
from datetime import datetime, date, time

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

        records = Attendance.objects(employee=employee)

        from_date = request.GET.get("from")
        to_date = request.GET.get("to")

        if from_date:
            records = records.filter(
                date__gte=datetime.fromisoformat(from_date)
            )
        if to_date:
            records = records.filter(
                date__lte=datetime.fromisoformat(to_date)
            )

        data = [{
            "date": record.date,
            "status": record.status
        } for record in records]

        return Response(data, status=200)


@csrf_exempt_view
class PresentDaysCountAPI(APIView):

    def get(self, request, employee_id):
        employee = Employee.objects(employee_id=employee_id).first()
        if not employee:
            return Response({"message": "Employee not found"}, status=404)

        count = Attendance.objects(
            employee=employee,
            status__iexact="present"   # ✅ FIX
        ).count()

        return Response({"present_days": count}, status=200)

@csrf_exempt_view
class DashboardSummaryAPI(APIView):

    def get(self, request):
        today = date.today()

        start_of_day = datetime.combine(today, time.min)
        end_of_day = datetime.combine(today, time.max)

        total_employees = Employee.objects.count()
        total_attendance = Attendance.objects.count()

        present_today = Attendance.objects(
            date__gte=start_of_day,
            date__lte=end_of_day,
            status__iexact="present"
        ).count()

        return Response({
            "total_employees": total_employees,
            "total_attendance_records": total_attendance,
            "present_today": present_today
        }, status=200)