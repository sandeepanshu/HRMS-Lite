import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

export default function Dashboard() {
  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  return (
    <>
      <h1>HRMS Lite - Admin Dashboard</h1>

      <EmployeeForm onSuccess={() => setRefreshEmployees(!refreshEmployees)} />
      <EmployeeList refresh={refreshEmployees} />

      <AttendanceForm onSuccess={(empId) => setSelectedEmployee(empId)} />
      <AttendanceList employeeId={selectedEmployee} />
    </>
  );
}
