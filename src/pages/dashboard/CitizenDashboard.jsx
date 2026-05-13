import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { 
  MdCheckCircle, MdOutlineExplore, MdHealthAndSafety, 
  MdAddCircleOutline, MdInfoOutline 
} from 'react-icons/md';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [citizenId, setCitizenId] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("Fetching Citizen ID for User:", user?.userId);
        
        // CHECK 1: Ensure this endpoint exists on Port 9091
        // If your Citizen Service is on another port, this will fail.
        const citizenRes = await API.get(`/citizen/user/${user.userId}`);
        const cId = citizenRes.data.citizenId;
        
        console.log("Resolved Citizen ID:", cId);
        setCitizenId(cId);
        await refreshData(cId);
      } catch (err) {
        console.error("Dashboard Init Error:", err.response || err);
        toast.error("Citizen profile not found. Please complete registration.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.userId) init();
  }, [user]);

  const refreshData = async (cId) => {
    try {
      console.log("Fetching Programs and Enrollments...");
      const [progsRes, enrollRes] = await Promise.all([
        API.get('/api/programs/all'),
        API.get('/api/enrollments/all')
      ]);

      console.log("Programs Received:", progsRes.data);
      console.log("All Enrollments:", enrollRes.data);

      const allProgs = progsRes.data;
      const myEnrollments = enrollRes.data.filter(e => e.citizenId === cId);
      const myEnrolledIds = myEnrollments.map(e => e.programId);

      setAvailablePrograms(allProgs.filter(p => !myEnrolledIds.includes(p.id || p.programId)));
      
      setEnrolledPrograms(myEnrollments.map(enroll => ({
        ...enroll,
        name: allProgs.find(p => (p.id || p.programId) === enroll.programId)?.name || "Health Program"
      })));
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleEnroll = async (progId) => {
    try {
      const payload = {
        citizenId: citizenId,
        programId: progId,
        date: new Date().toISOString().split('T')[0],
        status: "ACTIVE"
      };

      console.log("Sending Enrollment Payload:", payload);
      await API.post('/api/enrollments/create', payload);
      
      toast.success("Enrolled successfully!");
      await refreshData(citizenId);
    } catch (err) {
      toast.error("Enrollment failed.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Dashboard Data...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800">Welcome, {user?.name}</h1>
        <p className="text-slate-400 font-bold">ID: #{citizenId}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Available Programs */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
            <MdOutlineExplore /> Available Programs
          </h2>
          {availablePrograms.map(prog => (
            <div key={prog.id || prog.programId} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm hover:border-emerald-500 transition-all">
              <div>
                <h3 className="font-bold text-slate-800">{prog.name}</h3>
                <p className="text-sm text-slate-500">{prog.description}</p>
              </div>
              <button 
                onClick={() => handleEnroll(prog.id || prog.programId)}
                className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all"
              >
                Enroll Now <MdAddCircleOutline />
              </button>
            </div>
          ))}
        </div>

        {/* Enrolled Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
            <MdCheckCircle className="text-emerald-500" /> My Registrations
          </h2>
          {enrolledPrograms.map(enroll => (
            <div key={enroll.enrollmentId} className="bg-emerald-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
               <MdHealthAndSafety className="absolute -right-4 -bottom-4 text-emerald-800 opacity-20" size={100} />
               <h3 className="font-bold relative z-10">{enroll.name}</h3>
               <p className="text-[10px] text-emerald-300 font-bold uppercase mt-1">Status: {enroll.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;