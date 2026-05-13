import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable"
import { getAllAudits } from "../../api/auditsAPI.js";

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

  // ✅ FILTERS
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

  const uniqueOfficers = [...new Set(audits.map(a => a.officer))];

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

  // ✅ PDF
 const generatePDF = async () => {
  if (selectedAudits.length === 0) {
    alert("Select at least one audit");
    return;
  }

  setIsGenerating(true);

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // ✅ LOAD LOGO
    const img = new Image();
    img.src = "/images/web_Icon.png";

    await new Promise((resolve) => (img.onload = resolve));

    const selectedData = filteredAudits.filter(a =>
      selectedAudits.includes(a.id)
    );

    selectedData.forEach((a, index) => {

      if (index !== 0) doc.addPage();

      let y = 15;

      /* ✅ HEADER */
      doc.addImage(img, "PNG", pageWidth / 2 - 15, y, 30, 15);

      y += 20;

      doc.setFontSize(18);
      doc.setTextColor(0, 102, 153);
      doc.text("HealthGov", pageWidth / 2, y, { align: "center" });

      y += 6;

      doc.setFontSize(11);
      doc.setTextColor(120);
      doc.text("Audit Report", pageWidth / 2, y, { align: "center" });

      y += 12;

      doc.setDrawColor(200);
      doc.line(20, y, pageWidth - 20, y);

      y += 10;

      /* ✅ TITLE */
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("AUDIT DETAILS", 20, y);

      y += 8;

      doc.setFontSize(12);
      doc.text(a.name ?? "N/A", 20, y);

      y += 10;

      /* ✅ ✅ TABLE STRUCTURE (LIKE COMPLIANCE ✅) */

      let tableBody = [
        ["Audit ID", String(a.id ?? "-")],
        ["Findings", a.name ?? "-"],
        ["Scope", a.scope ?? "-"],
        ["Officer", a.officer ?? "-"],
        ["Status", a.status?.replaceAll("_", " ") ?? "-"],
        ["Completion", `${a.completionRate ?? 0}%`],
        ["Date", a.date ?? "-"],
      ];

      autoTable(doc, {
        startY: y,

        head: [["Field", "Value"]],
        body: tableBody,

        styles: {
          fontSize: 10,
          cellPadding: 4,
          lineWidth: 0.5, // ✅ borders
          lineColor: [200, 200, 200],
        },

        headStyles: {
          fillColor: [34, 197, 94], // ✅ GREEN HEADER
          textColor: 255,
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },

        columnStyles: {
          0: { cellWidth: 60, fontStyle: "bold" },
          1: { cellWidth: 110 },
        },

        theme: "grid", // ✅ full table grid
      });

      // ✅ MOVE BELOW TABLE
      y = doc.lastAutoTable.finalY + 10;

      /* ✅ STATUS COLOR TEXT */
      let statusColor = [0, 150, 0];
      if (a.status === "CANCELLED") statusColor = [200, 0, 0];
      if (a.status === "IN_REVIEW") statusColor = [200, 150, 0];
      if (a.status === "FOLLOW_UP_REQUIRED") statusColor = [0, 100, 200];

      doc.setTextColor(...statusColor);
      doc.setFontSize(12);
      doc.text(
        `Audit Status: ${a.status?.replaceAll("_", " ")}`,
        20,
        y
      );

      /* ✅ FOOTER */
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setDrawColor(200);
      doc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);

      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        "Generated by HealthGov System",
        pageWidth / 2,
        pageHeight - 8,
        { align: "center" }
      );

    });

    doc.save(`audit-report-${Date.now()}.pdf`);
    setSelectedAudits([]);

  } catch (err) {
    console.error(err);
    alert("Error generating report");
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
              value={officerFilter}
              onChange={(e) => setOfficerFilter(e.target.value)}
              className="px-4 py-2 rounded-full border border-orange-200 bg-orange-50"
            >
              <option value="ALL">All Officers</option>
              {uniqueOfficers.map((o,i)=>(
                <option key={i} value={o}>{o}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-full border border-orange-200 bg-orange-50"
            >
              <option value="ALL">All Status</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="COMPLETED">Completed</option>
              <option value="FOLLOW_UP_REQUIRED">Follow Up</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button
              onClick={()=>{
                setOfficerFilter("ALL");
                setStatusFilter("ALL");
              }}
              className="rounded-full bg-orange-100 px-4 py-2 text-orange-600 hover:bg-orange-200"
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
                className="rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-600"
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
                    onClick={()=>toggleSelect(a.id)}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition ${
                      selectedAudits.includes(a.id)
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

                          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                            {a.officer}
                          </span>

                          <span className="bg-slate-200 px-3 py-1 rounded-full text-xs">
                            {a.status.replaceAll("_", " ")}
                          </span>

                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold">
                          {a.completionRate}%
                        </p>
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
              onClick={generatePDF}
              disabled={isGenerating || selectedAudits.length === 0}
              className="flex items-center gap-2 rounded-3xl bg-orange-600 px-8 py-4 text-white hover:bg-orange-700 disabled:opacity-50"
            >
              <DocumentArrowDownIcon className="h-6 w-6"/>
              {isGenerating ? "Generating..." : "Generate & Download Report"}
            </button>

            <button
              onClick={()=>setSelectedAudits([])}
              className="rounded-3xl border-2 border-orange-300 px-8 py-4 text-orange-600"
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