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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Attendance Tracking</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Employee</label>
          <select
            className="w-full border p-2 rounded"
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
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button
          onClick={handleMark}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Mark Status
        </button>
      </div>

      {selectedEmp && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-bold mb-4">Records for {selectedEmp}</h3>
          <div className="grid grid-cols-2 gap-4">
            {attendanceList.map((rec, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{rec.date}</span>
                <span
                  className={
                    rec.status === "Present"
                      ? "text-green-600 font-bold"
                      : "text-red-500"
                  }
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
