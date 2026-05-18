import API from "./axios.js";

// ✅ Use baseURL from main axios (http://localhost:9091)
// Add only extra path
const BASE_PATH = "/infrastructures";

// ✅ Centralized error handling
const handleError = (error) => {
  let message = "Something went wrong";

  if (error.response) {
    const data = error.response.data;

    if (data?.errMessage) {
      message = data.errMessage;
    } else {
      message = `Server Error ${error.response.status}`;
    }
  } else if (error.request) {
    message = "Backend not reachable";
  }

  return Promise.reject(message);
};

// ✅ APIs

export const getInfraByProgram = (programId) =>
  API.get(`${BASE_PATH}/program/${programId}`).catch(handleError);

export const createInfra = (data) =>
  API.post(`${BASE_PATH}/save`, data).catch(handleError);

export const updateInfra = (id, data) =>
  API.patch(`${BASE_PATH}/update/${id}`, data).catch(handleError);

export const deleteInfra = (id) =>
  API.delete(`${BASE_PATH}/delete/${id}`).catch(handleError);

export const searchInfra = (type, location, status) => {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (location) params.append("location", location);
  if (status) params.append("status", status);

  return API.get(`${BASE_PATH}/search?${params.toString()}`)
    .catch(handleError);
};

export const searchInfraByProgram = (
  programId,
  type,
  location,
  status
) => {
  const params = new URLSearchParams();

  if (programId) params.append("programId", programId);
  if (type) params.append("type", type);
  if (location) params.append("location", location);
  if (status) params.append("status", status);

  return API.get(`${BASE_PATH}/searchByProgram?${params.toString()}`)
    .catch(handleError);
};

// ✅ REPORT
export const getInfraReport = () =>
  API.get(`${BASE_PATH}/report`).catch(handleError);
