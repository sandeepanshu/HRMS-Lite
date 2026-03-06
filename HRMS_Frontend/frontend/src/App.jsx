import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 min-h-screen bg-slate-50 p-10 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/attendance" element={<Attendance />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;