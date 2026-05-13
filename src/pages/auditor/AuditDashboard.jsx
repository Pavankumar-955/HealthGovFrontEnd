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
  createAudit,              // ✅ IMPORTANT
} from "../../api/auditsAPI.js";

import { getAllComplianceRecords } from "../../api/complianceAPI.js";

const AuditDashboard = () => {
  const [audits, setAudits] = useState([]);
  const [filteredAudits, setFilteredAudits] = useState([]);

  const [officerFilter, setOfficerFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [scopeFilter, setScopeFilter] = useState("ALL");

  const [complianceRecords, setComplianceRecords] = useState([]);

  const [summary, setSummary] = useState({
    totalAudits: 0,
    byStatus: {},
  });

  const [selectedAudit, setSelectedAudit] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // ✅ UNIQUE OFFICERS
  const officers = [
    ...new Map(audits.map((a) => [a.officer?.userId, a.officer])).values(),
  ];

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchAudits();
    fetchSummary();
    fetchComplianceRecords();
  }, []);

  const fetchAudits = async () => {
    try {
      const res = await getAllAudits();
      setAudits(res.data);
    } catch {
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

  const fetchComplianceRecords = async () => {
    try {
      const res = await getAllComplianceRecords();
      console.log("Compliance records ",res.data);
      
      setComplianceRecords(res.data);
    } catch {
      toast.error("Failed to load compliance records");
    }
  };

  /* ================= FILTER LOGIC ================= */

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

  /* ================= ACTIONS ================= */

  const handleSelectAudit = (audit) => {
    setSelectedAudit(audit);
  };

  const handleCreateAudit = async (payload) => {
    try {
      console.log("Creating audit with payload:", payload);
      const today = new Date().toISOString().split("T")[0];

      await createAudit({
        ...payload,
        date: today, // ✅ required by backend
      });

      toast.success(" Audit created successfully");

      await fetchAudits();
      await fetchSummary();

      setIsCreateOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(" Failed to create audit");
    }
  };

  const handleUpdateStatus = async ({ findings, status }) => {
    try {
      await updateAudit(selectedAudit.auditId, {
        findings: findings || "",
        status,
        date: selectedAudit.date, // ✅ required
      });

      toast.success("✅ Audit updated successfully");

      await fetchAudits();
      await fetchSummary();

      setSelectedAudit(null);
    } catch {
      toast.error("❌ Update failed");
    }
  };

  /* ================= RENDER ================= */

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
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {isCreateOpen && (
        <AuditForm
          officers={officers}
          compliances={complianceRecords}
          onCreate={handleCreateAudit}
        />
      )}

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