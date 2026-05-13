import API from './axios';

const healthApi = {
  // Get health profile for a citizen
  getHealthProfile: (citizenId) => API.get(`/health-profile/${citizenId}`),

  // Get all health profiles for provider overview
  getAllHealthProfiles: () => API.get('/health-profile/all'),

  // Create or update health profile
  saveOrUpdateHealthProfile: (citizenId, data) => API.post(`/health-profile/${citizenId}`, data),

  // Update health profile (PUT)
  updateHealthProfile: (citizenId, data) => API.put(`/health-profile/${citizenId}`, data),

  // Delete health profile
  deleteHealthProfile: (citizenId) => API.delete(`/health-profile/${citizenId}`),

  // Approve health profile
  approveHealthProfile: (citizenId, status) => API.put(`/health-profile/${citizenId}/approve`, null, { params: { status } }),
};

export default healthApi;