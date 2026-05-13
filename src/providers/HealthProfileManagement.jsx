import { useState, useCallback } from 'react';
import API from '../api/axios'; // Updated path to fix Vite error
import toast from 'react-hot-toast';
import { 
  MdSearch, MdHistory, MdGppGood, MdBlock, 
  MdSave, MdAssignmentTurnedIn, MdHealthAndSafety,
  MdOutlineMedicalInformation, MdPersonSearch
} from 'react-icons/md';

const HealthProfileManagement = () => {
  const [searchId, setSearchId] = useState('');
  const [citizen, setCitizen] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [healthProfile, setHealthProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form State matching HealthProfileRequestDTO
  const [formData, setFormData] = useState({
    citizenId: '',
    allergies: '',
    medicalHistoryJson: {
      bloodGroup: '',
      chronicConditions: '',
      currentMedications: '',
      lastHospitalization: ''
    }
  });

  // 1. Search Logic: Pulls Citizen + Documents + Health Profile
  const handleSearch = async () => {
    if (!searchId) return toast.error("Please enter a Citizen ID");
    setLoading(true);
    setCitizen(null); // Reset previous view

    try {
      const [citizenRes, docsRes, healthRes] = await Promise.allSettled([
        API.get(`/citizen/${searchId}`),
        API.get(`/document/${searchId}`),
        API.get(`/health-profile/${searchId}`)
      ]);

      if (citizenRes.status === 'fulfilled') {
        setCitizen(citizenRes.value.data);
        
        // If Health Profile exists, map it. Otherwise, prepare new form.
        if (healthRes.status === 'fulfilled' && healthRes.value.data) {
          const hp = healthRes.value.data;
          setHealthProfile(hp);
          setFormData({
            citizenId: searchId,
            allergies: hp.allergies || '',
            medicalHistoryJson: hp.medicalHistoryJson || {
              bloodGroup: '', chronicConditions: '', currentMedications: '', lastHospitalization: ''
            }
          });
        } else {
          setHealthProfile(null);
          setFormData({
            citizenId: searchId,
            allergies: '',
            medicalHistoryJson: { bloodGroup: '', chronicConditions: '', currentMedications: '', lastHospitalization: '' }
          });
        }

        if (docsRes.status === 'fulfilled') {
          setDocuments(docsRes.value.data || []);
        }
      } else {
        toast.error("Citizen record not found in database.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred during search.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Create or Update Health Profile (POST /{citizenId})
  const handleSaveProfile = async () => {
    try {
      const res = await API.post(`/health-profile/${searchId}`, formData);
      setHealthProfile(res.data);
      toast.success("Medical History Saved. Profile status reset to INACTIVE.");
    } catch (err) {
      toast.error("Failed to save medical history.");
    }
  };

  // 3. Approve Health Profile (PUT /{citizenId}/approve)
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await API.put(`/health-profile/${searchId}/approve`, null, {
        params: { status: newStatus }
      });
      setHealthProfile(res.data);
      toast.success(`Health Profile marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update profile status.");
    }
  };

  // 4. Verify Citizen Documents (PUT /document/{id}/verify)
  const verifyDoc = async (docId, status) => {
    try {
      await API.put(`/document/${docId}/verify`, null, { params: { status } });
      toast.success(`Document ${status.toLowerCase()}!`);
      // Refresh only document list
      const res = await API.get(`/document/${searchId}`);
      setDocuments(res.data);
    } catch (err) {
      toast.error("Verification update failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* HEADER & SEARCH SECTION */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Verification Portal</label>
          <div className="relative">
            <MdPersonSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              className="w-full bg-slate-50 border-none p-4 pl-14 rounded-2xl outline-none focus:ring-2 ring-emerald-500 font-bold text-slate-700"
              placeholder="Enter Citizen ID to begin..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        <button 
          onClick={handleSearch} 
          disabled={loading}
          className="w-full md:w-auto bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          {loading ? 'Processing...' : 'Pull Records'}
        </button>
      </div>

      {citizen ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
          
          {/* LEFT: CITIZEN INFO & DOCUMENTS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Citizen Identity</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-xl border-2 border-white shadow-inner">
                  {citizen.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-slate-800 text-xl leading-none mb-1">{citizen.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Citizen ID: {citizen.citizenId}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-sm">
                "{citizen.address}"
              </div>
            </div>

            {/* Document Verification Checklist */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Document Verification</h3>
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <p className="text-center text-slate-300 py-6 text-xs italic">No documents uploaded</p>
                ) : documents.map(doc => (
                  <div key={doc.documentId} className="p-4 bg-slate-50 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                       <div>
                         <p className="font-black text-xs text-slate-700">{doc.documentName}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase">{doc.documentType}</p>
                       </div>
                       <span className={`text-[9px] font-black px-2 py-1 rounded ${doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {doc.verificationStatus}
                       </span>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => verifyDoc(doc.documentId, 'VERIFIED')} className="flex-1 bg-white text-emerald-600 p-2 rounded-xl text-[10px] font-black border border-slate-100 hover:shadow-sm transition-all">APPROVE</button>
                       <button onClick={() => verifyDoc(doc.documentId, 'REJECTED')} className="flex-1 bg-white text-red-600 p-2 rounded-xl text-[10px] font-black border border-slate-100 hover:shadow-sm transition-all">REJECT</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: MEDICAL HISTORY (JSON MAP) */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-900 px-10 py-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3 text-white">
                <MdHealthAndSafety className="text-emerald-400" size={24}/>
                <h3 className="font-bold tracking-tight">Electronic Health Record</h3>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => handleStatusChange('ACTIVE')} className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-600 transition-all">Approve Profile</button>
                 <button onClick={() => handleStatusChange('INACTIVE')} className="bg-slate-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-600 transition-all">Deactivate</button>
              </div>
            </div>

            <div className="p-10 space-y-8 flex-1">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Allergies *</label>
                <input 
                  className="w-full border-2 border-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 font-bold text-slate-700 bg-slate-50"
                  placeholder="Peanuts, Penicillin, etc..."
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blood Group</label>
                  <input 
                    className="w-full border-2 border-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 font-bold bg-slate-50"
                    value={formData.medicalHistoryJson.bloodGroup}
                    onChange={(e) => setFormData({...formData, medicalHistoryJson: {...formData.medicalHistoryJson, bloodGroup: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Checkup Date</label>
                  <input 
                    type="date"
                    className="w-full border-2 border-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 font-bold bg-slate-50"
                    value={formData.medicalHistoryJson.lastHospitalization}
                    onChange={(e) => setFormData({...formData, medicalHistoryJson: {...formData.medicalHistoryJson, lastHospitalization: e.target.value}})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chronic Medical Conditions</label>
                  <textarea 
                    className="w-full border-2 border-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 font-bold bg-slate-50"
                    rows="2"
                    placeholder="Describe any long-term illnesses..."
                    value={formData.medicalHistoryJson.chronicConditions}
                    onChange={(e) => setFormData({...formData, medicalHistoryJson: {...formData.medicalHistoryJson, chronicConditions: e.target.value}})}
                  />
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className={`p-4 rounded-2xl ${healthProfile?.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      <MdOutlineMedicalInformation size={24}/>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Status</p>
                     <p className="font-black text-slate-800 tracking-tight">{healthProfile?.status || 'UNINITIALIZED'}</p>
                   </div>
                </div>
                <button 
                  onClick={handleSaveProfile}
                  className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center gap-3"
                >
                  <MdSave size={20}/> Save Clinical Data
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-32 text-center space-y-4 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
           <MdPersonSearch className="mx-auto text-slate-200" size={80}/>
           <div className="max-w-xs mx-auto">
             <h3 className="text-xl font-black text-slate-800">No Citizen Selected</h3>
             <p className="text-slate-400 text-sm font-bold">Use the search bar above to pull health records and documents for verification.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default HealthProfileManagement;