import { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployeeList({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await API.get("/employees/");
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const remove = async (id) => {
    await API.delete(`/employees/${id}/`);
    fetchEmployees();
  };

  if (loading) return <p>Loading employees...</p>;
  if (!employees.length) return <p>No employees found.</p>;

  return (
    <div className="card">
      <h3>Employees</h3>
      {employees.map((e) => (
        <div key={e.employee_id} className="row">
          <span>{e.full_name} ({e.employee_id})</span>
          <button onClick={() => remove(e.employee_id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
