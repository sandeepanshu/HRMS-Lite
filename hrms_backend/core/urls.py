from django.urls import path
from .views import (
    EmployeeListCreateAPI,
    EmployeeDeleteAPI,
    AttendanceCreateAPI,
    AttendanceListAPI,
    PresentDaysCountAPI,
    DashboardSummaryAPI,
)

urlpatterns = [
    path("employees/", EmployeeListCreateAPI.as_view()),
    path("employees/<str:employee_id>/", EmployeeDeleteAPI.as_view()),

    path("attendance/", AttendanceCreateAPI.as_view()),
    path("attendance/<str:employee_id>/", AttendanceListAPI.as_view()),

    path(
        "employees/<str:employee_id>/present-count/",
        PresentDaysCountAPI.as_view()
    ),

    path("dashboard/summary/", DashboardSummaryAPI.as_view()),
]
