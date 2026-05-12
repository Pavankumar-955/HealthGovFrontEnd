import API from "./axios";

const BASE_URL = "/api/programs";

// ✅ GET all
export const getPrograms = () => API.get(`${BASE_URL}/all`);

// ✅ GET by ID
export const getProgramById = (id) => API.get(`${BASE_URL}/${id}`);

// ✅ CREATE
export const createProgram = (data) =>
  API.post(`${BASE_URL}/create`, data);

// ✅ ✅ FIXED UPDATE
export const updateProgram = (id, data) =>
  API.put(`${BASE_URL}/${id}`, data);

// ✅ ✅ FIXED DELETE
export const deleteProgram = (id) =>
  API.delete(`${BASE_URL}/${id}`);

// ✅ REGISTER CITIZEN FOR PROGRAM
export const registerForProgram = (id) =>
  API.post(`${BASE_URL}/${id}/register`);