import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

const AuditsCard = ({ audit, onSave, onClose }) => {

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    findings: audit.findings,
    status: audit.status,
  });

  const [scopeType, scopeId] = audit.scope.split(":");

  return (
    <div className="space-y-6">

      {/* ✅ HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Audit Details</h2>

        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 mr-10">
          {audit.status.replace("_", " ")}
        </span>
      </div>

      {/* ✅ DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Audit ID:</strong> {audit.auditId}</p>
        <p><strong>Date:</strong> {audit.date}</p>
        <p><strong>Scope Type:</strong> {scopeType}</p>
        <p><strong>Scope ID:</strong> {scopeId}</p>
        <p><strong>Officer:</strong> {audit.officer?.name}</p>
      </div>

      {/* ✅ FINDINGS */}
      <div>
        <p className="font-semibold mb-1">Findings</p>

        {!isEditing ? (
          <p className="text-gray-800">{audit.findings || "—"}</p>
        ) : (
          <textarea
            rows={4}
            value={editData.findings}
            onChange={(e) =>
              setEditData({ ...editData, findings: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        )}
      </div>

      {/* ✅ STATUS */}
      {isEditing && (
        <div>
          <label className="font-semibold mb-1 block">Status</label>

          <select
            value={editData.status}
            onChange={(e) =>
              setEditData({ ...editData, status: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          >
            <option value="SCHEDULED">Scheduled</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="COMPLETED">Completed</option>
            <option value="FOLLOW_UP_REQUIRED">Follow Up</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      )}

      {/* ✅ ACTION BUTTONS */}
      <div className="flex gap-3 pt-4">

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </button>
        ) : (
          <>
            {/* ✅ SAME AS COMPLIANCE STYLE */}
            <button
              onClick={() => {
                onSave(editData);   // ✅ KEEP SAME AS YOU WANTED
                setIsEditing(false);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setEditData({
                  findings: audit.findings,
                  status: audit.status,
                });
              }}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        )}

        {/* ✅ CLOSE */}
        <button
          onClick={onClose}
          className="ml-auto bg-red-100 text-red-600 px-4 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default AuditsCard;