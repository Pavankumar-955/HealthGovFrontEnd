import API from "./axios";

const BASE = "/research";

// get userId dynamically
const getUserId = () => localStorage.getItem("userId");

// Ftech projects
export const getProjects = (status) => {
  // if status is empty OR "All" OR null → fetch all
  if (!status || status.trim() === "") {
    return API.get(`${BASE}/projects`);
  }

  // otherwise filter
  return API.get(`${BASE}/projects`, {
    params: { status },
  });
};

export const getProjectById = (id) => {
  return API.get(`${BASE}/projects/${id}`);
};

export const createProject = (data) => {
  return API.post(`${BASE}/createProject`, data, {
    headers: {
      "X-User-Id": getUserId(),
    },
  });
};

export const updateProject = (data) => {
  return API.put(`${BASE}/updateProject`, data);
};

export const deleteProject = (id) => {
  return API.delete(`${BASE}/projects/${id}`);
};