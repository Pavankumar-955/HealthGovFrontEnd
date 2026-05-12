import API from "./axios";

// ✅ Get all projects (with optional status filter)
export const getManagerProjects = (status) => {
    if (!status) {
        return API.get("/manager/projects"); // ✅ NO PARAM
    }

    return API.get("/manager/projects", {
        params: { status },
    });
};

// ✅ Approve / Reject (single endpoint)
export const decideProject = (id, data) => {
    return API.post(`/manager/projects/${id}/decision`, data);
};

// ✅ Get project by ID
export const getProjectById = (id) => {
    return API.get(`/manager/projects/${id}`);
};