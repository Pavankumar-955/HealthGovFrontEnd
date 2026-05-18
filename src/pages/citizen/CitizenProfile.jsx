import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import axios from 'axios';
import API from '../../api/axios'; 
import toast from 'react-hot-toast';
import { 
  MdSave, 
  MdCheckCircle, 
  MdEdit, 
  MdCancel, 
  MdUpload, 
  MdDelete, 
  MdFilePresent,
  MdCloudUpload,
  MdVerified,
  MdPending
} from 'react-icons/md';// Fixed dynamic structural imports

const CitizenProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Base State Configurations
  const [citizenId, setCitizenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('PENDING'); 
  const [isEditing, setIsEditing] = useState(false);
  const [genderLocked, setGenderLocked] = useState(false);
  const [originalData, setOriginalData] = useState({ gender: '' });

  // Document Management States (FIXED: Declared Missing Variables)
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    documentName: '',
    documentType: '',
    file: null
  });

  // Profile Form States
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    contactInfo: '',
    address: ''
  });

  // Dynamic Date Validation Calculations
  const today = new Date();
  const maxDateStr = today.toISOString().split('T')[0]; 
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 170); 
  const minDateStr = minDate.toISOString().split('T')[0];

  // Simple Inline Date Formatting Utility (FIXED: Prevents crash if missing)
  const formatBackendDate = (rawDate) => {
    if (!rawDate) return '';
    return rawDate.split('T')[0]; 
  };

  // 1. Fetch Citizen Profile Core Meta Data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.userId) return;
      try {
        setLoading(true);
        const response = await API.get(`/citizen/user/${user.userId}`);
        const data = response.data;
        
        setCitizenId(data.citizenId);
        setStatus(data.status);
        
        const formattedDob = formatBackendDate(data.dob);
        setForm({
          name: data.name || '',
          dob: formattedDob, 
          gender: data.gender || '',
          contactInfo: data.contactInfo || user.email || '', 
          address: data.address || ''
        });
        
        setOriginalData({ gender: data.gender || '' });
        setGenderLocked(!!data.gender);
        setIsEditing(!data.name);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast("Please complete profile setup.", { icon: 'ℹ️' });
          navigate('/citizen/register');
        } else {
          toast.error("Error loading profile.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [user, navigate]); 

  // 2. Fetch Vault Documents (FIXED: Renamed method to prevent duplicate identifier collisions)
  const fetchVaultDocuments = async () => {
    if (!citizenId) return;
    try {
      const response = await API.get(`/document/${citizenId}`);
      setDocuments(response.data || []);
    } catch (error) {
      toast.error('Failed to load documents.');
    }
  };

  useEffect(() => {
    if (citizenId) {
      fetchVaultDocuments();
    }
  }, [citizenId]);

  // Profile Form Inputs Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'gender' && genderLocked) {
      toast.error("Gender cannot be modified.");
      return;
    }
    setForm({ ...form, [name]: value });
  };

  // Update Profile Put Transaction
  const handleSave = async () => {
    if (!citizenId) return;
    if (form.dob && new Date(form.dob) > new Date()) {
      toast.error('Date of birth cannot be in the future.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        userId: user.userId,
        name: form.name,
        contactInfo: form.contactInfo,
        address: form.address,
        dob: form.dob, 
        gender: genderLocked ? originalData.gender : form.gender, 
      };
      await API.put(`/citizen/${citizenId}`, payload);
      toast.success("Profile updated!");
      setGenderLocked(true);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Upload Input Field Change Handler
  const handleUploadChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setUploadForm({ ...uploadForm, file: files[0] });
    } else {
      setUploadForm({ ...uploadForm, [name]: value });
    }
  };

  // Multipart Form Data File Upload Execution
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!citizenId || !uploadForm.file) return toast.error('Please select a file.');
    setUploading(true);
    
    const dataPayload = new FormData();
    dataPayload.append('documentName', uploadForm.documentName);
    dataPayload.append('documentType', uploadForm.documentType.trim().toUpperCase());
    dataPayload.append('file', uploadForm.file);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API.defaults.baseURL}/document/${citizenId}`, dataPayload, {
        headers: { 
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'multipart/form-data'
        },
      });
      toast.success('Document uploaded!');
      setUploadForm({ documentName: '', documentType: '', file: null });
      fetchVaultDocuments();
    } catch (error) {
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // Delete Document Handler
  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await API.delete(`/document/${citizenId}/${id}`);
      toast.success('Deleted!');
      fetchVaultDocuments();
    } catch (error) {
      toast.error('Delete failed.');
    }
  };

  const getInputStyle = (isLockedField) => 
    `w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors ${
      isLockedField ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'
    }`;

  if (loading) {
    return <div className="flex justify-center p-20 text-blue-600 font-bold tracking-widest">LOADING PROFILE...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* PROFILE HEADER */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Citizen Profile</h2>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2"><MdCancel /> Cancel</button>
                <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-70">
                  <MdSave /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2"><MdEdit /> Edit Profile</button>
            )}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* STATUS */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Status</p>
              <h3 className={`text-2xl font-black uppercase ${status === 'ACTIVE' ? 'text-green-600' : 'text-amber-500'}`}>{status}</h3>
            </div>
            <MdCheckCircle size={32} className="text-green-500" />
          </div>

          {/* FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} disabled={!isEditing} className={getInputStyle(!isEditing)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} disabled={!isEditing} max={maxDateStr} min={minDateStr} className={getInputStyle(!isEditing)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} disabled={!isEditing || genderLocked} className={getInputStyle(!isEditing || genderLocked)}>
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Info</label>
              <input type="text" name="contactInfo" value={form.contactInfo} onChange={handleChange} disabled={!isEditing} className={getInputStyle(!isEditing)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Residential Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} disabled={!isEditing} rows="3" className={getInputStyle(!isEditing)} />
            </div>
          </div>

          {/* DOCUMENTS SECTION */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">My Documents</h3>
            
            {/* Upload Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Upload New Document</h4>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" name="documentName" placeholder="Document Name (e.g. Passport)" value={uploadForm.documentName} onChange={handleUploadChange} className="w-full border border-gray-300 rounded-lg p-3 bg-white" required />
                  <select name="documentType" value={uploadForm.documentType} onChange={handleUploadChange} className="w-full border border-gray-300 rounded-lg p-3 bg-white" required>
                    <option value="">Select Type</option>
                    <option value="ID_PROOF">ID Proof</option>
                    <option value="HEALTH_CARD">Health Card</option>
                  </select>
                  <input type="file" name="file" onChange={handleUploadChange} className="w-full border border-gray-300 rounded-lg p-3 bg-white" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
                <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"><MdUpload /> {uploading ? 'Uploading...' : 'Upload Now'}</button>
              </form>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Verified Vault</h4>
              {documents.length === 0 ? (
                <p className="text-gray-400 italic">No documents found in your records.</p>
              ) : (
                documents.map((doc) => (
                  <div key={doc.documentId} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><MdFilePresent size={24} /></div>
                      <div>
                        <p className="font-bold text-gray-800">{doc.documentName}</p>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-tight">{doc.documentType} • <span className={doc.verificationStatus === 'APPROVED' ? 'text-green-600' : 'text-amber-500'}>{doc.verificationStatus}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {doc.fileUrl && <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-sm hover:underline">View</a>}
                      <button onClick={() => handleDeleteDocument(doc.documentId)} className="text-red-400 hover:text-red-600 transition-colors"><MdDelete size={22} /></button>
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
};

export default CitizenProfile;