import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import healthApi from '../../api/healthApi';
import { MdHealthAndSafety, MdWarning, MdInfo, MdVerifiedUser } from 'react-icons/md';
 
const CitizenHealthRecords = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolvedCitizenId, setResolvedCitizenId] = useState(null);
 
  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        setLoading(true);
        const storageKey = `citizenId_${user.userId}`;
        const storedCitizenId = localStorage.getItem(storageKey);
        const tokenCitizenId = user?.citizenId;

        let cId = tokenCitizenId || storedCitizenId;
        if (!cId) {
          const citizenRes = await API.get(`/citizen/user/${user.userId}`);
          cId = citizenRes.data.citizenId;
          if (cId) {
            localStorage.setItem(storageKey, cId);
          }
        }

        if (!cId) {
          throw new Error('Unable to resolve citizen ID');
        }

        setResolvedCitizenId(cId);
 
        // Fetch Health Profile
        const res = await healthApi.getHealthProfile(cId);
        const data = res.data;
        setHealthData({
          allergies: data.allergies,
          status: data.status,
          medicalHistory: data.medicalHistoryJson || {}
        });
      } catch (err) {
        console.error("Health Profile Fetch Error:", err);
        setHealthData({
          allergies: "None Reported",
          status: "NO PROFILE",
          medicalHistory: {}
        });
      } finally {
        setLoading(false);
      }
    };
 
    if (user?.userId) fetchFullProfile();
  }, [user]);
 
  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );
 
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
     
      {/* SIMPLIFIED HEADER */}
      <div className="bg-[#f0fdf4] border border-emerald-100 p-6 rounded-3xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-5">
          <div className="bg-[#10b981] p-3 rounded-2xl text-white shadow-lg shadow-emerald-100">
            <MdVerifiedUser size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-emerald-900 leading-none">Health Profile</h1>
          </div>
        </div>
       
        <div className={`px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm ${
          healthData?.status === 'ACTIVE'
            ? 'bg-[#10b981] text-white'
            : 'bg-slate-200 text-slate-500'
        }`}>
          {healthData?.status}
        </div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Allergies Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 transition-all hover:shadow-md">
          <div className="flex items-center gap-2 text-red-500 mb-6 font-black uppercase text-[11px] tracking-[0.2em]">
            <MdWarning className="text-lg" /> Critical Allergies
          </div>
          <p className="text-slate-800 font-black text-3xl leading-tight">
            {healthData?.allergies || "None Reported"}
          </p>
        </div>
 
        {/* History Section */}
        <div className="md:col-span-2 space-y-5">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 ml-2 mb-2">
            <MdHealthAndSafety className="text-emerald-500 text-2xl" />
            Medical History Log
          </h2>
 
          {Object.keys(healthData?.medicalHistory || {}).length > 0 ? (
            Object.entries(healthData.medicalHistory).map(([key, value], i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all group">
                <div className="mb-2">
                  <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em] group-hover:text-emerald-600 transition-colors">
                    {key}
                  </h3>
                </div>
                <p className="text-slate-700 font-bold text-lg">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-slate-50 p-16 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
              <MdInfo className="mx-auto text-5xl mb-4 text-slate-300" />
              <p className="text-slate-500 font-bold text-lg tracking-tight">No records found.</p>
              <p className="text-xs text-slate-400 mt-2">Data will appear once updated by your health provider.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default CitizenHealthRecords;
 