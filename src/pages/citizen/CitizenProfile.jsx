import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdSave, MdCloudUpload, MdVerified, MdPending, MdLocalHospital, MdArrowForward } from 'react-icons/md';

const CitizenProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    Name: '',
    DOB: '',
    Gender: '',
    Address: '',
    ContactInfo: ''
  });

  useEffect(() => {
    if (user?.userId) {
      fetchProfileData();
      console.log("User data ", user)
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // UPDATED: Changed the document fetch URL to match your DocumentController (/document/{citizenId})
      const [citizenRes, docsRes] = await Promise.all([
        API.get(`/citizen/${user?.userId}`).catch(() => ({ data: null })),
        API.get(`/document/${user?.userId}`).catch(() => ({ data: [] }))
      ]);

      const dbData = citizenRes.data || {
        CitizenID: 'PENDING', // If 404, we mark as PENDING to know we need to POST later
        Name: user?.name || '',
        DOB: '',
        Gender: '',
        Address: '',
        ContactInfo: user?.email || '',
        Status: 'ACTIVE' 
      };

      setProfile(dbData);
      setDocuments(docsRes.data || []);
      
      setFormData({
        Name: dbData.Name || '',
        DOB: dbData.DOB || '',
        Gender: dbData.Gender || '',
        Address: dbData.Address || '',
        ContactInfo: dbData.ContactInfo || ''
      });
    } catch (error) {
      toast.error('Sync error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!user?.userId) {
        toast.error("User session not found. Please log in again.");
        return;
      }

      // UPDATED: Construct payload with uppercase gender to match backend Enum
      const payload = { 
        userId: user.userId, 
        name: formData.Name,
        dob: formData.DOB,
        gender: formData.Gender ? formData.Gender.toUpperCase() : "", 
        address: formData.Address,
        contactInfo: formData.ContactInfo
      };

      console.log("Sending payload to backend:", payload);

      // UPDATED: Route to POST or PUT depending on if the user exists yet
      if (profile?.CitizenID === 'PENDING') {
        // User does not exist in Citizen DB yet -> POST to register
        await API.post(`/citizen/register`, payload);
        toast.success('Citizen Profile registered successfully!');
      } else {
        // User already exists -> PUT to update
        await API.put(`/citizen/${user.userId}`, payload);
        toast.success('Information updated successfully!');
      }
      
      // Update local state so it stops saying PENDING
      setProfile(prev => ({ ...prev, ...payload, CitizenID: user.userId, Status: 'ACTIVE' }));
    } catch (error) {
      console.error("Save error details:", error.response?.data || error.message);
      toast.error('Save failed - Check backend connection');
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-blue-600 font-bold">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Citizen Profile</h2>
          <button 
            onClick={handleSave} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <MdSave size={20} /> Save Changes
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl border bg-green-50 border-green-200">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Status</span>
                <span className="font-black text-2xl text-green-600 uppercase">
                  {profile?.Status || 'ACTIVE'}
                </span>
             </div>
             <div className="bg-green-600 text-white p-2 rounded-full shadow-lg shadow-green-100">
               <MdVerified size={28} />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Full Name</label>
              <input 
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.Name} 
                onChange={e => setFormData({...formData, Name: e.target.value})} 
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Date of Birth</label>
              <input 
                type="date" 
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                value={formData.DOB} 
                onChange={e => setFormData({...formData, DOB: e.target.value})} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Gender Identification</label>
              <select 
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                value={formData.Gender} 
                onChange={e => setFormData({...formData, Gender: e.target.value})}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Contact Information</label>
              <input 
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                value={formData.ContactInfo} 
                onChange={e => setFormData({...formData, ContactInfo: e.target.value})} 
                placeholder="email@example.com"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Current Residential Address</label>
              <textarea 
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                rows="3"
                value={formData.Address} 
                onChange={e => setFormData({...formData, Address: e.target.value})} 
                placeholder="House No, Street, City, ZIP"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AVAILABLE PROGRAMS SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Available Health Programs</h2>
            <p className="text-sm text-gray-600 mt-1">Explore and enroll in health programs available to you</p>
          </div>
          <button
            onClick={() => navigate('/citizen/dashboard?view=all')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <MdLocalHospital size={20} />
            View All Programs
            <MdArrowForward size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/citizen/dashboard?view=all')}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <MdLocalHospital size={20} />
              </div>
              <MdArrowForward className="text-blue-600" size={16} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Health Programs</h3>
            <p className="text-sm text-gray-600">Browse available health initiatives and enroll</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all cursor-pointer"
               onClick={() => navigate('/citizen/dashboard')}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <MdVerified size={20} />
              </div>
              <MdArrowForward className="text-green-600" size={16} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">My Enrollments</h3>
            <p className="text-sm text-gray-600">View programs you're currently enrolled in</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-md transition-all cursor-pointer"
               onClick={() => navigate('/citizen/dashboard')}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-500 text-white p-2 rounded-lg">
                <MdPending size={20} />
              </div>
              <MdArrowForward className="text-purple-600" size={16} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Quick Enrollment</h3>
            <p className="text-sm text-gray-600">Enroll in programs with just one click</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Verified Documents</h2>
          <button className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold hover:bg-gray-200 transition-colors">
            <MdCloudUpload /> Upload New
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.length > 0 ? documents.map(doc => (
            <div key={doc.DocumentID || Math.random()} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <p className="font-bold text-gray-800 text-sm">{doc.DocType || 'Document'}</p>
                <p className="text-[10px] text-gray-400 font-mono uppercase">{doc.VerificationStatus || 'PENDING'}</p>
              </div>
              {doc.VerificationStatus === 'VERIFIED' ? <MdVerified className="text-green-500" /> : <MdPending className="text-amber-500" />}
            </div>
          )) : (
            <div className="md:col-span-2 text-center py-6 text-gray-400 italic text-sm bg-gray-50 rounded-xl border-2 border-dashed border-gray-100">
              No documents uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;