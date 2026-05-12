import API from "./axios.js";

/* ✅ GET ALL AUDITS */
export const getAllAudits = () => {
  return API.get("/api/v1/audits/all");
};

/* ✅ GET AUDIT BY ID */
export const getAuditById = (auditId) => {
  return API.get(`/api/v1/audits/${auditId}`);
};

/* ✅ GET AUDITS BY OFFICER */
export const getAuditsByOfficer = (officerId) => {
  return API.get(`/api/v1/audits/byOfficer/${officerId}`);
};

/* ✅ CREATE AUDIT */
export const createAudit = (payload) => {
  // payload: { officerId, scope, findings, status, date }
  return API.post("/api/v1/audits/create", payload);
};

/* ✅ FULL UPDATE AUDIT */
export const updateAudit = (auditId, payload) => {
  // payload: AuditUpdateRequest
  return API.put(`/api/v1/audits/update/${auditId}`, payload);
};

/* ✅ UPDATE STATUS ONLY */
export const updateAuditStatus = (auditId, status) => {
  return API.patch(
    `/api/v1/audits/update/${auditId}/status`,
    null,
    {
      params: { status },
    }
  );
};

/* ✅ UPDATE FINDINGS ONLY */
export const updateAuditFindings = (auditId, findings) => {
  return API.patch(
    `/api/v1/audits/update/${auditId}/findings`,
    null,
    {
      params: { findings },
    }
  );
};

/* ✅ GET AUDIT SUMMARY */
export const getAuditSummary = () => {
  return API.get("/api/v1/audits/summary");
};