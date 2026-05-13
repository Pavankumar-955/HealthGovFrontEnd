import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import documentApi from '../../api/documentApi';

const DocVerification = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await documentApi.getAllDocuments();
      setDocuments(res.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
      toast.error(err.response?.data?.message || "Failed to load documents");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleStatusChange = async (docId, status) => {
    try {
      await documentApi.verifyDocument(docId, status);
      toast.success(`Document marked as ${status}`);
      fetchDocuments();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  // ✅ NEW FUNCTION: Handles opening the Base64 document
  const viewDocument = (fileUrl) => {
    if (!fileUrl) {
      toast.error("No file content found");
      return;
    }

    const newWindow = window.open();
    if (fileUrl.startsWith('data:image')) {
      // If it's an image, show it centered
      newWindow.document.write(
        `<body style="margin:0; display:flex; justify-content:center; align-items:center; background:#1a1a1a;">
          <img src="${fileUrl}" style="max-width:90%; box-shadow: 0 0 20px black;">
        </body>`
      );
    } else {
      // For PDFs or other files
      newWindow.location.href = fileUrl;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#011138] mb-8">Document Verification</h1>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-6 text-sm font-semibold text-slate-500 uppercase">Document Detail</th>
              <th className="p-6 text-sm font-semibold text-slate-500 uppercase">Status</th>
              <th className="p-6 text-sm font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest">Loading records...</td></tr>
            ) : documents.length === 0 ? (
              <tr><td colSpan="3" className="p-10 text-center text-slate-400">No documents found.</td></tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.documentId} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-slate-800">{doc.documentName}</div>
                    <div className="text-xs text-slate-400 uppercase font-bold">{doc.documentType}</div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-500 text-white' :
                      doc.verificationStatus === 'REJECTED' ? 'bg-red-500 text-white' : 'bg-amber-400 text-white'
                    }`}>
                      {doc.verificationStatus}
                    </span>
                  </td>
                  <td className="p-6 text-right space-x-4">
                    {/* ✅ UPDATED: Call viewDocument function */}
                    <button 
                      onClick={() => viewDocument(doc.fileUrl)} 
                      className="text-blue-600 hover:underline text-sm font-bold"
                    >
                      View
                    </button>

                    {doc.verificationStatus === 'PENDING' && (
                      <>
                        <button onClick={() => handleStatusChange(doc.documentId, 'VERIFIED')} className="text-emerald-600 hover:underline text-sm font-bold">Verify</button>
                        <button onClick={() => handleStatusChange(doc.documentId, 'REJECTED')} className="text-red-600 hover:underline text-sm font-bold">Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocVerification;