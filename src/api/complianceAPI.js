import API from "./axios.js";

/* ✅ GET ALL COMPLIANCE RECORDS */
export const getAllComplianceRecords = () => {
  return API.get("/api/v1/compliance-records/all");
};

/* ✅ GET COMPLIANCE BY ID */
export const getComplianceById = (complianceId) => {
  return API.get(`/api/v1/compliance-records/${complianceId}`);
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
