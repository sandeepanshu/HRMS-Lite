import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEmployees = () => API.get('/employees/');
export const addEmployee = (data) => API.post('/employees/', data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}/`);
export const updateEmployee = (id, data) => API.put(`/employees/${id}/update/`, data);
export const markAttendance = (data) => API.post('/attendance/', data);
export const getAttendance = (id) => API.get(`/attendance/${id}/`);

export const getStats = () => API.get('/dashboard/summary/');

export default API;