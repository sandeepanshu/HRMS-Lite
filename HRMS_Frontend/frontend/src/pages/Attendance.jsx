import { useState, useEffect } from "react";
import { getEmployees, markAttendance, getAttendance } from "../api/api";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [status, setStatus] = useState("Present"); // Default status
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleMark = async () => {
    if (!selectedEmp) return alert("Please select an employee first!");
    try {
      await markAttendance({ employee_id: selectedEmp, date, status });
      alert(`Attendance marked as ${status}!`);
      fetchRecords(selectedEmp);
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const fetchRecords = async (id) => {
    if (!id) {
      setAttendanceList([]);
      return;
    }
    setLoading(true);
    setSelectedEmp(id);
    try {
      const res = await getAttendance(id);
      setAttendanceList(res.data);
    } catch (err) {
      console.error("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Attendance Tracking
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
            Select Employee
          </label>
          <select
            className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedEmp}
            onChange={(e) => fetchRecords(e.target.value)}
          >
            <option value="">-- Select --</option>
            {employees.map((e) => (
              <option key={e.employee_id} value={e.employee_id}>
                {e.full_name} ({e.employee_id})
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
            Select Status
          </label>
          <select
            className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleMark}
          className="w-full md:w-auto bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          Mark Status
        </button>
      </div>

      {selectedEmp && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-700">
            Attendance History for {selectedEmp}
          </h3>

          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-indigo-500" />
            </div>
          ) : attendanceList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {attendanceList.map((rec, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <span className="text-sm font-semibold text-gray-600">
                    {rec.date}
                  </span>
                  <div className="flex items-center">
                    {rec.status === "Present" ? (
                      <span className="flex items-center text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                        <CheckCircle size={14} className="mr-1" /> {rec.status}
                      </span>
                    ) : (
                      <span className="flex items-center text-xs px-2.5 py-1 bg-red-100 text-red-700 rounded-full font-bold">
                        <XCircle size={14} className="mr-1" /> {rec.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10 italic">
              No attendance records found for this employee.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
