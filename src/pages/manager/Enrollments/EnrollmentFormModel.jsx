import React, { useState, useEffect } from "react";
 
const EnrollmentFormModel = ({ show, handleClose, handleSubmit, editData }) => {
 
  const [form, setForm] = useState({
    enrollmentId: "",
    citizenId: "",
    programId: "",
    date: "",
    status: "ACTIVE",
  });
 
  useEffect(() => {
    if (editData) {
      setForm({
        enrollmentId: editData.enrollmentId,
        citizenId: editData.citizenId,
        programId: editData.programId,
        date: editData.date,
        status: editData.status,
      });
    } else {
      setForm({
        enrollmentId: "",
        citizenId: "",
        programId: "",
        date: "",
        status: "ACTIVE",
      });
    }
  }, [editData, show]);
 
  if (!show) return null;
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const onSubmit = () => {
    handleSubmit({
      ...form,
      citizenId: Number(form.citizenId),
      programId: Number(form.programId),
    });
  };
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-xl w-96">
 
        <h2 className="text-lg mb-4">
          {editData ? "Update Enrollment" : "Create Enrollment"}
        </h2>
 
        {editData && (
          <input
            value={form.enrollmentId}
            disabled
            className="border p-2 w-full mb-2 bg-gray-100"
          />
        )}
 
        <input
          name="citizenId"
          value={form.citizenId}
          onChange={handleChange}
          placeholder="Citizen ID"
          className="border p-2 w-full mb-2"
        />
 
        <input
          name="programId"
          value={form.programId}
          onChange={handleChange}
          placeholder="Program ID"
          className="border p-2 w-full mb-2"
        />
 
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
 
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option>ACTIVE</option>
          <option>INACTIVE</option>
        </select>
 
        <div className="flex justify-end gap-2">
          <button onClick={handleClose}>Cancel</button>
 
          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
 
      </div>
    </div>
  );
};
 
export default EnrollmentFormModel;