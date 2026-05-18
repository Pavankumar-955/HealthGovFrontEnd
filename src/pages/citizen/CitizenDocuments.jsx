import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdCloudUpload, MdVerified, MdPending, MdEdit, MdDelete, MdClose } from 'react-icons/md';
 
const DOCUMENT_TYPES = ['ID_PROOF', 'HEALTH_CARD', 'PASSPORT', 'BIRTH_CERTIFICATE'];
const emptyForm = { documentName: '', documentType: '', fileUrl: '' };
 
const CitizenDocuments = () => {
  const { user } = useAuth();
  const [citizenId, setCitizenId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
 
  useEffect(() => {
    if (!user?.userId) return;
    API.get(`/citizen/user/${user.userId}`)
      .then(res => setCitizenId(res.data.citizenId))
      .catch(() => {
        // fallback to localStorage
        const stored = localStorage.getItem(`citizenId_${user.userId}`);
        if (stored) setCitizenId(stored);
        else toast.error('Could not resolve citizen record');
      });
  }, [user]);
 
  useEffect(() => {
    if (!citizenId) return;
    fetchDocuments();
  }, [citizenId]);
 
  const fetchDocuments = async () => {
    try {
      const res = await API.get(`/document/${citizenId}`);
      setDocuments(res.data || []);
    } catch {
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };
 
  const openUpload = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (doc) => { setEditId(doc.documentId); setForm({ documentName: doc.documentName, documentType: doc.documentType, fileUrl: doc.fileUrl }); setShowForm(true); };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!citizenId) return toast.error('Citizen record not found');
    setSaving(true);
    try {
      if (editId) {
        await API.put(`/document/${citizenId}/${editId}`, form);
        toast.success('Document updated!');
      } else {
        await API.post(`/document/${citizenId}`, form);
        toast.success('Document uploaded!');
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
      await fetchDocuments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };
 
  const handleDelete = async (documentId) => {
    if (!window.confirm('Remove this document?')) return;
    setDeletingId(documentId);
    try {
      await API.delete(`/document/${citizenId}/${documentId}`);
      setDocuments(prev => prev.filter(d => d.documentId !== documentId));
      toast.success('Document removed');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };
 
  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
 
  const statusColor = (s) =>
    s === 'VERIFIED' ? 'bg-green-100 text-green-700' :
    s === 'REJECTED' ? 'bg-red-100 text-red-700' :
    'bg-amber-100 text-amber-700';
 
  if (loading) return <div className="p-10 text-center animate-pulse text-blue-600 font-bold">Loading Documents...</div>;
 
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
 
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-800">My Documents</h2>
            <p className="text-sm text-gray-500 mt-0.5">Manage your identity and medical proofs</p>
          </div>
          <button
            onClick={openUpload}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
          >
            <MdCloudUpload size={20} /> Upload New
          </button>
        </div>
 
        {/* Upload / Edit Form */}
        {showForm && (
          <div className="p-6 border-b bg-blue-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">{editId ? 'Edit Document' : 'Upload New Document'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><MdClose size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Document Name</label>
                <input
                  required minLength={2} maxLength={100}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={form.documentName} onChange={set('documentName')} placeholder="e.g. National ID"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Document Type</label>
                <select
                  required
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={form.documentType} onChange={set('documentType')}
                >
                  <option value="">Select Type</option>
                  {DOCUMENT_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">File URL</label>
                <input
                  required maxLength={500}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={form.fileUrl} onChange={set('fileUrl')} placeholder="https://..."
                />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit" disabled={saving}
                  className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editId ? 'Update' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        )}
 
        {/* Document List */}
        <div className="p-6">
          {documents.length === 0 ? (
            <div className="py-10 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
              <MdCloudUpload className="mx-auto text-4xl mb-2 text-gray-200" />
              <p className="font-medium text-sm">No documents uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <div key={doc.documentId} className="flex justify-between items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 text-sm">{doc.documentName}</p>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">{doc.documentType}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(doc.verificationStatus)}`}>
                      {doc.verificationStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.verificationStatus === 'VERIFIED'
                      ? <MdVerified className="text-green-500" size={20} />
                      : <MdPending className="text-amber-500" size={20} />}
                    <button onClick={() => openEdit(doc)} className="text-gray-400 hover:text-blue-600 transition" title="Edit">
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.documentId)}
                      disabled={deletingId === doc.documentId}
                      className="text-gray-400 hover:text-red-600 transition disabled:opacity-40"
                      title="Delete"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default CitizenDocuments;
 
 