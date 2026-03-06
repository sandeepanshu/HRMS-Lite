import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee, deleteEmployee } from '../api/api';
import { Trash2, UserPlus, Loader2 } from 'lucide-react';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ employee_id: '', full_name: '', email: '', department: '' });
    const [error, setError] = useState(null);

    useEffect(() => { loadEmployees(); }, []);

    const loadEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (err) { setError("Failed to load employees."); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(formData);
            setFormData({ employee_id: '', full_name: '', email: '', department: '' });
            loadEmployees();
        } catch (err) {
            alert(err.response?.data?.employee_id || "Error adding employee. Check for duplicate ID/Email.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this employee?")) {
            await deleteEmployee(id);
            loadEmployees();
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-indigo-600" size={48} /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Employee Directory</h2>
            </div>

            {/* Add Employee Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 grid grid-cols-4 gap-4">
                <input className="border p-2 rounded" placeholder="Employee ID" required value={formData.employee_id} onChange={e => setFormData({...formData, employee_id: e.target.value})} />
                <input className="border p-2 rounded" placeholder="Full Name" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                <input className="border p-2 rounded" type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <select className="border p-2 rounded" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required>
                    <option value="">Select Dept</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700">
                    <UserPlus size={18} /> <span>Add Employee</span>
                </button>
            </form>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Email</th>
                            <th className="p-4 font-semibold text-gray-600">Department</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.employee_id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-gray-700">{emp.employee_id}</td>
                                <td className="p-4 font-medium">{emp.full_name}</td>
                                <td className="p-4 text-gray-600">{emp.email}</td>
                                <td className="p-4"><span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">{emp.department}</span></td>
                                <td className="p-4">
                                    <button onClick={() => handleDelete(emp.employee_id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {employees.length === 0 && <div className="p-10 text-center text-gray-400">No employees registered. Add your first employee above!</div>}
            </div>
        </div>
    );
};

export default Employees;