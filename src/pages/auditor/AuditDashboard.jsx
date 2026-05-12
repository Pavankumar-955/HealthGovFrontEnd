import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

import SummaryCards from './SummaryCards.jsx';
import AuditFilter from './AuditFilter.jsx';
import AuditModal from './AuditModal.jsx';
import AuditsList from './AuditsList.jsx';

import {
  getAllAudits,
  getAuditSummary,
  updateAuditStatus
} from "../../api/auditsAPI.js";

const AuditDashboard = () => {

  const [audits, setAudits] = useState([]);
  const [officerFilter, setOfficerFilter] = useState("ALL");
  const [filteredAudits, setFilteredAudits] = useState([]);

  const [summary, setSummary] = useState({
    totalAudits: 0,
    byStatus: {},
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [scopeFilter, setScopeFilter] = useState('ALL');

  const [selectedAudit, setSelectedAudit] = useState(null);

  const officers = [...new Map(
  audits.map(a => [a.officer.userId, a.officer])
).values()];
  // ✅ FETCH
  useEffect(() => {
    fetchAudits();
    fetchSummary();
  }, []);

  const fetchAudits = async () => {
    const res = await getAllAudits();
    setAudits(res.data);
  };

  const fetchSummary = async () => {
    const res = await getAuditSummary();
    setSummary(res.data);
  };

  // ✅ FILTER
 useEffect(() => {

  const filtered = audits.filter((audit) => {
    const scopeType = audit.scope.split(":")[0];

    const matchesStatus =
      statusFilter === "ALL" || audit.status === statusFilter;

    const matchesScope =
      scopeFilter === "ALL" || scopeType === scopeFilter;

    const matchesOfficer =
      officerFilter === "ALL" ||
      audit.officer?.userId.toString() === officerFilter;

    return matchesStatus && matchesScope && matchesOfficer;
  });

  setFilteredAudits(filtered);

}, [statusFilter, scopeFilter, officerFilter, audits]);

  // ✅ VIEW
  const handleSelectAudit = (audit) => {
    setSelectedAudit(audit);
  };

  // ✅ UPDATE (FIXED ✅)
  const handleUpdateStatus = async ({ findings, status }) => {
    try {
      await updateAuditStatus(selectedAudit.auditId, status);

      toast.success("Audit updated successfully");

      await fetchAudits();
      await fetchSummary();

      setSelectedAudit(null);

    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">

      <SummaryCards summary={summary} />

      <AuditFilter
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  scopeFilter={scopeFilter}
  setScopeFilter={setScopeFilter}
  officerFilter={officerFilter}
  setOfficerFilter={setOfficerFilter}
  officers={officers}
  onClear={() => {
    setStatusFilter("ALL");
    setScopeFilter("ALL");
    setOfficerFilter("ALL");
  }}
/>

      <AuditsList
        audits={filteredAudits}
        handleSelectAudit={handleSelectAudit}
      />

      {selectedAudit && (
        <AuditModal
          audit={selectedAudit}
          onClose={() => setSelectedAudit(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

    </div>
  );
};

export default AuditDashboard;