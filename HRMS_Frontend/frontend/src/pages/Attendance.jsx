import React, { useState, useEffect } from "react";
import { getEmployees, markAttendance, getAttendance } from "../api/api";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleMark = async () => {
    if (!selectedEmp) return alert("Select an employee");
    try {
      await markAttendance({ employee_id: selectedEmp, date, status });
      alert("Attendance Marked!");
      fetchRecords(selectedEmp);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const fetchRecords = async (id) => {
    setSelectedEmp(id);
    const res = await getAttendance(id);
    setAttendanceList(res.data);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Attendance Tracking
      </h2>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
        <div className="flex-1">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
            Employee
          </label>
          <select
            className="w-full border p-2 rounded bg-gray-50"
            onChange={(e) => fetchRecords(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.employee_id} value={e.employee_id}>
                {e.full_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded bg-gray-50"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleMark}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 transition"
        >
          Mark Status
        </button>
      </div>

      {/* Record List */}
      {selectedEmp && (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">
            Records for {selectedEmp}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {attendanceList.map((rec, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="text-sm font-medium">{rec.date}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold ${rec.status === "Present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {rec.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
