import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { generatePDFReport } from "../../services/pdfReportService.js";
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
  const handleGenerateReport = async () => {
    if (selectedRecords.length === 0) {
      alert("Select at least one record");
      return;
    }

    setIsGenerating(true);

    try {
      const selectedData = complianceRecords.filter(r =>
        selectedRecords.includes(r.id)
      );

      await generatePDFReport({
        title: "Compliance Report",
        data: selectedData,

        requiredFields: ["id", "type", "status"],

        fields: [
          { label: "Compliance ID", key: "id" },
          { label: "Type", key: "type" },
          { label: "Status", key: "status" },
          { label: "Date", key: "date" },
          { label: "Start Date", key: "startDate" },
          { label: "End Date", key: "endDate" },
        ],

        formatField: (value, key, record) => {
          if (key === "status") return value?.replaceAll("_", " ");
          return value ?? "-";
        }
      });

      setSelectedRecords([]);

    } catch (err) {
      console.error(err);
      alert(err.message || "Error generating PDF");
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
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition ${selectedRecords.includes(record.id)
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
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${record.status === 'COMPLIANT'
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
              onClick={handleGenerateReport}
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