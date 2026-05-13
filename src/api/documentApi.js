// src/api/documentApi.js
import API from './axios';

const documentApi = {
  // Get all documents in the system for verification
  getAllDocuments: () => API.get('/document/all'), 
  
  // Update status (PENDING, VERIFIED, REJECTED)
  verifyDocument: (docId, status) => 
    API.put(`/document/${docId}/verify`, null, { params: { status } }),
};

export default documentApi;