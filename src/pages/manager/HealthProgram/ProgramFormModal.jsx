import React, { useState, useEffect } from "react";
 
const ProgramFormModal = ({ show, handleClose, handleSubmit, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    status: "PENDING",
  });
 
  // ✅ Load edit data when editing
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        budget: editData.budget || "",
        startDate: editData.startDate?.split("T")[0] || "",
        endDate: editData.endDate?.split("T")[0] || "",
        status: editData.status || "PENDING",
      });
    } else {
      // ✅ Reset form when creating new
      setForm({
        title: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "PENDING",
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
 
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow">
 
        <h2 className="text-xl font-semibold mb-4">
          {editData ? "Update Program" : "Create Program"}
        </h2>
 
        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title"
          className="w-full border p-2 mb-2"
        />
 
        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Description"
          className="w-full border p-2 mb-2"
        />
 
        {/* Budget */}
        <input
          name="budget"
          type="number"
          value={form.budget}
          onChange={onChange}
          placeholder="Budget"
          className="w-full border p-2 mb-2"
        />
 
        {/* Dates */}
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={onChange}
          className="w-full border p-2 mb-2"
        />
 
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={onChange}
          className="w-full border p-2 mb-2"
        />
 
        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={onChange}
          className="w-full border p-2 mb-2"
        >
          <option value="PENDING">PENDING</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
 
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>
 
          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            {editData ? "Update" : "Create"}
          </button>
        </div>
 
      </div>
    </div>
  );
};
 
export default ProgramFormModal;