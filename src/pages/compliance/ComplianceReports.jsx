import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable"
import { getAllComplianceRecords } from "../../api/complianceAPI.js";

// ✅ Completion mapping
const getCompletion = (status) => {
  switch (status) {
    case 'COMPLIANT':
      return 100;
    case 'PARTIALLY_COMPLIANT':
      return 70;
    case 'UNDER_REVIEW':
      return 50;
    case 'NON_COMPLIANT':
      return 0;
    default:
      return 0;
  }
};

const ComplianceReports = () => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [complianceRecords, setComplianceRecords] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ FIXED

  // ✅ Fetch data
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);

      const res = await getAllComplianceRecords();
      console.log("Fetched compliance records from Compliance Report :", res.data);

      const mappedData = res.data.map((item) => {
  const entity = item.entity || {};

  const base = {
    id: item.complianceId,
    type: item.type,
    status: item.result,
    date: item.date,
    notes: item.notes ?? "No notes available",

    name: entity.title ?? "N/A",
    description: entity.description ?? "No description available",

    startDate: entity.startDate ?? "-",
    endDate: entity.endDate ?? "-",
  };

  if (item.type === "PROGRAM") {
    return {
      ...base,
      budget: entity.budget ?? "N/A",
      managerId: entity.managerId ?? "-"
    };
  }

  if (item.type === "PROJECT") {
    return {
      ...base,
      researcherName: entity.researcherName ?? entity.researcher ?? "-",  // ✅ FIX
      researcherId: entity.researcherId ?? "-",
    };
  }

  if (item.type === "GRANT") {
    return {
      ...base,
      amount: entity.amount ?? "0",
      grantId: entity.grantId ?? "-",
      projectId: entity.projectId ?? "-"
    };
  }

  return base;
});


      setComplianceRecords(mappedData);

    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Select individual record
  const toggleRecordSelection = (id) => {
    setSelectedRecords(prev =>
      prev.includes(id)
        ? prev.filter(rid => rid !== id)
        : [...prev, id]
    );
  };

  // ✅ Select all
  const toggleAllRecords = () => {
    if (selectedRecords.length === complianceRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(complianceRecords.map(r => r.id));
    }
  };

  // ✅ Generate PDF
