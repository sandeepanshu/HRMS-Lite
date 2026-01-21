import { useState } from "react";
import API from "../api/api";

export default function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/employees/", form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      onSuccess();
    } catch (err) {
      const data = err.response?.data;

      if (!data) {
        setError("Error creating employee");
        return;
      }

      if (typeof data === "string") {
        setError(data);
        return;
      }

      // DRF field-level errors
      const firstKey = Object.keys(data)[0];
      setError(data[firstKey][0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Add Employee</h3>
      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      />
      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <button disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
