import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';

const CitizenSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    dob: '',
    gender: '',
    address: '',
    contactInfo: user?.email || ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.userId) {
      toast.error('User context missing. Please try logging in again.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/citizen/register', {
        userId: user.userId,
        name: form.name,
        dob: form.dob,
        gender: form.gender.toUpperCase(),
        address: form.address,
        contactInfo: form.contactInfo
      });

      const newCitizenId = res.data.citizenId;
      await API.put(`/citizen/${newCitizenId}/approve?status=ACTIVE`);
      localStorage.setItem(`citizenId_${user.userId}`, newCitizenId);

      toast.success('Profile created successfully!');
      navigate('/citizen/profile');
    } catch (err) {
      console.error('Setup Error:', err);
      toast.error(err.response?.data?.message || 'Registration failed. Check backend logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">Welcome, {user?.name || user?.email || 'Citizen'}!</h2>
          <p className="text-gray-500 text-sm mt-1">Complete your HealthGov citizen profile</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                required
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={form.dob}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Gender</label>
              <select
                name="gender"
                required
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Address</label>
              <textarea
                name="address"
                required
                rows="3"
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={form.address}
                onChange={handleChange}
                placeholder="House No, Street, City, ZIP"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Contact Info</label>
              <input
                type="text"
                name="contactInfo"
                required
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={form.contactInfo}
                onChange={handleChange}
                placeholder="Email or phone"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-60 mt-2"
            >
              {loading ? 'Saving...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CitizenSetup;
