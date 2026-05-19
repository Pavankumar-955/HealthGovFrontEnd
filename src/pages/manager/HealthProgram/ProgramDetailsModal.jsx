import React, { useState } from "react";

export default function ProgramDetailsModal({ program, onClose }) {
  const [showResources, setShowResources] = useState(false);
  const [showInfrastructure, setShowInfrastructure] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);

  if (!program) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 z-[9998]"
        onClick={onClose}
      />

      {/* FULL SCREEN PANEL */}
      <div className="fixed inset-0 z-[9999]">
        <div
          className="bg-white w-full h-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ INNER CONTAINER */}
          <div className="max-w-6xl mx-auto p-6">

            {/* ✅ HEADER */}
            <div className="sticky top-0 bg-white z-10 border-b pb-4 mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Program Details
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  ID: {program.programId} • Status: {program.status}
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black text-3xl"
              >
                ✕
              </button>
            </div>

            {/* ✅ BODY */}
            <div className="space-y-6">

              {/* TITLE */}
              <div>
                <p className="text-xs uppercase text-gray-400 font-bold mb-1">
                  Title
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {program.title}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="text-xs uppercase text-gray-400 font-bold mb-1">
                  Description
                </p>
                <div className="border rounded-xl p-4 bg-gray-50 text-gray-700">
                  {program.description}
                </div>
              </div>

              {/* BUDGET */}
              <div className="bg-green-50 p-4 rounded-xl border flex justify-between">
                <span className="text-green-700 font-bold text-sm">
                  Total Budget
                </span>
                <span className="text-green-800 font-bold text-xl">
                  ₹ {program.budget?.toLocaleString()}
                </span>
              </div>

              {/* ✅ TOGGLE BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowResources(!showResources);
                    setShowInfrastructure(false);
                    setShowEnrollments(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    showResources ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  Resources
                </button>

                <button
                  onClick={() => {
                    setShowInfrastructure(!showInfrastructure);
                    setShowResources(false);
                    setShowEnrollments(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    showInfrastructure ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  Infrastructure
                </button>

                <button
                  onClick={() => {
                    setShowEnrollments(!showEnrollments);
                    setShowResources(false);
                    setShowInfrastructure(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    showEnrollments ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  Enrollments
                </button>
              </div>

              {/* ✅ RESOURCES */}
              {showResources && (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-800 text-white p-3 font-bold">
                    Resources
                  </div>

                  {program.resources?.length > 0 ? (
                    program.resources.map((res) => (
                      <div
                        key={res.resourceId}
                        className="p-4 border-t flex justify-between"
                      >
                        <span>
                          <b>{res.type}</b> (Qty: {res.quantity})
                        </span>
                        <span className="text-blue-600 text-sm">
                          {res.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">
                      No resources found.
                    </p>
                  )}
                </div>
              )}

              {/* ✅ INFRASTRUCTURE */}
              {showInfrastructure && (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-800 text-white p-3 font-bold">
                    Infrastructure
                  </div>

                  {program.infrastructures?.length > 0 ? (
                    program.infrastructures.map((infra) => (
                      <div
                        key={infra.infraId}
                        className="p-4 border-t flex justify-between"
                      >
                        <div>
                          <p className="font-semibold">{infra.location}</p>
                          <p className="text-xs text-gray-500">
                            Capacity: {infra.capacity}
                          </p>
                        </div>

                        <span className="text-green-600 text-sm">
                          {infra.status?.replace("_", " ")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">
                      No infrastructure records.
                    </p>
                  )}
                </div>
              )}

              {/* ✅ ENROLLMENTS */}
              {showEnrollments && (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-800 text-white p-3 font-bold">
                    Enrollments
                  </div>

                  {program.enrollments?.length > 0 ? (
                    program.enrollments.map((enr) => (
                      <div
                        key={enr.enrollmentId}
                        className="p-4 border-t flex justify-between"
                      >
                        <span>Citizen ID: {enr.citizenId}</span>
                        <span className="text-gray-500 text-xs">
                          {enr.enrolledDate}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">
                      No enrollments.
                    </p>
                  )}
                </div>
              )}

              {/* ✅ DATES */}
              <div className="grid grid-cols-2 gap-6 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-400 font-bold">Start Date</p>
                  <p>{program.startDate}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold">End Date</p>
                  <p>{program.endDate}</p>
                </div>
              </div>

            </div>

            {/* ✅ FOOTER */}
            <div className="mt-10 text-right">
              <button
                onClick={onClose}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}