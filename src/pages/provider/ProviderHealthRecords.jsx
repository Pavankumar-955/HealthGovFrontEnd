import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import healthApi from '../../api/healthApi';
import { MdSave, MdCheckCircle, MdCancel, MdBlock, MdPlayArrow, MdSearch } from 'react-icons/md';

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
      // Ensure we set an empty array if the database is cleared
      setAllProfiles(res.data || []);
    } catch (err) {
      toast.error('Unable to load health records.');
      setAllProfiles([]);
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
    
    // Logic to extract editable text from either a new Array structure or old String structure
    if (Array.isArray(historyObj.history)) {
      setMedicalHistoryText(historyObj.history[0]?.Notes || "");
    } else {
      setMedicalHistoryText(historyObj.history || ""); 
    }
    
    // Smooth scroll to the form for better UX
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!citizenId) return;

    setLoading(true);
    try {
      const data = {
        citizenId: parseInt(citizenId, 10),
        // Packages as a structured array so CitizenDashboard.map() works
        medicalHistoryJson: { 
          history: [
            {
              Condition: "Provider Update",
              Notes: medicalHistoryText,
              Date: new Date().toISOString().split('T')[0],
              Provider: "HealthGov Authorized Provider"
            }
          ] 
        }, 
        allergies,
      };
      await healthApi.saveOrUpdateHealthProfile(citizenId, data);
      toast.success('Health profile updated successfully');
      fetchAllProfiles();
      setCitizenId(''); // Clear selection after save
    } catch (err) {
      toast.error('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      await healthApi.approveHealthProfile(citizenId, newStatus);
      toast.success(`Profile ${newStatus === 'ACTIVE' ? 'Activated' : 'Deactivated'}`);
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
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Health Records Management</h1>
        <div className="relative w-full md:w-80">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search Citizen ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">Citizen ID</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">Allergies</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">History Preview</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500">Status</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((record) => (
                <tr key={record.profileId} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-green-700">#{record.citizenId}</td>
                  <td className="p-4 text-gray-700">{record.allergies || 'None'}</td>
                  
                  {/* PREVENT OBJECT CHILD ERROR */}
                  <td className="p-4 text-gray-500 text-sm truncate max-w-xs italic">
                    {(() => {
                      const h = record.medicalHistoryJson?.history;
                      if (Array.isArray(h)) return h[0]?.Notes || 'Structured Data';
                      if (typeof h === 'object') return 'Complex Data';
                      return h || '—';
                    })()}
                  </td>
                  
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      record.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {record.status || 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleSelectRecord(record)} className="text-green-600 font-bold hover:underline">
                      Select
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-16 text-center text-gray-400 italic">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT FORM SECTION */}
      {citizenId && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Edit Profile: <span className="text-green-600">#{citizenId}</span></h2>
            <button type="button" onClick={() => setCitizenId('')} className="text-gray-400 hover:text-red-500"><MdCancel size={24} /></button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Critical Allergies</label>
              <input 
                type="text" 
                value={allergies} 
                onChange={(e) => setAllergies(e.target.value)} 
                className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Medical History Notes</label>
              <textarea 
                value={medicalHistoryText} 
                onChange={(e) => setMedicalHistoryText(e.target.value)} 
                rows={5} 
                className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition">
              <MdSave size={20} /> Save Changes
            </button>

            {profile?.status !== 'ACTIVE' ? (
              <button type="button" onClick={() => handleStatusUpdate('ACTIVE')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
                <MdPlayArrow size={20} /> Activate
              </button>
            ) : (
              <button type="button" onClick={() => handleStatusUpdate('INACTIVE')} className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition">
                <MdBlock size={20} /> Deactivate
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProviderHealthRecords;