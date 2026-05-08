import axios from "axios";

const API = "http://localhost:9091/research";

// ✅ Fetch ALL projects
export const getAllProjects = () => {
  return axios.get(API);
};

// ✅ Fetch by status
export const getProjectsByStatus = (status) => {
  return axios.get(`${API}?status=${status}`);
};

// ✅ Create project
export const createProject = (data) => {
  return axios.post(API, data);
};

// ✅ Update project
export const updateProject = (data) => {
  return axios.put(API, data);
};

// ✅ Delete project
export const deleteProject = (id) => {
  return axios.delete(`${API}/${id}`);
};
