import { useEffect, useState } from "react";
import API from "../api/api";

export default function PresentDays({ employeeId }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!employeeId) return;

    setLoading(true);
    setError(false);


    API.get(`/employees/${employeeId}/present-count/`)
      .then((res) => {
        setCount(Number(res.data.present_days) || 0);
      })
      .catch((err) => {
        setError(true);
        setCount(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [employeeId]);

  if (loading) {
    return <span className="small muted">Loading…</span>;
  }

  if (error) {
    return <span className="small muted">Present days: 0</span>;
  }

  return (
    <span className="small">
      Present days: <strong>{count}</strong>
    </span>
  );
}