const generatePDFReport = async () => {
  if (selectedRecords.length === 0) {
    alert("Select at least one record");
    return;
  }

  setIsGenerating(true);

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // ✅ Load Logo
    const img = new Image();
    img.src = "/images/web_Icon.png";

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const selectedData = complianceRecords.filter((r) =>
      selectedRecords.includes(r.id)
    );

    selectedData.forEach((record, index) => {

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
      doc.text("Compliance Report", pageWidth / 2, y, { align: "center" });

      y += 12;

      doc.setDrawColor(200);
      doc.line(20, y, pageWidth - 20, y);

      y += 10;

      /* ✅ TITLE */
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(`${record.type} DETAILS`, 20, y);

      y += 8;

      doc.setFontSize(12);
      doc.text(record.name ?? "N/A", 20, y);

      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        record.description ?? "No description available",
        20,
        y,
        { maxWidth: 170 }
      );

      y += 10;

      /* ✅ ✅ TABLE STRUCTURE */

      let tableBody = [
        ["Compliance ID", String(record.id ?? "-")],
        ["Date", record.date ?? "-"],
        ["Type", record.type ?? "-"],
        ["Start Date", record.startDate ?? "-"],
        ["End Date", record.endDate ?? "-"],
      ];

      // ✅ PROGRAM
      if (record.type === "PROGRAM") {
        tableBody.push(
          ["Budget", `₹${record.budget ?? "N/A"}`],
          ["Manager ID", String(record.managerId ?? "-")]
        );
      }

      // ✅ PROJECT
      if (record.type === "PROJECT") {
        tableBody.push(
          ["Researcher", record.researcherName ?? "-"],
          ["Researcher ID", String(record.researcherId ?? "-")]
        );
      }

      // ✅ GRANT
      if (record.type === "GRANT") {
        tableBody.push(
          ["Grant ID", String(record.grantId ?? "-")],
          ["Project ID", String(record.projectId ?? "-")],
          ["Amount", `₹${record.amount ?? "0"}`]
        );
      }

      /* ✅ DRAW TABLE */
      autoTable(doc, {
        startY: y,

        head: [["Field", "Value"]],
        body: tableBody,

        styles: {
          fontSize: 10,
          cellPadding: 4,
          
lineWidth: 0.5,
    lineColor: [200, 200, 200], // light grey border

        },

        headStyles: {
          fillColor: [34, 197, 94],
          textColor: 255,
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor:[245, 247, 250],
        },

        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 110 },
        },
        theme: "grid",
      });

      // ✅ MOVE Y BELOW TABLE
      y = doc.lastAutoTable.finalY + 10;

      /* ✅ STATUS */
      let statusColor = [0, 150, 0];
      if (record.status === "NON_COMPLIANT") statusColor = [200, 0, 0];
      if (record.status === "UNDER_REVIEW") statusColor = [200, 150, 0];
      if (record.status === "PARTIALLY_COMPLIANT") statusColor = [0, 100, 200];

      doc.setTextColor(...statusColor);
      doc.setFontSize(12);
      doc.text(
        `Compliance Result: ${record.status?.replaceAll("_", " ") ?? "-"}`,
        20,
        y
      );

      y += 10;

      /* ✅ NOTES */
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.text("Notes", 20, y);

      y += 6;

      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(record.notes ?? "No notes available", 20, y, {
        maxWidth: 170,
      });

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

    doc.save(`healthgov-report-${Date.now()}.pdf`);

    setSelectedRecords([]);

  } catch (err) {
    console.error(err);
    alert("Error generating PDF");
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br  p-8">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl border border-orange-200 bg-white p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Generate Compliance Report
          </h2>

          {/* Records */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Select Compliance Records
              </h3>

              <button
                onClick={toggleAllRecords}
                className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-200 transition"
              >
                {selectedRecords.length === complianceRecords.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
            </div>

            {/* ✅ Loading & Data */}
            <div className="space-y-3">

              {loading ? (
                <p className="text-center text-gray-500">Loading records...</p>

              ) : complianceRecords.length === 0 ? (
                <p className="text-center text-gray-500">No records found</p>

              ) : (
                complianceRecords.map((record) => (
                  <div
                    key={record.id}
                    onClick={() => toggleRecordSelection(record.id)}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition ${
                      selectedRecords.includes(record.id)
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-orange-100 bg-white hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">

                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(record.id)}
                        onChange={() => toggleRecordSelection(record.id)}
                        className="h-5 w-5 cursor-pointer"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {record.name}
                        </p>

                        <div className="mt-1 flex items-center gap-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                            {record.type}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              record.status === 'COMPLIANT'
                                ? 'bg-green-100 text-green-600'
                                : record.status === 'UNDER_REVIEW'
                                ? 'bg-amber-100 text-amber-600'
                                : record.status === 'PARTIALLY_COMPLIANT'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {record.status.replaceAll("_", " ")}
                          </span>

                          <span className="text-sm text-gray-600">
                            {record.date}
                          </span>
                        </div>
                      </div>


                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-4">
            <button
              onClick={generatePDFReport}
              disabled={isGenerating || selectedRecords.length === 0}
              className="flex items-center gap-2 rounded-3xl px-8 py-4 font-semibold text-white bg-orange-600 hover:bg-orange-700 transition disabled:opacity-50"
            >
              <DocumentArrowDownIcon className="h-6 w-6" />
              {isGenerating ? 'Generating...' : 'Generate & Download Report'}
            </button>

            <button
              onClick={() => setSelectedRecords([])}
              className="rounded-3xl border-2 border-orange-300 px-8 py-4 font-semibold text-orange-600 hover:bg-orange-50"
            >
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ComplianceReports;