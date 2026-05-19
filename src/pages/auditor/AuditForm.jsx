import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ IMPORTANT

const AuditForm = ({ compliances = [], onCreate }) => {
  const { user } = useAuth(); // ✅ logged-in auditor
  const officerId = user?.userId;

  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [findings, setFindings] = useState("");
  const [status, setStatus] = useState("SCHEDULED");

  const handleSubmit = () => {
    if (!officerId || !selectedCompliance) {
      alert("Please select a compliance record");
      return;
    }

    const payload = {
      officerId, // ✅ FROM AUTH CONTEXT
      scope: `${selectedCompliance.type}:${selectedCompliance.entityId}`, // ✅ AUTO
      findings,
      status,
      date: new Date().toISOString().split("T")[0], // ✅ TODAY
    };

    onCreate(payload);

    // reset
    setSelectedCompliance(null);
    setFindings("");
    setStatus("SCHEDULED");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Create Audit
      </h3>

      {/* ✅ COMPLIANCE LIST */}
      <select
        value={selectedCompliance?.complianceId || ""}
        onChange={(e) => {
          const compliance = compliances.find(
            (c) => c.complianceId.toString() === e.target.value
          );
          setSelectedCompliance(compliance);
        }}
        className="w-full border p-2 rounded-lg mb-3"
      >
        <option value="">Select Compliance Record</option>
        {compliances.map((c) => (
          <option key={c.complianceId} value={c.complianceId}>
            {c.type} : {c.entityId} — {c.entity?.title}
          </option>
        ))}
      </select>

      {/* ✅ AUTO GENERATED SCOPE */}
      <input
        type="text"
        readOnly
        value={
          selectedCompliance
            ? `${selectedCompliance.type}:${selectedCompliance.entityId}`
            : ""
        }
        placeholder="Scope auto-generated"
        className="w-full border p-2 rounded-lg bg-gray-100 text-gray-600 mb-4"
      />

      {/* ✅ FINDINGS */}
      <textarea
        placeholder="Enter audit findings..."
        value={findings}
        onChange={(e) => setFindings(e.target.value)}
        className="w-full border p-2 rounded-lg mb-4"
        rows={3}
      />

      {/* ✅ STATUS */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded-lg mb-4"
      >
        <option value="SCHEDULED">Scheduled</option>
        <option value="IN_REVIEW">In Review</option>
        <option value="COMPLETED">Completed</option>
        <option value="FOLLOW_UP_REQUIRED">Follow Up Required</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      {/* ✅ CREATE */}
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Create Audit
      </button>

    </div>
  );
};

export default AuditForm;