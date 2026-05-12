import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProjectFormModal = ({ show, handleClose, handleSubmit, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Pre-fill form with existing data
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        startDate: editData.startDate?.split("T")[0] || "",
        endDate: editData.endDate?.split("T")[0] || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [editData, show]);

  // Updates specific field
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const today = new Date().toISOString().split("T")[0];

    if (!form.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!form.startDate || !form.endDate) {
      toast.error("Select both dates");
      return false;
    }

    if (form.startDate < today) {
      toast.error("Start date cannot be in the past");
      return false;
    }

    if (form.endDate < form.startDate) {
      toast.error("End date cannot be before start date");
      return false;
    }

    return true;
  };
  // Hide modal
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h3 className="text-xl font-semibold">
            {editData ? "Update Project" : "Create Project"}
          </h3>

          <button onClick={handleClose} className="text-gray-500 text-2xl">
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-3 bg-gray-50"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-3 bg-gray-50"
          />

          <div className="flex gap-4">
            <input
              type="date"
              name="startDate"
              min={new Date().toISOString().split("T")[0]}
              value={form.startDate}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-3 bg-gray-50"
            />

            <input
              type="date"
              name="endDate"
              min={form.startDate || new Date().toISOString().split("T")[0]}
              value={form.endDate}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-3 bg-gray-50"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (validateForm()) {
                handleSubmit(form);
              }
            }}
            className="px-5 py-2 rounded-lg bg-green-700 text-white"
          >
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;