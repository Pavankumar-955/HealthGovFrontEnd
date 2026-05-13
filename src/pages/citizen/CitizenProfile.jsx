import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW IMPORT
import { useAuth } from '../../context/AuthContext'; 
import axios from 'axios';
import API from '../../api/axios'; 
import toast from 'react-hot-toast';
import { MdSave, MdCheckCircle, MdEdit, MdCancel, MdUpload, MdDelete, MdFilePresent } from 'react-icons/md';

export default function CitizenProfile() {
  const { user } = useAuth();
  const navigate = useNavigate(); // INSTANTIATE HOOK
  
  const [citizenId, setCitizenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('PENDING'); 
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    contactInfo: '',
    address: ''
  });

  // Document upload states
  const [documents, setDocuments] = useState([]);
  const [uploadForm, setUploadForm] = useState({
    documentName: '',
    documentType: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);

  const formatBackendDate = (dateVal) => {
    if (!dateVal) return '';
    if (Array.isArray(dateVal)) {
      const [year, month, day] = dateVal;
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    return dateVal;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.userId) return;

      try {
        setLoading(true);
        const response = await API.get(`/citizen/user/${user.userId}`);
        const data = response.data;

        setCitizenId(data.citizenId);
        setStatus(data.status);

        setForm({
          name: data.name || '',
          dob: formatBackendDate(data.dob), 
          gender: data.gender || '',
          contactInfo: data.contactInfo || user.email || '', 
          address: data.address || ''
        });

        if (!data.name) {
          setIsEditing(true);
        } else {
          setIsEditing(false);
        }

      } catch (error) {
        // THE FIX: If the user has no profile (404), bounce them to the Setup page!
        if (error.response && error.response.status === 404) {
          toast("Please complete your profile setup first.", { icon: 'ℹ️' });
          navigate('/citizen/register'); // Route now exists and will show the setup page
        } else {
          console.error("Error fetching profile:", error);
          toast.error("Could not load previous profile data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate]); 

  // Fetch documents when citizenId is available
  useEffect(() => {
    if (citizenId) {
      fetchDocuments();
    }
  }, [citizenId]);

  const fetchDocuments = async () => {
    try {
      console.log('Fetching documents for citizenId:', citizenId);
      const response = await API.get(`/document/${citizenId}`);
      console.log('Documents response:', response.data);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load documents.');
    }
  }; 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!citizenId) {
      toast.error("No profile found to update. Please refresh.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        userId: user.userId,
        name: form.name,
        dob: form.dob,
        gender: form.gender,
        contactInfo: form.contactInfo,
        address: form.address
      };

      await API.put(`/citizen/${citizenId}`, payload);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Document upload handlers
  const handleUploadChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setUploadForm({ ...uploadForm, file: files[0] });
    } else {
      setUploadForm({ ...uploadForm, [name]: value });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!citizenId) {
      toast.error('Profile not loaded. Please refresh.');
      return;
    }
    if (!uploadForm.documentName || !uploadForm.documentType || !uploadForm.file) {
      toast.error('Please fill all fields and select a file.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    const documentType = uploadForm.documentType?.trim().toUpperCase();
    console.log('Upload payload:', {
      documentName: uploadForm.documentName,
      documentType,
      fileName: uploadForm.file?.name,
      fileType: uploadForm.file?.type,
      citizenId
    });
    formData.append('documentName', uploadForm.documentName);
    formData.append('documentType', documentType);
    formData.append('file', uploadForm.file);

    try {
      console.log('Uploading document for citizenId:', citizenId);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API.defaults.baseURL}/document/${citizenId}`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      console.log('Upload response:', response);
      toast.success('Document uploaded successfully!');
      setUploadForm({ documentName: '', documentType: '', file: null });
      fetchDocuments(); // Refresh list
    } catch (error) {
      console.error('Error uploading document:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to upload document.';
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await API.delete(`/document/${citizenId}/${documentId}`);
      toast.success('Document deleted successfully!');
      fetchDocuments(); // Refresh list
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document.');
    }
  };

  const inputStyle = `w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${!isEditing ? 'bg-gray-50 cursor-not-allowed text-gray-500' : 'bg-white'}`;

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-blue-600 font-bold">Loading Profile Data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* HEADER SECTION */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Citizen Profile</h2>
          
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <MdCancel size={20} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-70"
                >
                  <MdSave size={20} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <MdEdit size={20} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* STATUS BANNER */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Status</p>
              <h3 className={`text-2xl font-black uppercase ${status === 'ACTIVE' || status === 'APPROVED' ? 'text-green-600' : 'text-amber-500'}`}>
                {status}
              </h3>
            </div>
            <div className="bg-green-500 text-white p-2 rounded-full">
               <MdCheckCircle size={32} />
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={form.name} 
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle}
                placeholder="e.g. John Doe"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                value={form.dob} 
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle}
              />
            </div>

            {/* Gender Identification */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Gender Identification</label>
              <select 
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Information</label>
              <input 
                type="text" 
                name="contactInfo"
                value={form.contactInfo} 
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle}
                placeholder="email@example.com"
              />
            </div>

            {/* Current Residential Address (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Current Residential Address</label>
              <textarea 
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                className={`${inputStyle} resize-y`}
                placeholder="House No, Street, City, ZIP"
              ></textarea>
            </div>

          </div>

          {/* DOCUMENTS SECTION */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">My Documents</h3>

            {/* Upload Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Upload New Document</h4>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="documentName"
                    placeholder="Document Name"
                    value={uploadForm.documentName}
                    onChange={handleUploadChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <select
                    name="documentType"
                    value={uploadForm.documentType}
                    onChange={handleUploadChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="ID_PROOF">ID Proof</option>
                    <option value="HEALTH_CARD">Health Card</option>
                  </select>
                  <input
                    type="file"
                    name="file"
                    onChange={handleUploadChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  <MdUpload size={20} />
                  {uploading ? 'Uploading...' : 'Upload Document'}
                </button>
              </form>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">Uploaded Documents</h4>
              {documents.length === 0 ? (
                <p className="text-gray-500">No documents uploaded yet.</p>
              ) : (
                documents.map((doc) => (
                  <div key={doc.documentId} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <MdFilePresent size={24} className="text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-800">{doc.documentName}</p>
                        <p className="text-sm text-gray-500">{doc.documentType} • {doc.verificationStatus}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteDocument(doc.documentId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}