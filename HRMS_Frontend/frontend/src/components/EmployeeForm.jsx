import { useState } from "react";
import API from "../api/api";

export default function EmployeeForm({ onSuccess }){
  const [form, setForm] = useState({ employee_id:"", full_name:"", email:"", department:"" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await API.post("/employees/", form);
      setForm({ employee_id:"", full_name:"", email:"", department:"" });
      onSuccess && onSuccess();
    } catch (error) {
      setErr(error.response?.data?.message || JSON.stringify(error.response?.data) || "Error creating employee");
    } finally { setLoading(false); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Add Employee</h3>

      <div className="form-group">
        <input placeholder="Employee ID" value={form.employee_id}
          onChange={e=>setForm({...form, employee_id:e.target.value})} required />
      </div>

      <div className="form-group">
        <input placeholder="Full Name" value={form.full_name}
          onChange={e=>setForm({...form, full_name:e.target.value})} required />
      </div>

      <div className="form-group">
        <input placeholder="Email" type="email" value={form.email}
          onChange={e=>setForm({...form, email:e.target.value})} required />
      </div>

      <div className="form-group">
        <input placeholder="Department" value={form.department}
          onChange={e=>setForm({...form, department:e.target.value})} required />
      </div>

      <div style={{display:"flex",gap:10}}>
        <button disabled={loading}>{loading ? "Saving..." : "Add Employee"}</button>
      </div>

      {err && <p className="error">{err}</p>}
    </form>
  );
}
