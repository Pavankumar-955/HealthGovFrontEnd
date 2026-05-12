import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

import SummaryCards from './SummaryCards.jsx';
import AuditFilter from './AuditFilter.jsx';
import AuditModal from './AuditModal.jsx';
import AuditsList from './AuditsList.jsx';

import {
  getAllAudits,
  getAuditSummary,
  updateAudit   // ✅ USE THIS (important)
} from "../../api/auditsAPI.js";

const AuditDashboard = () => {

  const [audits, setAudits] = useState([]);
  const [filteredAudits, setFilteredAudits] = useState([]);

  const [officerFilter, setOfficerFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [scopeFilter, setScopeFilter] = useState("ALL");

  const [summary, setSummary] = useState({
    totalAudits: 0,
    byStatus: {}
  });

  const [selectedAudit, setSelectedAudit] = useState(null);

  // ✅ UNIQUE OFFICERS
  const officers = [...new Map(
    audits.map(a => [a.officer?.userId, a.officer])
  ).values()];

  // ✅ FETCH INITIAL DATA
  useEffect(() => {
    fetchAudits();
    fetchSummary();
  }, []);

  const fetchAudits = async () => {
    try {
      const res = await getAllAudits();
      setAudits(res.data);
    } catch (err) {
      toast.error("Failed to load audits");
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await getAuditSummary();
      setSummary(res.data);
    } catch {
      toast.error("Failed to load summary");
    }
  };

  // ✅ FILTER LOGIC
  useEffect(() => {

    const filtered = audits.filter((audit) => {
      const scopeType = audit.scope.split(":")[0];

      const matchesStatus =
        statusFilter === "ALL" || audit.status === statusFilter;

      const matchesScope =
        scopeFilter === "ALL" || scopeType === scopeFilter;

      const matchesOfficer =
        officerFilter === "ALL" ||
        audit.officer?.userId?.toString() === officerFilter;

      return matchesStatus && matchesScope && matchesOfficer;
    });

    setFilteredAudits(filtered);

  }, [audits, statusFilter, scopeFilter, officerFilter]);

  // ✅ SELECT AUDIT
  const handleSelectAudit = (audit) => {
    setSelectedAudit(audit);
  };

  // ✅ ✅ ✅ FINAL FIXED UPDATE FUNCTION
  const handleUpdateStatus = async ({ findings, status }) => {
    try {

      const payload = {
        findings: findings || "",
        status: status,
        date: selectedAudit.date   // ✅ REQUIRED (very important)
      };

      // ✅ SINGLE API CALL
      await updateAudit(selectedAudit.auditId, payload);

      toast.success("✅ Audit updated successfully");

      // ✅ refresh UI
      await fetchAudits();
      await fetchSummary();

      setSelectedAudit(null);

    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* ✅ SUMMARY */}
      <SummaryCards summary={summary} />

      {/* ✅ FILTER */}
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

      {/* ✅ LIST */}
      <AuditsList
        audits={filteredAudits}
        handleSelectAudit={handleSelectAudit}
      />

      {/* ✅ MODAL */}
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