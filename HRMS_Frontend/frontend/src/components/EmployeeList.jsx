import { useEffect, useState } from "react";
import API from "../api/api";
import PresentDays from "./PresentDays";

export default function EmployeeList({ onSelect }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/employees/");
      setEmployees(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const _delete = async (employeeId) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${employeeId}/`);
      loadEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="error">{error}</p>;
  if (employees.length === 0) return <p>No employees found</p>;

  return (
    <div className="card">
      <h3>Employees</h3>

      {employees.map((emp) => (
        <div key={emp.employee_id} className="employee-row">
          {/* LEFT SECTION */}
          <div
            className="emp-left"
            onClick={() => onSelect(emp)}
            style={{ cursor: "pointer" }}
          >
            <div className="emp-name">{emp.full_name}</div>
            <div className="emp-meta">
              {emp.employee_id} · {emp.department}
            </div>
            <div className="small">{emp.email}</div>
          </div>

          {/* RIGHT SECTION */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "8px",
              minWidth: "150px",
            }}
          >
            {/* Present days */}
            <div className="small">
              <PresentDays employeeId={emp.employee_id} />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="secondary"
                onClick={() => onSelect(emp)}
                style={{ padding: "6px 10px" }}
              >
                Open
              </button>

              <button
                onClick={() => _delete(emp.employee_id)}
                style={{
                  padding: "6px 10px",
                  background: "var(--danger)",
                  color: "#fff",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
