import React from "react";

//  SOFT STATUS COLORS
const getStatusStyle = (status) => {
  switch (status) {
    case "OPERATIONAL":
      return "bg-green-100 text-green-700";
    case "UNDER_MAINTENANCE":
      return "bg-yellow-100 text-yellow-700";
    case "TEMPORARILY_CLOSED":
      return "bg-gray-100 text-gray-600";
    case "DECOMMISSIONED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const DeleteInfraModal = ({ show, data, onConfirm, onCancel }) => {
  if (!show || !data) return null;

  return (
    <>
      {/*  BLUR BACKGROUND */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/10 z-[9998]"
        onClick={onCancel}
      />

      {/*  MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">

        <div
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >

          {/*  HEADER */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg text-red-500">⚠️</span>

              <h3 className="text-lg font-semibold text-gray-800">
                Delete Infrastructure
              </h3>
            </div>

            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/*  MESSAGE */}
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this infrastructure?
          </p>

          {/*  INFO CARD */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5 space-y-2 text-sm">

            <p>
              <span className="text-gray-500 mr-2">ID:</span>
              <span className="font-medium">{data.infraId}</span>
            </p>

            <p>
              <span className="text-gray-500 mr-2">Type:</span>
              <span className="font-medium">{data.type}</span>
            </p>

            <p>
              <span className="text-gray-500 mr-2">Location:</span>
              <span className="font-medium">{data.location}</span>
            </p>

            <p>
              <span className="text-gray-500 mr-2">Status:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${getStatusStyle(
                  data.status
                )}`}
              >
                {data.status}
              </span>
            </p>

          </div>

          {/*  WARNING BOX */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5">

            <span className="text-lg leading-none">⚠️</span>

            <div>
              <p className="font-medium">
                This action cannot be undone.
              </p>
              <p className="text-xs">
                Please confirm before deleting.
              </p>
            </div>

          </div>

          {/*  ACTION BUTTONS */}
          <div className="flex justify-end gap-3">

            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 cursor-pointer transition"
            >
              Cancel
            </button>

            <button
              onClick={() => onConfirm(data.infraId)}
              className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer transition"
            >
              Delete
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default DeleteInfraModal;