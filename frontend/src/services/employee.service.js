import api from './api';

const getEmployees = async (params) => {
  const response = await api.get('/employees', { params });
  return response.data;
};

const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data.data.employee;
};

const createEmployee = async (data) => {
  const response = await api.post('/employees', data);
  return response.data.data.employee;
};

const updateEmployee = async (id, data) => {
  const response = await api.patch(`/employees/${id}`, data);
  return response.data.data.employee;
};

const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

const searchEmployees = async (query) => {
  const response = await api.get('/search/employees', { params: { q: query } });
  return response.data;
};

export default {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
};
