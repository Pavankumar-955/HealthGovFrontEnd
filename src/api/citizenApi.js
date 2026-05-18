import API from "./axios";

/**
 * ✅ Get programs the currently logged-in citizen is enrolled in
 * Note: Ensure your backend has this route mapped to /api/citizens/enrollments
 */
export const getCitizenEnrollments = () => API.get("/api/citizen/enrollments");

/**
 * ✅ Enroll a citizen in a specific program
 * matches the call in your Dashboard: programEnrollment(enrollmentData)
 */
export const programEnrollment = (data) => 
  API.post(`/citizen/enroll-program`, data);

/**
 * ⚠️ THE FIX FOR THE 404 ERROR:
 * Your console is looking for /citizen/user/24. 
 * If your backend is actually looking for /api/citizens/24, change this string.
 */
// Change this:
// export const getCitizenById = (id) => API.get(`/citizen/user/${id}`);

// To this:
export const getCitizenById = (id) => API.get(`/citizen/user/${id}`);

/**
 * ✅ Get all programs available for citizens
 */
export const getAllPrograms = () => API.get("/api/programs");