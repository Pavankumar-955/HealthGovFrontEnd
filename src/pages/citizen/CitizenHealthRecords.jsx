import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { MdHealthAndSafety, MdWarning, MdInfo } from 'react-icons/md';

const CitizenHealthRecords = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await API.get(`/citizens/${user?.userId}/health-profile`);
        const data = res.data;
        const history = typeof data.MedicalHistoryJSON === 'string' 
          ? JSON.parse(data.MedicalHistoryJSON) 
          : data.MedicalHistoryJSON;
        
        setHealthData({ ...data, history: history || [] });
      } catch (err) {
        // Fallback dummy data if API fails
        setHealthData({
          Allergies: "None Reported",
          Status: "ACTIVE",
          history: []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHealth();
  }, [user]);

  if (loading) return <div className="p-10 text-center animate-pulse">Loading Health Profile...</div>;

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
          <div className="flex items-center gap-2 text-red-600 mb-2 font-bold uppercase text-xs">
            <MdWarning /> Allergies & Risks
          </div>
          <p className="text-gray-700 font-medium">{healthData?.Allergies}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <p className="text-xs font-bold text-gray-400 uppercase">Health Status</p>
          <p className="text-xl font-black text-green-600 uppercase">{healthData?.Status}</p>
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MdHealthAndSafety className="text-blue-600" /> Medical History
        </h2>
        {healthData?.history.length > 0 ? (
          healthData.history.map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{item.Condition || item.type}</h3>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">{item.Date || item.date}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Provider: {item.Provider || item.doctor}</p>
              <p className="mt-3 text-gray-700 text-sm">{item.Notes || item.description}</p>
            </div>
          ))
        ) : (
          <div className="bg-white p-10 rounded-2xl text-center text-gray-400 border-2 border-dashed border-gray-100">
            <MdInfo className="mx-auto text-3xl mb-2 text-gray-200" />
            <p className="font-medium">No medical history entries found.</p>
            <p className="text-xs">Your records will appear here once verified by a doctor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenHealthRecords;