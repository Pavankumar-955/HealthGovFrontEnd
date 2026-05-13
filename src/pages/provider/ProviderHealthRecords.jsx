import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import healthApi from '../../api/healthApi';
import { MdSave, MdCheckCircle, MdCancel } from 'react-icons/md';

const ProviderHealthRecords = () => {
  const [allProfiles, setAllProfiles] = useState([]);
  const [citizenId, setCitizenId] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalHistoryText, setMedicalHistoryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchAllProfiles = async () => {
    setLoading(true);
    try {
      const res = await healthApi.getAllHealthProfiles();
      setAllProfiles(res.data || []);
    } catch (err) {
      toast.error('Unable to load health records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const handleSelectRecord = (record) => {
    setCitizenId(record.citizenId?.toString() || '');
    setProfile(record);
    setAllergies(record.allergies || '');
    const historyObj = record.medicalHistoryJson || {};
    setMedicalHistoryText(historyObj.history || ""); 
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!citizenId || !allergies) {
      toast.error('Please fill all required fields');
      return;
    }

    const data = {
      citizenId: parseInt(citizenId, 10),
      medicalHistoryJson: { history: medicalHistoryText }, 
      allergies,
    };

    setLoading(true);
    try {
      await healthApi.saveOrUpdateHealthProfile(citizenId, data);
      toast.success('Health profile updated successfully');
      await fetchAllProfiles();
    } catch (err) {
      toast.error('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (status) => {
    if (!profile) return;
    setLoading(true);
    try {
      const res = await healthApi.approveHealthProfile(citizenId, status);
      setProfile(res.data);
      toast.success(`Profile status: ${status}`);
      await fetchAllProfiles();
    } catch (err) {
      toast.error('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* ✅ Search input removed from here */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Health Records Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">Allergies</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">Medical History</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">Status</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allProfiles.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-400">No records found.</td></tr>
            ) : (
              allProfiles.map((record) => (
                <tr key={record.profileId} className="hover:bg-green-50 transition-colors">
                  <td className="p-4 text-gray-700 font-medium">{record.allergies || 'None'}</td>
                  <td className="p-4 text-gray-600 text-sm truncate max-w-xs">
                    {record.medicalHistoryJson?.history || '—'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      record.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {record.status || 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleSelectRecord(record)} className="text-[#0f964a] font-bold hover:underline">Select</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {citizenId && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-lg border space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Editing Health Profile</h2>
            <button type="button" onClick={() => setCitizenId('')} className="text-gray-400 hover:text-red-500 transition-colors"><MdCancel size={24} /></button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2">Critical Allergies</label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#0f964a] font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2">Medical History Notes</label>
              <textarea
                value={medicalHistoryText}
                onChange={(e) => setMedicalHistoryText(e.target.value)}
                placeholder="Enter patient history here..."
                rows={6}
                className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#0f964a] text-gray-700 leading-relaxed"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button type="submit" disabled={loading} className="bg-[#0f964a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0a7a3b] transition-all flex items-center gap-2">
              <MdSave size={20} /> Save Changes
            </button>
            
            {profile && (
              <>
                <button type="button" onClick={() => handleApprove('ACTIVE')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2">
                  <MdCheckCircle size={20} /> Approve
                </button>
                <button type="button" onClick={() => handleApprove('INACTIVE')} className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600">
                  Deactivate
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProviderHealthRecords;