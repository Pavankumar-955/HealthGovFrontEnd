import API from "./axios.js";

/* ✅ GET ALL COMPLIANCE RECORDS */
export const getAllComplianceRecords = () => {
  return API.get("/api/v1/compliance-records/all");
};

/* ✅ GET COMPLIANCE BY ID */
export const getComplianceById = (complianceId) => {
  return API.get(`/api/v1/compliance-records/${complianceId}`);
};

/* ✅ GET COMPLIANCE BY TYPE + ENTITY ID */
export const getComplianceByTypeAndEntity = (type, entityId) => {
  return API.get(`/api/v1/compliance-records/${type}/${entityId}`);
};

/* ✅ CREATE COMPLIANCE RECORD */
export const createComplianceRecord = (payload) => {
  // payload: ComplianceCreateRequest
  return API.post("/api/v1/compliance-records/create", payload);
};

/* ✅ FULL UPDATE (TYPE + ENTITY ID) */
export const updateComplianceRecord = (type, entityId, payload) => {
  // payload: ComplianceUpdateRequest
  return API.put(`/api/v1/compliance-records/${type}/${entityId}`, payload);
};

/* ✅ UPDATE RESULT ONLY */
export const updateComplianceResult = (type, entityId, result) => {
  return API.patch(
    `/api/v1/compliance-records/${type}/${entityId}/result`,
    null,
    {
      params: { result },
    }
  );
};

/* ✅ UPDATE NOTES ONLY */
export const updateComplianceNotes = (type, entityId, notes) => {
  return API.patch(
    `/api/v1/compliance-records/${type}/${entityId}/notes`,
    null,
    {
      params: { notes },
    }
  );
};

/* ✅ OFFICER UPDATE (RESULT + NOTES) */
export const officerUpdateCompliance = (type, entityId, payload) => {
  // payload: { result, notes, officerId }
  return API.patch(
    `/api/v1/compliance-records/${type}/${entityId}/officer-update`,
    payload
  );
};

/* ✅ GET COMPLIANCE SUMMARY */
export const getComplianceSummary = () => {
  return API.get("/api/v1/compliance-records/summary");
};

/* ✅ DELETE COMPLIANCE RECORD */
export const deleteComplianceRecord = (complianceId) => {
  return API.delete(`/api/v1/compliance-records/delete/${complianceId}`);
};