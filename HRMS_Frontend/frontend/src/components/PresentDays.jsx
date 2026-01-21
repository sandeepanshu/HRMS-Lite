import { useEffect, useState } from "react";
import API from "../api/api";

export default function PresentDays({ employeeId }){
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(!employeeId) return;
    setLoading(true);
    API.get(`/employees/${employeeId}/present-count/`)
      .then(res => setCount(res.data.present_days))
      .catch(()=> setCount(0))
      .finally(()=> setLoading(false));
  },[employeeId]);

  if(loading) return <span className="small">Loading…</span>;
  return <span className="small">Present days: <strong>{count}</strong></span>;
}
