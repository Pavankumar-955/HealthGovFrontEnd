import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditInfraModal = ({ show, data, onClose, onUpdate }) => {
  const [form, setForm] = useState({});
  const [touched, setTouched] = useState({});

  // ✅ Sync form
  useEffect(() => {
    setForm(data || {});
    setTouched({});
  }, [data]);

  if (!show || !form) return null;

  // ✅ VALIDATION
  const errors = {
    capacity:
      form.capacity === "" ||
      form.capacity === "-" ||
      isNaN(form.capacity) ||
      Number(form.capacity) < 0,

    status: !form.status,
  };

  const isInvalid = (field) => touched[field] && errors[field];

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      capacity: true,
      status: true,
    });

    if (Object.values(errors).includes(true)) {
      toast.error("Please enter valid data ❌");
      return;
    }

    onUpdate({
      ...form,
      capacity: Number(form.capacity),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow p-6">

        {/* ✅ HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Edit Infrastructure
          </h3>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* ✅ TYPE (READ ONLY) */}
          <div>
            <label className="text-sm text-gray-600">Type</label>
            <input
              value={form.type || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* ✅ LOCATION (READ ONLY) */}
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <input
              value={form.location || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* ✅ CAPACITY */}
          <div>
            <label className="text-sm text-gray-600">Capacity *</label>
            <input
              type="number"
              value={form.capacity ?? ""}
              onBlur={() =>
                setTouched({ ...touched, capacity: true })}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "" || value === "-") {
                  setForm({ ...form, capacity: value });
                  return;
                }

                const num = Number(value);

                if (!isNaN(num)) {
                  setForm({ ...form, capacity: num });
                }
              }}
              className={`w-full border p-2 rounded ${
                isInvalid("capacity") ? "border-red-500" : ""
              }`}
            />

            {isInvalid("capacity") && (
              <p className="text-red-500 text-xs">
                Capacity must be ≥ 0
              </p>
            )}
          </div>

          {/* ✅ STATUS */}
          <div>
            <label className="text-sm text-gray-600">Status *</label>
            <select
              value={form.status || ""}
              onBlur={() =>
                setTouched({ ...touched, status: true })}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })}
              className={`w-full border p-2 rounded ${
                isInvalid("status") ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Status</option>
              <option value="OPERATIONAL">OPERATIONAL</option>
              <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
              <option value="TEMPORARILY_CLOSED">TEMPORARILY_CLOSED</option>
              <option value="DECOMMISSIONED">DECOMMISSIONED</option>
            </select>

            {isInvalid("status") && (
              <p className="text-red-500 text-xs">
                Status is required
              </p>
            )}
          </div>

          {/* ✅ BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 cursor-pointer"
          >
            Update
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditInfraModal;