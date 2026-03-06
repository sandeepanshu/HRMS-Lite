import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20}/> },
        { path: '/employees', name: 'Employees', icon: <Users size={20}/> },
        { path: '/attendance', name: 'Attendance', icon: <CalendarCheck size={20}/> },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white flex flex-col min-h-screen sticky top-0">
            <div className="p-8 flex items-center space-x-3">
                <div className="bg-indigo-500 p-2 rounded-lg"><ShieldCheck size={24}/></div>
                <h1 className="text-xl font-bold tracking-tight">HRMS <span className="text-indigo-400">Lite</span></h1>
            </div>
            
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <NavLink 
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            
            <div className="p-6 border-t border-slate-800 text-xs text-gray-500 text-center">
                Built for Admin Tooling v1.0
            </div>
        </div>
    );
};

export default Sidebar;