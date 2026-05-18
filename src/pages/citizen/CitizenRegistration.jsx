import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdSave } from 'react-icons/md';
 
const CitizenRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', gender: '', address: '' });
 
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.gender || !formData.address) {
      return toast.error("All fields are required!");
    }
 
    try {
      setLoading(true);
      const payload = {
        ...formData,
        userId: user.userId,
        gender: formData.gender.toUpperCase(),
        contactInfo: user?.email
      };
      await API.post('/citizen/register', payload);
      toast.success("Profile Created!");
     
      // REDIRECT TO PROFILE VIEW
      navigate('/citizen/profile');
    } catch (err) {
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10 border border-emerald-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Complete Your Profile</h2>
          <button onClick={handleRegister} disabled={loading} className="bg-[#2563eb] text-white px-10 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg">
            <MdSave size={20} /> {loading ? "Saving..." : "Save"}
          </button>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <input className="w-full border-2 p-4 rounded-2xl focus:border-[#059669] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" />
          <input type="date" className="w-full border-2 p-4 rounded-2xl focus:border-[#059669] outline-none" onChange={e => setFormData({...formData, dob: e.target.value})} />
          <select className="w-full border-2 p-4 rounded-2xl outline-none" onChange={e => setFormData({...formData, gender: e.target.value})}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <input className="w-full bg-gray-50 border-2 p-4 rounded-2xl text-gray-400" value={user?.email} disabled />
          <textarea className="md:col-span-2 border-2 p-4 rounded-2xl outline-none" rows="3" onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Address" />
        </form>
      </div>
    </div>
  );
};
export default CitizenRegistration;
 