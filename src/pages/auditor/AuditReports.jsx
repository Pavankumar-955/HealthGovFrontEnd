import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable"
import { getAllAudits } from "../../api/auditsAPI.js";
import { generatePDFReport } from "../../services/pdfReportService";

const getCompletion = (status) => {
  switch (status) {
    case 'COMPLETED': return 100;
    case 'IN_REVIEW': return 70;
    case 'FOLLOW_UP_REQUIRED': return 50;
    case 'SCHEDULED': return 30;
    case 'CANCELLED': return 0;
    default: return 0;
  }
};

const AuditReports = () => {

  const [selectedAudits, setSelectedAudits] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTERS
  const [officerFilter, setOfficerFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [filteredAudits, setFilteredAudits] = useState([]);

  useEffect(() => { fetchAudits(); }, []);

  const fetchAudits = async () => {
    try {
      setLoading(true);
      const res = await getAllAudits();

      const mapped = res.data.map(item => ({
        id: item.auditId,
        name: item.findings || `Audit ${item.auditId}`,
        scope: item.scope,
        status: item.status,
        officer: item.officer?.name || "N/A",
        date: item.date,
        completionRate: getCompletion(item.status),
      }));

      setAudits(mapped);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER LOGIC
  useEffect(() => {
    let data = [...audits];

    if (officerFilter !== "ALL") {
      data = data.filter(a => a.officer === officerFilter);
    }

    if (statusFilter !== "ALL") {
      data = data.filter(a => a.status === statusFilter);
    }

    setFilteredAudits(data);
  }, [audits, officerFilter, statusFilter]);


  const toggleSelect = (id) => {
    setSelectedAudits(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedAudits.length === filteredAudits.length) {
      setSelectedAudits([]);
    } else {
      setSelectedAudits(filteredAudits.map(a => a.id));
    }
  };

  // PDF
  const handleGenerateAuditReport = async () => {
    if (selectedAudits.length === 0) {
      alert("Select at least one audit");
      return;
    }

    setIsGenerating(true);

    try {
      const selectedData = filteredAudits.filter(a =>
        selectedAudits.includes(a.id)
      );

      await generatePDFReport({
        title: "Audit Report",
        data: selectedData,

        requiredFields: ["id", "status"],

        fields: [
          { label: "Audit ID", key: "id" },
          { label: "Findings", key: "name" },
          { label: "Scope", key: "scope" },
          { label: "Officer", key: "officer" },
          { label: "Status", key: "status" },
          { label: "Completion", key: "completionRate" },
          { label: "Date", key: "date" },
        ],

        formatField: (value, key) => {
          if (key === "status") return value?.replaceAll("_", " ");
          if (key === "completionRate") return `${value}%`;
          return value ?? "-";
        }
      });

      setSelectedAudits([]);

    } catch (err) {
      console.error(err);
      alert(err.message || "Error generating report");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl border border-orange-200 bg-white p-8 shadow-2xl">

          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Generate Audit Report
          </h2>

          {/* ✅ FILTERS */}
          <div className="mb-6 flex gap-4 flex-wrap">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
    min-w-[160px] px-3 py-2 text-sm
    border border-gray-300 rounded-lg
    bg-gray-50
    focus:outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "
            >
              <option value="ALL">All Status</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="COMPLETED">Completed</option>
              <option value="FOLLOW_UP_REQUIRED">Follow Up</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button
              onClick={() => {
                setOfficerFilter("ALL");
                setStatusFilter("ALL");
              }}
              className="rounded-xl bg-orange-100 px-4 py-2 text-orange-600 hover:bg-orange-200"
            >
              Clear
            </button>

          </div>

          {/* ✅ LIST */}
          <div className="mb-8">

            <div className="mb-4 flex justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Select Audit Records
              </h3>

              <button
                onClick={toggleAll}
                className="rounded-full bg-green-200 px-4 py-2 text-sm text-black-600"
              >
                {selectedAudits.length === filteredAudits.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            <div className="space-y-3">

              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : filteredAudits.length === 0 ? (
                <p className="text-center text-gray-500">No records found</p>
              ) : (
                filteredAudits.map(a => (
                  <div
                    key={a.id}
                    onClick={() => toggleSelect(a.id)}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition ${selectedAudits.includes(a.id)
                        ? "border-orange-600 bg-orange-50"
                        : "border-orange-100 hover:border-orange-300"
                      }`}
                  >
                    <div className="flex items-center gap-4">

                      <input
                        type="checkbox"
                        checked={selectedAudits.includes(a.id)}
                        readOnly
                        className="h-5 w-5"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {a.name}
                        </p>

                        <div className="mt-1 flex gap-4">

                          <span className="bg-blue-100 px-3 py-1 rounded-full text-xs text-blue-600">
                            {a.scope}
                          </span>

                          <span className="bg-slate-200 px-3 py-1 rounded-full text-xs">
                            {a.status.replaceAll("_", " ")}
                          </span>

                        </div>
                      </div>

                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* ✅ BUTTONS */}
          <div className="flex gap-4">

            <button
              onClick={handleGenerateAuditReport}
              disabled={isGenerating || selectedAudits.length === 0}
              className="flex items-center gap-2 rounded-3xl bg-orange-600 px-8 py-4 text-white hover:bg-orange-700 disabled:opacity-50"
            >
              <DocumentArrowDownIcon className="h-6 w-6" />
              {isGenerating ? "Generating..." : "Generate & Download Report"}
            </button>

            <button
              onClick={() => setSelectedAudits([])}
              className="rounded-xl border-2 border-orange-300 px-8 py-4 text-orange-600"
            >
              Reset
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AuditReports;