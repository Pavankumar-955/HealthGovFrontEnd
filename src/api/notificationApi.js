import API from "./axios";

// ✅ get notifications for user
export const getNotificationsByUser = (userId) => {
  return API.get(`/api/notifications/user/${userId}`);
};

// ✅ mark as read
export const markNotificationAsRead = (id) => {
  return API.put(`/api/notifications/${id}/read`);
};