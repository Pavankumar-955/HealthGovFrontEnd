import API from "./axios";

// ✅ Get programs the currently logged-in citizen is enrolled in
export const getCitizenEnrollments = () => API.get("/api/citizens/enrollments");
