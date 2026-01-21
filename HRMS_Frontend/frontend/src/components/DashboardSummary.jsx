
import { useEffect, useState } from "react";
import API from "../api/api";

export default function DashboardSummary(){
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(()=>{
    let cancelled = false;
    setLoading(true);
    API.get("/dashboard/").then(res=>{
      if(!cancelled){
        setStats(res.data);
      }
    }).catch(err=>{
      setError("Failed to load dashboard");
    }).finally(()=>!cancelled && setLoading(false));
    return ()=> cancelled = true;
  },[]);

  if(loading) return <div className="card">Loading dashboard...</div>;
  if(error) return <div className="card error">{error}</div>;

  return (
    <div className="card">
      <div className="stats">
        <div className="stat">
          <h4>Total Employees</h4>
          <p>{stats.total_employees}</p>
        </div>
        <div className="stat">
          <h4>Attendance Records</h4>
          <p>{stats.total_attendance_records}</p>
        </div>
        <div className="stat">
          <h4>Present Today</h4>
          <p>{stats.present_today}</p>
        </div>
      </div>
    </div>
  );
}
