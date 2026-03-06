from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, date
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from .csrf import csrf_exempt_view

@csrf_exempt_view
class EmployeeListCreateAPI(APIView):

    def get(self, request):
        try:
            employees = Employee.objects.all()
            data = [
                {
                    "employee_id": emp.employee_id,
                    "full_name": emp.full_name,
                    "email": emp.email,
                    "department": emp.department,
                    "created_at": str(emp.created_at) if emp.created_at else None,
                }
                for emp in employees
            ]
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            import traceback
            return Response({"error": str(e), "trace": traceback.format_exc()}, status=500)


    def post(self, request):
        try:
            serializer = EmployeeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            import traceback
            return Response({"error": str(e), "trace": traceback.format_exc()}, status=500)

@csrf_exempt_view
class EmployeeUpdateAPI(APIView):
    def put(self, request, employee_id):
        try:
            employee = Employee.objects(employee_id=employee_id).first()
            if not employee:
                return Response({"message": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

            # We pass partial=True to allow updating only specific fields
            # Note: We usually don't allow changing the employee_id itself
            data = request.data
            employee.full_name = data.get('full_name', employee.full_name)
            employee.email = data.get('email', employee.email)
            employee.department = data.get('department', employee.department)
            
            # Check for email uniqueness if email is changed
            if 'email' in data and data['email'] != employee.email:
                if Employee.objects(email=data['email']).first():
                    return Response({"email": ["Email already exists"]}, status=400)

            employee.save()
            return Response({"message": "Employee updated successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt_view
class EmployeeDeleteAPI(APIView):

    def delete(self, request, employee_id):
        try:
            employee = Employee.objects(employee_id=employee_id).first()
            if not employee:
                return Response({"message": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

            employee.delete()
            return Response({"message": "Employee deleted successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt_view
class AttendanceCreateAPI(APIView):

    def post(self, request):
        try:
            serializer = AttendanceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Attendance marked successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt_view
class AttendanceListAPI(APIView):

    def get(self, request, employee_id):
        try:
            employee = Employee.objects(employee_id=employee_id).first()
            if not employee:
                return Response({"message": "Employee not found"}, status=404)

            records = Attendance.objects(employee=employee)

            from_date = request.GET.get("from")
            to_date = request.GET.get("to")

            if from_date:
                records = records.filter(date__gte=datetime.fromisoformat(from_date).date())
            if to_date:
                records = records.filter(date__lte=datetime.fromisoformat(to_date).date())

            data = [
                {"date": record.date.isoformat() if record.date else None, "status": record.status}
                for record in records
            ]
            return Response(data, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

@csrf_exempt_view
class PresentDaysCountAPI(APIView):

    def get(self, request, employee_id):
        try:
            employee = Employee.objects(employee_id=employee_id).first()
            if not employee:
                return Response({"message": "Employee not found"}, status=404)

            count = Attendance.objects(employee=employee, status__iexact="present").count()
            return Response({"present_days": count}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

@csrf_exempt_view
class DashboardSummaryAPI(APIView):

    def get(self, request):
        try:
            today = date.today()

            total_employees = Employee.objects.count()
            total_attendance = Attendance.objects.count()
            present_today = Attendance.objects(date=today, status__iexact="present").count()

            return Response(
                {
                    "total_employees": total_employees,
                    "total_attendance_records": total_attendance,
                    "present_today": present_today,
                },
                status=200,
            )

        except Exception as e:
            import traceback
            return Response({"error": str(e), "trace": traceback.format_exc()}, status=500)