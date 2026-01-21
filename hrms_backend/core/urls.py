from django.urls import path
from .views import EmployeeListCreateAPI, EmployeeDeleteAPI

urlpatterns = [
    path("employees/", EmployeeListCreateAPI.as_view()),
    path("employees/<str:employee_id>/", EmployeeDeleteAPI.as_view()),
]
