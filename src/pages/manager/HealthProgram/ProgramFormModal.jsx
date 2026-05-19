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
    if (editData && show) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        budget: editData.budget || "",
        startDate: editData.startDate
          ? new Date(editData.startDate).toISOString().split("T")[0]
          : "",
        endDate: editData.endDate
          ? new Date(editData.endDate).toISOString().split("T")[0]
          : "",
        status: editData.status || "ACTIVE",
      });
    } else if (show) {
      setForm({
        title: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE",
      });
    }
  }, [editData, show]);

  if (!show) return null;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  // Using local timezone, not UTC
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const localDateStr = `${year}-${month}-${day}`;
    console.log("📅 getTodayDate() returning:", localDateStr);
    return localDateStr;
  };

  // When updating, ensure startDate is not in the past (backend requirement)
  const sanitizeFormData = (data) => {
    const todayStr = getTodayDate();
    console.log("🔍 Sanitizing form data...");
    console.log("  Current form startDate:", data.startDate);
    console.log("  Today's date:", todayStr);
    console.log("  Is editing:", !!editData);
    
    // If editing and startDate is in the past or today, set it to today
    // Using <= because if startDate equals today but is in the past (backend perspective), it fails
    if (editData && data.startDate && data.startDate < todayStr) {
      console.warn("⚠️ Start date is in the past. Automatically set to today for backend compatibility.");
      console.warn("  Original startDate:", data.startDate);
      console.warn("  Adjusted to:", todayStr);
      return {
        ...data,
        startDate: todayStr,
      };
    }
    
    // For existing programs, if startDate is exactly today but seems to be rejected,
    // ensure it's set to today (the backend expects today or future)
    if (editData && data.startDate === todayStr) {
      console.log("✓ Start date is today, backend should accept it");
      return data;
    }
    
    console.log("✓ Form data is valid, no adjustments needed");
    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = sanitizeFormData({
      ...form,
      budget: Number(form.budget),
    });
    handleSubmit(sanitizedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[10000] backdrop-blur-sm px-4">
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-5 sm:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {editData ? "Edit Program" : "New Program"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Title
            </label>
            <input
              required
              name="title"
              placeholder="e.g. Vaccination Drive 2026"
              value={form.title}
              onChange={onChange}
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Description
            </label>
            <textarea
              required
              name="description"
              placeholder="Enter program details..."
              value={form.description}
              onChange={onChange}
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 h-24 resize-none focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Budget (₹)
            </label>
            <input
              required
              name="budget"
              type="number"
              placeholder="0.00"
              value={form.budget}
              onChange={onChange}
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Start Date
              </label>
              <input
                required
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={onChange}
                min={editData ? undefined : getTodayDate()}
                className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
              {editData && form.startDate < getTodayDate() && (
                <p className="text-xs text-amber-600 mt-1">⚠️ Past date will be auto-adjusted to today on save</p>
              )}
              {editData && form.startDate >= getTodayDate() && (
                <p className="text-xs text-green-600 mt-1">✓ Date is valid for update</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                End Date
              </label>
              <input
                required
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={onChange}
                className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 bg-white focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-1/2 bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 font-bold shadow-lg shadow-green-200"
            >
              {editData ? "Save Changes" : "Create Program"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProgramFormModal;