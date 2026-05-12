import React, { useState } from "react";
const AuditForm = ({ officers = [], onCreate }) => {

  const [formData, setFormData] = useState({
    officerId: "",
    scopeType: "PROGRAM",
    scopeId: "",
    findings: "",
    status: "SCHEDULED"
  });

  const handleSubmit = () => {
    if (!formData.officerId || !formData.scopeId) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      officerId: formData.officerId,
      scope: `${formData.scopeType}:${formData.scopeId}`,
      findings: formData.findings,
      status: formData.status,
    };

    onCreate(payload);

    // ✅ Reset form
    setFormData({
      officerId: "",
      scopeType: "PROGRAM",
      scopeId: "",
      findings: "",
      status: "SCHEDULED"
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-6">

      <h3 className="text-lg font-semibold mb-4">
        Create Audit
      </h3>

      <div className="grid grid-cols-3 gap-4">

        {/* ✅ Officer */}
        <select
          value={formData.officerId}
          onChange={(e) =>
            setFormData({ ...formData, officerId: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">Select Officer</option>
          {officers.map((o) => (
            <option key={o.userId} value={o.userId}>
              {o.name}
            </option>
          ))}
        </select>

        {/* ✅ Scope Type */}
        <select
          value={formData.scopeType}
          onChange={(e) =>
            setFormData({ ...formData, scopeType: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="PROGRAM">Program</option>
          <option value="PROJECT">Project</option>
          <option value="GRANT">Grant</option>
        </select>

        {/* ✅ Scope ID */}
        <input
          type="number"
          placeholder="Scope ID"
          value={formData.scopeId}
          onChange={(e) =>
            setFormData({ ...formData, scopeId: e.target.value })
          }
          className="border p-2 rounded-lg"
        />
      </div>

      {/* ✅ Findings */}
      <textarea
        placeholder="Enter findings..."
        value={formData.findings}
        onChange={(e) =>
          setFormData({ ...formData, findings: e.target.value })
        }
        className="w-full mt-4 border p-2 rounded-lg"
      />

      {/* ✅ Status */}
      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
        className="w-full mt-4 border p-2 rounded-lg"
      >
        <option value="SCHEDULED">Scheduled</option>
        <option value="IN_REVIEW">In Review</option>
        <option value="COMPLETED">Completed</option>
        <option value="FOLLOW_UP_REQUIRED">Follow Up</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      {/* ✅ Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Create Audit
      </button>

    </div>
  );
};

export default AuditForm;
