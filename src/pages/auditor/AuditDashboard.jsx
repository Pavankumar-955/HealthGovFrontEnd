import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import SummaryCards from "./SummaryCards.jsx";
import AuditFilter from "./AuditFilter.jsx";
import AuditModal from "./AuditModal.jsx";
import AuditsList from "./AuditsList.jsx";
import AuditForm from "./AuditForm.jsx";

import {
  getAllAudits,
  getAuditSummary,
  updateAudit,
  createAudit,
} from "../../api/auditsAPI.js";

import { getAllComplianceRecords } from "../../api/complianceAPI.js";

const AuditDashboard = () => {
  const [audits, setAudits] = useState([]);
  const [filteredAudits, setFilteredAudits] = useState([]);
  const [complianceRecords, setComplianceRecords] = useState([]);

  const [summary, setSummary] = useState({
    totalAudits: 0,
    byStatus: {},
  });

  const [loading, setLoading] = useState(true);   // ✅ NEW
  const [error, setError] = useState(null);       // ✅ NEW

  const [officerFilter, setOfficerFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [scopeFilter, setScopeFilter] = useState("ALL");

  const [selectedAudit, setSelectedAudit] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  /* ================= FETCH ALL ================= */

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);

      const [auditRes, summaryRes, complianceRes] = await Promise.all([
        getAllAudits(),
        getAuditSummary(),
        getAllComplianceRecords(),
      ]);

      setAudits(auditRes.data);
      setSummary(summaryRes.data);
      setComplianceRecords(complianceRes.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Server is down or unable to load data");
      toast.error("Server is not responding");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */

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

  /* ================= UNIQUE OFFICERS ================= */

  const officers = [
    ...new Map(audits.map((a) => [a.officer?.userId, a.officer])).values(),
  ];

  /* ================= ACTIONS ================= */

  const handleSelectAudit = (audit) => {
    setSelectedAudit(audit);
  };

  const handleCreateAudit = async (payload) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      await createAudit({
        ...payload,
        date: today,
      });

      toast.success("✅ Audit created successfully");

      await fetchAll();  // ✅ refresh all
      setIsCreateOpen(false);

    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to create audit");
    }
  };

  const handleUpdateStatus = async ({ findings, status }) => {
    try {
      await updateAudit(selectedAudit.auditId, {
        findings: findings || "",
        status,
        date: selectedAudit.date,
      });

      toast.success("✅ Audit updated successfully");

      await fetchAll();  // ✅ refresh all
      setSelectedAudit(null);

    } catch {
      toast.error("❌ Update failed");
    }
  };

  /* ================= UI STATES ================= */

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        ⏳ Loading audits...
      </div>
    );
  }

  // ✅ ERROR UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 text-lg font-semibold">
          {error}
        </p>

        <button
          onClick={fetchAll}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

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
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {/* ✅ CREATE FORM */}
      {isCreateOpen && (
        <AuditForm
          officers={officers}
          compliances={complianceRecords}
          onCreate={handleCreateAudit}
        />
      )}

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