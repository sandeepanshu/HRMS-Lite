import React, { useState, useEffect } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../api/api";
import { Trash2, UserPlus, Loader2, Edit2, X, Briefcase } from "lucide-react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (emp) => {
    setEditingId(emp.employee_id);
    setFormData({
      employee_id: emp.employee_id,
      full_name: emp.full_name,
      email: emp.email,
      department: emp.department,
    });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this employee? This will also remove their attendance history.",
      )
    ) {
      try {
        await deleteEmployee(id); 
        alert("Employee deleted successfully!");
        loadEmployees();
      } catch (err) {
        alert(
          "Error: Could not delete employee. " +
            (err.response?.data?.message || ""),
        );
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ employee_id: "", full_name: "", email: "", department: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
        alert("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        alert("Employee added successfully!");
      }
      resetForm();
      loadEmployees();
    } catch (err) {
      alert("Action failed. Ensure ID and Email are unique.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          {editingId ? "Modify Record" : "Employee Directory"}
        </h2>
        {editingId && (
          <button
            onClick={resetForm}
            className="text-rose-500 font-bold text-sm flex items-center hover:underline"
          >
            <X size={16} className="mr-1" /> Cancel Edit
          </button>
        )}
      </div>

      {/* Standardized Form Grid */}
      <div
        className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 ${editingId ? "border-amber-300 bg-amber-50/30" : "border-slate-200/60"}`}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <div>
            <label>Employee ID</label>
            <input
              className={editingId ? "bg-slate-200" : ""}
              placeholder="EMP-001"
              required
              disabled={!!editingId}
              value={formData.employee_id}
              onChange={(e) =>
                setFormData({ ...formData, employee_id: e.target.value })
              }
            />
          </div>
          <div>
            <label>Full Name</label>
            <input
              placeholder="John Doe"
              required
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="john@company.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Department</label>
            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            >
              <option value="">Select Dept</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <button
            type="submit"
            className={`h-11 rounded-lg font-bold text-white flex items-center justify-center transition shadow-lg active:scale-95 ${editingId ? "bg-amber-600 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {editingId ? (
              <Edit2 size={18} className="mr-2" />
            ) : (
              <UserPlus size={18} className="mr-2" />
            )}
            {editingId ? "Update" : "Add Staff"}
          </button>
        </form>
      </div>

      {/* Standardized Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Employee
                </th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Contact
                </th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Department
                </th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees.map((emp) => (
                <tr
                  key={emp.employee_id}
                  className={`hover:bg-slate-50 transition-colors ${editingId === emp.employee_id ? "bg-amber-50/50" : ""}`}
                >
                  <td className="p-5">
                    <div className="font-bold text-slate-800">
                      {emp.full_name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono tracking-tighter">
                      ID: {emp.employee_id}
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-600 font-medium">
                    {emp.email}
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      <Briefcase size={10} className="mr-1" /> {emp.department}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditClick(emp)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Edit Record"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.employee_id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
