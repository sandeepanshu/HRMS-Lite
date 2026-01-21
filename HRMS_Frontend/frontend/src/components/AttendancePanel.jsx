import { useEffect, useState } from "react";
import API from "../api/api";

function AttendanceFilter({ employeeId, onRecords }){
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const path = `/attendance/${employeeId}/?${from?`from=${from}&`:''}${to?`to=${to}`:''}`;
      const res = await API.get(path);
      onRecords(res.data);
    } catch (err) {
      onRecords([]);
    } finally { setLoading(false); }
  };

  return (
    <div className="card" style={{marginTop:12}}>
      <h4>Filter Attendance</h4>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="secondary" type="button" onClick={fetch} disabled={loading}>{loading?"…":"Apply"}</button>
      </div>
    </div>
  );
}

export default function AttendancePanel({ employee }){
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [err, setErr] = useState("");

  useEffect(()=> {
    if(employee?.employee_id) fetchAll();
  }, [employee]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/attendance/${employee.employee_id}/`);
      setRecords(res.data);
    } catch (e) {
      setRecords([]);
    } finally { setLoading(false); }
  };

  const mark = async () => {
    setErr("");
    try {
      await API.post("/attendance/", { employee_id: employee.employee_id, date, status });
      await fetchAll();
    } catch (e){
      setErr(e.response?.data?.message || JSON.stringify(e.response?.data) || "Could not mark attendance");
    }
  };

  if(!employee) return <div className="card small">Select an employee to view attendance</div>;

  return (
    <>
      <div className="card">
        <h4>Mark Attendance for {employee.full_name}</h4>

        <div className="form-group">
          <label className="small">Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="small">Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            <option>Present</option>
            <option>Absent</option>
          </select>
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={mark}>Mark</button>
          <button className="secondary" onClick={fetchAll} type="button">Refresh</button>
        </div>

        {err && <p className="error">{err}</p>}
      </div>

      <AttendanceFilter employeeId={employee.employee_id} onRecords={setRecords} />

      <div className="card">
        <h4>Attendance Records</h4>
        {loading ? <p>Loading…</p> : records.length === 0 ? <p className="small">No attendance records</p> : (
          <div className="attendance-list">
            {records.map((r,i)=>(
              <div className="att-item" key={i}>
                <div>{r.date}</div>
                <div style={{color: r.status==="Present" ? "var(--success)" : "var(--muted)"}}>{r.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
