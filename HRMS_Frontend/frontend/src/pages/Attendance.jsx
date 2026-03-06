import React, { useState, useEffect } from "react";
import { getEmployees, markAttendance, getAttendance } from "../api/api";
import { CheckCircle, XCircle, Loader2, CalendarDays } from "lucide-react";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res.data));
  }, []);

  const handleMark = async () => {
    if (!selectedEmp) return alert("Please select an employee first!");
    try {
      await markAttendance({ employee_id: selectedEmp, date, status });
      alert(`Success: ${status} marked for ${date}`);
      fetchRecords(selectedEmp);
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const fetchRecords = async (id) => {
    if (!id) return setAttendanceList([]);
    setLoading(true);
    setSelectedEmp(id);
    try {
      const res = await getAttendance(id);
      setAttendanceList(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
        Attendance Tracking
      </h2>

      {/* Consistent Form Container */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label>Select Employee</label>
            <select
              className="w-full"
              value={selectedEmp}
              onChange={(e) => fetchRecords(e.target.value)}
            >
              <option value="">-- Choose Staff --</option>
              {employees.map((e) => (
                <option key={e.employee_id} value={e.employee_id}>
                  {e.full_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Attendance Status</label>
            <select
              className="w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div>
            <label>Select Date</label>
            <input
              type="date"
              className="w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleMark}
            className="h-11 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-95"
          >
            Mark Attendance
          </button>
        </div>
      </div>

      {/* History Grid */}
      {selectedEmp && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
            <CalendarDays size={16} className="mr-2" /> History for{" "}
            {selectedEmp}
          </h3>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-indigo-500" />
            </div>
          ) : attendanceList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {attendanceList.map((rec, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-700">
                    {rec.date}
                  </span>
                  {rec.status === "Present" ? (
                    <span className="flex items-center text-[10px] px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-black uppercase">
                      <CheckCircle size={12} className="mr-1" /> {rec.status}
                    </span>
                  ) : (
                    <span className="flex items-center text-[10px] px-2 py-1 bg-rose-100 text-rose-700 rounded-full font-black uppercase">
                      <XCircle size={12} className="mr-1" /> {rec.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-medium">
              No previous records found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
