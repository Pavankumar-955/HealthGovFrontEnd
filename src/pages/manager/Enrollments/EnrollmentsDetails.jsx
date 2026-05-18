import React from "react";

const EnrollmentsDetails = ({ enrollment, onClose }) => {
  if (!enrollment) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-96">

          <h3 className="text-xl font-bold mb-4">Enrollment Details</h3>

          <p><b>ID:</b> {enrollment.enrollmentId}</p>
          <p><b>Citizen:</b> {enrollment.citizenId}</p>
          <p><b>Program:</b> {enrollment.programId}</p>
          <p><b>Date:</b> {enrollment.date}</p>
          <p><b>Status:</b> {enrollment.status}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
export default EnrollmentsDetails;