import { useEffect, useState } from "react";
import API from "../api/api";

export default function AttendanceForm({ onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/employees/").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/attendance/", {
        employee_id: employeeId,
        date,
        status,
      });
      setDate("");
      setStatus("Present");
      onSuccess(employeeId);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Attendance already marked or invalid data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Mark Attendance</h3>

      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.employee_id} value={e.employee_id}>
            {e.full_name} ({e.employee_id})
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button disabled={loading}>
        {loading ? "Saving..." : "Mark Attendance"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
