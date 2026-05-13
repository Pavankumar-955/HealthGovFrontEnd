import API from "./axios";

const BASE_URL = "/api/enrollments";

// ✅ CREATE
export const createEnrollment = (data) =>
  API.post(`${BASE_URL}/create`, data);

// ✅ GET ALL
export const getEnrollments = () =>
  API.get(`${BASE_URL}/all`);

// ✅ GET BY ID
export const getEnrollmentById = (id) =>
  API.get(`${BASE_URL}/${id}`);

// ✅ ✅ UPDATE (MATCHES YOUR BACKEND)
export const updateEnrollment = (data) =>
  API.put(`${BASE_URL}/update`, data);

// ✅ DELETE
export const deleteEnrollment = (id) =>
  API.delete(`${BASE_URL}/${id}`);
