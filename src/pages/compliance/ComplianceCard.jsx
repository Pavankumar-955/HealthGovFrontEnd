import { useState } from "react";
import {
  FolderIcon,
  DocumentIcon,
  CurrencyDollarIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";


const ComplianceCard = ({ record, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    result: record.result,
    notes: record.notes,
  });

  const resultTagClass = {
    COMPLIANT: "bg-green-500",
    PARTIALLY_COMPLIANT: "bg-blue-500",
    NON_COMPLIANT: "bg-orange-500",
    UNDER_REVIEW: "bg-yellow-500",
  }[record.result] || "bg-gray-500";

  const TypeIcon =
    {
      PROGRAM: FolderIcon,
      PROJECT: DocumentIcon,
      GRANT: CurrencyDollarIcon,
    }[record.type] || DocumentIcon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TypeIcon className="h-6 w-6 text-blue-700" />
          <span className="uppercase font-semibold tracking-wide">
            {record.type}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${resultTagClass}`}
        >
          {record.result.replace("_", " ")}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h2 className="text-2xl font-semibold">
          {record.entity?.title || `Entity ID: ${record.entityId}`}
        </h2>
        {record.entity?.description && (
          <p className="mt-1 text-gray-700">{record.entity.description}</p>
        )}
      </div>

      {/* Core Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Compliance ID:</strong> {record.complianceId}</p>
        <p><strong>Date:</strong> {record.date}</p>
        {record.entity?.status && (
          <p><strong>Entity Status:</strong> {record.entity.status}</p>
        )}
        <p><strong>Entity ID:</strong> {record.entityId}</p>
      </div>

      {/* Dynamic Entity Fields */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {record.entity?.budget !== undefined && (
          <p><strong>Budget:</strong> ₹{Number(record.entity.budget).toLocaleString()}</p>
        )}
        {record.entity?.amount !== undefined && (
          <p><strong>Grant Amount:</strong> ₹{Number(record.entity.amount).toLocaleString()}</p>
        )}
        {record.entity?.startDate && (
          <p><strong>Start Date:</strong> {record.entity.startDate}</p>
        )}
        {record.entity?.endDate && (
          <p><strong>End Date:</strong> {record.entity.endDate}</p>
        )}
        {record.entity?.managerId && (
          <p><strong>Manager ID:</strong> {record.entity.managerId}</p>
        )}
        {record.entity?.projectId && (
          <p><strong>Project ID:</strong> {record.entity.projectId}</p>
        )}
        {record.entity?.researcherId && (
          <p><strong>Researcher ID:</strong> {record.entity.researcherId}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <p className="font-semibold mb-1">Notes</p>
        {!isEditing ? (
          <p className="text-gray-800">{record.notes || "—"}</p>
        ) : (
          <textarea
            rows={4}
            value={editData.notes}
            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
        )}
      </div>

      {/* Edit Result */}
      {isEditing && (
        <div>
          <label className="block text-sm font-semibold mb-1">Compliance Result</label>
          <select
            value={editData.result}
            onChange={(e) => setEditData({ ...editData, result: e.target.value })}
            className="w-full rounded-lg border p-2"
          >
            <option value="COMPLIANT">Compliant</option>
            <option value="PARTIALLY_COMPLIANT">Partially Compliant</option>
            <option value="NON_COMPLIANT">Non Compliant</option>
            <option value="UNDER_REVIEW">Under Review</option>
          </select>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <PencilIcon className="h-4 w-4" /> Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                onSave?.(editData);
                setIsEditing(false);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        )}
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

export default ComplianceCard;