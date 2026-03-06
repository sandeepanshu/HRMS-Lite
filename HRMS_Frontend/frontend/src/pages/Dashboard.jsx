import React, { useState, useEffect } from 'react';
import { getStats } from '../api/api';
import { Users, CheckCircle, BarChart3, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStats().then(res => setStats(res.data)).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    const cards = [
        { title: 'Total Employees', value: stats?.total_employees, icon: <Users />, color: 'bg-blue-500' },
        { title: 'Attendance Records', value: stats?.total_attendance_records, icon: <BarChart3 />, color: 'bg-purple-500' },
        { title: 'Present Today', value: stats?.present_today, icon: <CheckCircle />, color: 'bg-green-500' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className={`${card.color} p-4 rounded-xl text-white`}>{card.icon}</div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-10 bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                <h3 className="text-indigo-900 font-bold text-lg">Quick Tip 💡</h3>
                <p className="text-indigo-700 mt-2">Use the Employees tab to manage your staff and the Attendance tab to track daily presence.</p>
            </div>
        </div>
    );
};

export default Dashboard;