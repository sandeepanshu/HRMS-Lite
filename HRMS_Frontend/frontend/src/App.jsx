import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 relative">
        <button
          className="lg:hidden fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`fixed lg:static z-40 transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <Sidebar closeMenu={() => setIsMenuOpen(false)} />
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-4 md:p-10 overflow-x-hidden">
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
