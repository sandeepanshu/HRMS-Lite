import { useEffect, useState } from "react";
import API from "../api/api";

export default function AttendanceList({ employeeId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!employeeId) return;

    setLoading(true);
    API.get(`/attendance/${employeeId}/`)
      .then((res) => setRecords(res.data))
      .finally(() => setLoading(false));
  }, [employeeId]);

  if (!employeeId) return <p>Select an employee to view attendance.</p>;
  if (loading) return <p>Loading attendance...</p>;
  if (!records.length) return <p>No attendance records.</p>;

  return (
    <div className="card">
      <h3>Attendance Records</h3>
      {records.map((r, i) => (
        <div key={i} className="row">
          <span>{r.date}</span>
          <span>{r.status}</span>
        </div>
      ))}
    </div>
  );
}
