import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import healthApi from '../../api/healthApi';
import { MdSave, MdCheckCircle, MdCancel, MdBlock, MdPlayArrow } from 'react-icons/md';

const ProviderHealthRecords = () => {
  const [allProfiles, setAllProfiles] = useState([]);
  const [citizenId, setCitizenId] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalHistoryText, setMedicalHistoryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    setLoading(true);
    try {
      const data = {
        citizenId: parseInt(citizenId, 10),
        medicalHistoryJson: { history: medicalHistoryText }, 
        allergies,
      };
      await healthApi.saveOrUpdateHealthProfile(citizenId, data);
      toast.success('Health profile updated successfully');
      fetchAllProfiles();
    } catch (err) {
      toast.error('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  // ✅ New Function to handle Activate/Deactivate
  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      await healthApi.approveHealthProfile(citizenId, newStatus);
      toast.success(`Profile ${newStatus === 'ACTIVE' ? 'Activated' : 'Deactivated'} successfully`);
      fetchAllProfiles();
    } catch (err) {
      toast.error('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = allProfiles.filter(p => 
    p.citizenId?.toString().includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Health Records Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Citizen ID</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Allergies</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Medical History</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((record) => (
                <tr key={record.profileId} className="hover:bg-green-50/50 transition-colors group">
                  <td className="p-4 font-bold text-[#0f964a]">ID: #{record.citizenId}</td>
                  <td className="p-4 text-gray-700 font-medium">{record.allergies || 'None'}</td>
                  <td className="p-4 text-gray-500 text-sm truncate max-w-xs italic">
                    {record.medicalHistoryJson?.history || '—'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      record.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {record.status || 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleSelectRecord(record)} 
                      className="text-[#0f964a] font-bold hover:underline underline-offset-4 decoration-2"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-16 text-center text-gray-400 font-medium italic">
                  No health records found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {citizenId && (
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700"
        >
          <div className="flex justify-between items-center border-b border-gray-100 pb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Updating Health Profile: <span className="text-[#0f964a]">#{citizenId}</span>
            </h2>
            <button 
              type="button" 
              onClick={() => setCitizenId('')} 
              className="text-gray-300 hover:text-red-500 transition-all transform hover:rotate-90"
            >
              <MdCancel size={28} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Critical Allergies</label>
              <input 
                type="text" 
                value={allergies} 
                onChange={(e) => setAllergies(e.target.value)} 
                placeholder="e.g., Peanuts, Penicillin..."
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0f964a] transition-all font-semibold text-gray-700" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Detailed Medical History</label>
              <textarea 
                value={medicalHistoryText} 
                onChange={(e) => setMedicalHistoryText(e.target.value)} 
                placeholder="Enter surgeries, chronic conditions, or long-term medications..."
                rows={6} 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0f964a] transition-all text-gray-700 leading-relaxed" 
              />
            </div>
          </div>
          
          {/* ✅ Action Buttons Section */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#0f964a] hover:bg-[#0a7a3b] text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-3 disabled:opacity-50"
            >
              <MdSave size={22} />
              Save Info
            </button>

            {profile?.status !== 'ACTIVE' ? (
              <button 
                type="button"
                onClick={() => handleStatusUpdate('ACTIVE')}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <MdPlayArrow size={22} />
                Activate Profile
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => handleStatusUpdate('INACTIVE')}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <MdBlock size={22} />
                Deactivate Profile
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProviderHealthRecords;