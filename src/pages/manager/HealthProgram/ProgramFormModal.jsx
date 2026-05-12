import React, { useState, useEffect } from "react";

const ProgramFormModal = ({ show, handleClose, handleSubmit, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        budget: editData.budget || "",
        startDate: editData.startDate?.split("T")[0] || "",
        endDate: editData.endDate?.split("T")[0] || "",
        status: editData.status || "ACTIVE",
      });
    } else {
      setForm({
        title: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE", // ✅ Always ACTIVE by default
      });
    }
  }, [editData, show]);

  if (!show) return null;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    handleSubmit({
      ...form,
      budget: Number(form.budget),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[10000]">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {editData ? "Update Program" : "Create Program"}
        </h2>

        <div className="space-y-3">
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none h-24"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Budget (₹)</label>
            <input
              name="budget"
              type="number"
              value={form.budget}
              onChange={onChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={onChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={onChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Status - Locked during creation, editable during update */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              disabled={!editData} // ✅ Disables input if creating a NEW program
              className={`w-full border rounded-lg p-2 mt-1 outline-none ${
                !editData ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white focus:ring-2 focus:ring-green-500"
              }`}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            {!editData && (
              <p className="text-[10px] text-gray-400 mt-1">New programs are set to ACTIVE by default.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            {editData ? "Update Program" : "Create Program"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramFormModal;