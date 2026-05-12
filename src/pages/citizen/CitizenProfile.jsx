import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW IMPORT
import { useAuth } from '../../context/AuthContext'; 
import API from '../../api/axios'; 
import toast from 'react-hot-toast';
import { MdSave, MdCheckCircle, MdEdit, MdCancel } from 'react-icons/md';

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
        </div>
      </div>
    </div>
  );
}