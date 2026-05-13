import { useEffect, useState } from 'react';
import { getAllComplianceRecords } from '../../api/complianceAPI.js';
import ComplianceList from './ComplianceList';

const ComplianceRecords = () => {
  const [complianceRecords, setComplianceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const res = await getAllComplianceRecords();
        setComplianceRecords(res.data);
      } catch (err) {
        console.error('Failed to load compliance records', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">All Compliance Records</h2>
        <p className="mt-1 text-sm text-slate-600">Browse every compliance record in the system.</p>
      </div>
      {loading ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-slate-600 shadow-sm">
          Loading records...
        </div>
      ) : (
        <ComplianceList
          complianceRecords={complianceRecords}
          handleSelectRecord={() => null}
        />
      )}
    </div>
  );
};

export default ComplianceRecords;
