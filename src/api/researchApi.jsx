import API from "./axios";

const BASE = "/research";

// ✅ get userId dynamically
const getUserId = () => localStorage.getItem("userId");

export const getProjects = (status) => {
  return API.get(`${BASE}/projects`, { params: { status } });
};

export const getProjectById = (id) => {
  return API.get(`${BASE}/projects/${id}`);
};

export const createProject = (data) => {
  return API.post(`${BASE}/createProject`, data, {
    headers: {
      "X-User-Id": getUserId(), // ✅ dynamic userId
    },
  });
};

export const updateProject = (data) => {
  return API.put(`${BASE}/updateProject`, data);
};

export const deleteProject = (id) => {
  return API.delete(`${BASE}/projects/${id}`);
};