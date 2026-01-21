import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendancePanel from "../components/AttendancePanel";
import DashboardSummary from "../components/DashboardSummary";

export default function App(){
  const [selected, setSelected] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // to trigger child reloads

  const onSuccessAdd = ()=> {
    // to refresh list we can use a simple approach: reload the page's list by key
    setReloadKey(k=>k+1);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="brand">
          <div className="logo">HR</div>
          <div>
            <div className="title">HRMS Lite</div>
            <div className="small">Employee & Attendance Management</div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          <DashboardSummary />
          <EmployeeForm onSuccess={onSuccessAdd} />
          <EmployeeList key={reloadKey} onSelect={setSelected} />
        </div>

        <div>
          <div className="card">
            <h3>Selected Employee</h3>
            {!selected ? <p className="small">No employee selected</p> : (
              <div>
                <div style={{fontWeight:700}}>{selected.full_name}</div>
                <div className="small">{selected.employee_id} · {selected.email}</div>
                <div style={{marginTop:8}} className="small">Department: {selected.department}</div>
              </div>
            )}
          </div>

          <AttendancePanel employee={selected} />
        </div>
      </div>
    </div>
  );
}
