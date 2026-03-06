import React, { useState, useEffect } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../api/api";
import { Trash2, UserPlus, Loader2, Edit2, X } from "lucide-react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // Tracks if we are editing
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare form for editing
  const handleEditClick = (emp) => {
    setEditingId(emp.employee_id);
    setFormData({
      employee_id: emp.employee_id,
      full_name: emp.full_name,
      email: emp.email,
      department: emp.department,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ employee_id: "", full_name: "", email: "", department: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update Logic
        await updateEmployee(editingId, formData);
        alert("Employee updated successfully!");
      } else {
        // Create Logic
        await addEmployee(formData);
        alert("Employee added successfully!");
      }
      resetForm();
      loadEmployees();
    } catch (err) {
      const msg = err.response?.data;
      alert(
        typeof msg === "object"
          ? JSON.stringify(msg)
          : "Operation failed. Check duplicate data.",
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {editingId ? "Edit Employee" : "Employee Directory"}
        </h2>
        {editingId && (
          <button
            onClick={resetForm}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <X size={18} className="mr-1" /> Cancel Edit
          </button>
        )}
      </div>

      {/* Responsive Form Grid */}
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-4 md:p-6 rounded-xl shadow-sm border mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all ${editingId ? "border-orange-300 ring-1 ring-orange-100" : "border-gray-100"}`}
      >
        <input
          className={`border p-2 rounded w-full ${editingId ? "bg-gray-100 cursor-not-allowed" : ""}`}
          placeholder="Employee ID"
          required
          disabled={!!editingId} // ID cannot be changed during edit
          value={formData.employee_id}
          onChange={(e) =>
            setFormData({ ...formData, employee_id: e.target.value })
          }
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Full Name"
          required
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
        <input
          className="border p-2 rounded w-full"
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select
          className="border p-2 rounded w-full"
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
        <button
          type="submit"
          className={`bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition hover:bg-indigo-700 ${editingId ? "bg-orange-600 hover:bg-orange-700" : ""}`}
        >
          {editingId ? <Edit2 size={18} /> : <UserPlus size={18} />}
          <span>{editingId ? "Update Employee" : "Add Employee"}</span>
        </button>
      </form>

      {/* Scrollable Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-sm">ID</th>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Email</th>
              <th className="p-4 font-semibold text-sm">Dept</th>
              <th className="p-4 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.employee_id}
                className={`border-b hover:bg-gray-50 transition ${editingId === emp.employee_id ? "bg-orange-50" : ""}`}
              >
                <td className="p-4 text-sm">{emp.employee_id}</td>
                <td className="p-4 text-sm font-medium">{emp.full_name}</td>
                <td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">
                  {emp.email}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs">
                    {emp.department}
                  </span>
                </td>
                <td className="p-4 flex space-x-3">
                  <button
                    onClick={() => handleEditClick(emp)}
                    className="text-blue-500 hover:scale-110 transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(emp.employee_id)}
                    className="text-red-500 hover:scale-110 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
