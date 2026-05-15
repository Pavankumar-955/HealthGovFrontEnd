import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import ComplianceList from "./ComplianceList.jsx";
import SummaryCards from "./SummaryCards.jsx";
import ComplianceFilter from "./ComplianceFilter.jsx";
import ComplianceCardModal from "./ComplianceModal.jsx";

import {
  getComplianceSummary,
  getAllComplianceRecords,
  officerUpdateCompliance,
} from "../../api/complianceAPI.js";

import { useAuth } from "../../context/AuthContext.jsx";

const ComplianceDashboard = () => {
  const { user } = useAuth();

  const [complianceRecords, setComplianceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [summary, setSummary] = useState({
    totalRecords: 0,
    byResult: {},
    byType: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ NEW

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null); // reset error

      const [recordsRes, summaryRes] = await Promise.all([
        getAllComplianceRecords(),
        getComplianceSummary(),
      ]);

      setComplianceRecords(recordsRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error("Server error:", err);
      setError("⚠️ Server is down or unable to load data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = complianceRecords.filter((record) => {
      const matchesSearch =
        term === "" ||
        record.complianceId.toString().includes(term) ||
        record.type.toLowerCase().includes(term) ||
        record.result.toLowerCase().includes(term) ||
        record.entity?.title?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "ALL" || record.result === statusFilter;

      const matchesType =
        typeFilter === "ALL" || record.type === typeFilter;

      const recordDate = new Date(record.date + "T00:00:00");
      const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
      const to = dateTo ? new Date(dateTo + "T23:59:59") : null;

      const matchesDate =
        (!from || recordDate >= from) &&
        (!to || recordDate <= to);

      return (
        matchesSearch && matchesStatus && matchesType && matchesDate
      );
    });

    setFilteredRecords(filtered);
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    dateFrom,
    dateTo,
    complianceRecords,
  ]);

  /* ================= ACTION ================= */

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleSaveCompliance = async (editData, record) => {
    try {
      await officerUpdateCompliance(record.type, record.entityId, {
        result: editData.result,
        notes: editData.notes,
        officerId: user?.userId,
      });

      toast.success("✅ Compliance updated successfully");

      fetchAll();
      setSelectedRecord(null);
    } catch {
      toast.error("❌ Failed to update compliance");
    }
  };

  /* ================= UI STATES ================= */

  // ✅ LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        ⏳ Loading compliance records...
      </div>
    );
  }

  // ✅ ERROR (SERVER DOWN)
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
      <ComplianceFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        onClear={() => {
          setSearchTerm("");
          setStatusFilter("ALL");
          setTypeFilter("ALL");
          setDateFrom("");
          setDateTo("");
        }}
      />

      {/* ✅ LIST */}
      <ComplianceList
        complianceRecords={filteredRecords}
        handleSelectRecord={handleSelectRecord}
      />

      {/* ✅ MODAL */}
      {selectedRecord && (
        <ComplianceCardModal
          summary={summary}
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onSave={(editData) =>
            handleSaveCompliance(editData, selectedRecord)
          }
        />
      )}
    </div>
  );
};

export default ComplianceDashboard;