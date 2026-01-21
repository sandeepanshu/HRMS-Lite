import { useEffect, useState } from "react";
import API from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendancePanel from "../components/AttendancePanel";
import Header from "../components/Header";
// import EmployeeForm from "../EmployeeForm";
// import EmployeeList from "./EmployeeList";
// import AttendancePanel from "./AttendancePanel";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
      setError("");
    } catch (e) {
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="card">
        <h3>Dashboard</h3>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p>Total Employees: <b>{employees.length}</b></p>
        )}
      </div>

      <div className="grid">
        <div>
          <EmployeeForm onSuccess={loadEmployees} />
          <EmployeeList
            employees={employees}
            onSelect={setSelectedEmployee}
            onReload={loadEmployees}
          />
        </div>

        <div>
          <AttendancePanel employee={selectedEmployee} />
        </div>
      </div>
    </div>
  );
}
