import API from "./axios";

const BASE_URL = "/api/programs";

/**
 * GET ALL PROGRAMS
 * Hits: GET /api/programs/all
 */
export const getPrograms = () => API.get(`${BASE_URL}/all`);

/**
 * GET PROGRAM BY ID
 * Hits: GET /api/programs/{id}
 */
export const getProgramById = (id) => API.get(`${BASE_URL}/${id}`);

/**
 * CREATE NEW PROGRAM
 * Hits: POST /api/programs/create
 */
export const createProgram = (data) => API.post(`${BASE_URL}/create`, data);

/**
 * UPDATE PROGRAM
 * Hits: PUT /api/programs/{id}
 * Note: For updates, backend should NOT validate that startDate is in future
 */
export const updateProgram = (id, data) => {
  console.log("🔄 updateProgram API called");
  console.log("  ID:", id);
  console.log("  Data startDate:", data?.startDate);
  console.log("  Full data:", data);
  
  const payload = { 
    ...data, 
    programId: id,
    id: id
  };
  
  console.log("📮 Sending payload to PUT /api/programs/" + id);
  console.log("  Payload startDate:", payload.startDate);
  
  return API.put(`${BASE_URL}/${id}`, payload);
};

/**
 * DELETE PROGRAM
 * Hits: DELETE /api/programs/{id}
 */
export const deleteProgram = (id) => API.delete(`${BASE_URL}/${id}`);