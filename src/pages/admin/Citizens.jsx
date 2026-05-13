import { useState } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdSearch, MdClose, MdDelete } from 'react-icons/md';

const STATUS_COLORS = {
  PENDING:  'bg-amber-100 text-amber-700',
  ACTIVE:   'bg-green-100 text-green-700',
  VERIFIED: 'bg-blue-100 text-blue-700',
  INACTIVE: 'bg-gray-100 text-gray-500',
};

const Citizens = () => {
  const [searchId, setSearchId] = useState('');
  const [citizen, setCitizen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchById = async () => {
    if (!searchId.trim()) return toast.error('Enter a Citizen ID');
    setLoading(true);
    setCitizen(null);
    try {
      const res = await API.get(`/citizen/${searchId.trim()}`);
      setCitizen(res.data);
    } catch (err) {
      toast.error(err.response?.status === 404 ? `Citizen ID ${searchId} not found` : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (status) => {
    setApproving(true);
    try {
      const res = await API.put(`/citizen/${citizen.citizenId}/approve?status=${status}`);
      setCitizen(prev => ({ ...prev, status: res.data.status }));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Approval failed');
    } finally {
      setApproving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete Citizen ID ${citizen.citizenId}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await API.delete(`/citizen/${citizen.citizenId}`);
      toast.success('Citizen deleted successfully');
      setCitizen(null);
      setSearchId('');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Citizen Lookup</h1>
        <p className="text-sm text-gray-500 mt-0.5">Search, view, approve or delete a citizen by ID</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Citizen ID</label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="e.g. 1"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchById()}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchById}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <MdSearch size={20} /> {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Result Card */}
      {citizen && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Card Header */}
          <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{citizen.name || '—'}</h2>
              <p className="text-xs text-gray-400 mt-0.5">Citizen ID: {citizen.citizenId} · User ID: {citizen.userId}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[citizen.status] || 'bg-gray-100 text-gray-500'}`}>
                {citizen.status}
              </span>
              <button
                onClick={() => { setCitizen(null); setSearchId(''); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 grid grid-cols-2 gap-5">
            {[
              { label: 'Full Name',     value: citizen.name },
              { label: 'Gender',        value: citizen.gender },
              { label: 'Date of Birth', value: citizen.dob },
              { label: 'Contact',       value: citizen.contactInfo },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="font-semibold text-gray-800">{value || '—'}</p>
              </div>
            ))}

            <div className="col-span-2 space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Address</p>
              <p className="font-semibold text-gray-800">{citizen.address || '—'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-auto">Update Status:</p>
            {['ACTIVE', 'VERIFIED', 'INACTIVE', 'PENDING'].map(s => (
              <button
                key={s}
                onClick={() => handleApprove(s)}
                disabled={approving || citizen.status === s}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition disabled:opacity-40 ${
                  s === 'VERIFIED' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                  s === 'ACTIVE'   ? 'bg-green-600 text-white hover:bg-green-700' :
                  s === 'INACTIVE' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                                     'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
            >
              <MdDelete size={16} /> {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Citizens;
