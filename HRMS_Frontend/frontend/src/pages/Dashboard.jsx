import React, { useState, useEffect } from "react";
import { getStats } from "../api/api";
import { Users, CheckCircle, BarChart3, Loader2 } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );

  const cards = [
    {
      title: "Total Employees",
      value: stats?.total_employees || 0,
      icon: <Users size={24} />,
      color: "bg-blue-600",
    },
    {
      title: "Attendance Records",
      value: stats?.total_attendance_records || 0,
      icon: <BarChart3 size={24} />,
      color: "bg-purple-600",
    },
    {
      title: "Present Today",
      value: stats?.present_today || 0,
      icon: <CheckCircle size={24} />,
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center space-x-5 hover:shadow-md transition-shadow"
          >
            <div
              className={`${card.color} p-4 rounded-xl text-white shadow-lg`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {card.title}
              </p>
              <p className="text-3xl font-black text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-xl mb-2 flex items-center">
            <span className="mr-2">💡</span> Quick Tip
          </h3>
          <p className="text-indigo-100 max-w-2xl leading-relaxed">
            Keep your records up to date! Use the **Employees** tab to manage
            staff details and the **Attendance** tab to log daily presence in
            real-time.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Dashboard;
