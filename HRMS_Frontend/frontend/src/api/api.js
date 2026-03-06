import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEmployees = () => API.get('api/employees/');
export const addEmployee = (data) => API.post('api/employees/', data);
export const deleteEmployee = (id) => API.delete(`api/employees/${id}/`);
export const markAttendance = (data) => API.post('api/attendance/', data);
export const getAttendance = (id) => API.get(`api/attendance/${id}/`);
export const getStats = () => API.get('api/dashboard/summary/');

export default API;