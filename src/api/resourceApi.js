import API from "./axios.js";

// ✅ Use same pattern as Infra
const BASE_PATH = "/resources";

// ✅ SAME error handler
const handleError = (error) => {
  let message = "Something went wrong";

  if (error.response) {
    const data = error.response.data;

    if (data?.errMessage) {
      message = data.errMessage;
    } else if (data?.message) {
      message = data.message;
    } else {
      message = `Server Error ${error.response.status}`;
    }
  } else if (error.request) {
    message = "Backend not reachable";
  }

  return Promise.reject(message);
};


// ✅ GET RESOURCES BY PROGRAM
export const getResourcesByProgram = (programId) =>
  API.get(`${BASE_PATH}/program/${programId}`)
    .catch(handleError);


// ✅ CREATE RESOURCE
export const createResource = (data) =>
  API.post(`${BASE_PATH}/save`, data)
    .catch(handleError);


// ✅ UPDATE RESOURCE
export const updateResource = (id, data) =>
  API.put(`${BASE_PATH}/update/${id}`, data)
    .catch(handleError);


// ✅ DELETE RESOURCE
export const deleteResource = (id) =>
  API.delete(`${BASE_PATH}/delete/${id}`)
    .catch(handleError);


// ✅ GLOBAL SEARCH
export const searchResources = (type, status) => {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (status) params.append("status", status);

  return API.get(`${BASE_PATH}/search?${params.toString()}`)
    .catch(handleError);
};


// ✅ PROGRAM-SPECIFIC SEARCH ✅
export const searchResourcesByProgram = (
  programId,
  type,
  status
) => {
  const params = new URLSearchParams();

  if (programId !== null && programId !== undefined) {
    params.append("programId", programId);
  }

  if (type) params.append("type", type);
  if (status) params.append("status", status);

  return API.get(`${BASE_PATH}/searchByProgram?${params.toString()}`)
    .catch(handleError);
};


// ✅ GET ALL (optional)
export const getAllResources = () =>
  API.get(`${BASE_PATH}/getAll`)
    .catch(handleError);


// ✅ REPORT
export const getResourceReport = () =>
  API.get(`${BASE_PATH}/report`)
    .catch(handleError);