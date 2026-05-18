import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditInfraModal = ({ show, data, onClose, onUpdate }) => {
  const [form, setForm] = useState({});
  const [touched, setTouched] = useState({});

  //  Sync form
  useEffect(() => {
    setForm(data || {});
    setTouched({});
  }, [data]);

  if (!show || !form) return null;

  //  VALIDATION
  const errors = {
    capacity:
      form.capacity === "" ||
      form.capacity === "-" ||
      isNaN(form.capacity) ||
      Number(form.capacity) < 0,

    status: !form.status,
  };

  const isInvalid = (field) => touched[field] && errors[field];

  //  SUBMIT
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
    <>
      {/*  BLUR BACKGROUND */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/10 z-[9998]"
        onClick={onClose}
      />

      {/*  MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">

        <div
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >

          {/*  HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Infrastructure
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/*  FORM */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* TYPE (READ ONLY) */}
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <input
                value={form.type || ""}
                disabled
                className="w-full border border-gray-200 p-2 rounded bg-gray-100 text-gray-500"
              />
            </div>

            {/* LOCATION (READ ONLY) */}
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <input
                value={form.location || ""}
                disabled
                className="w-full border border-gray-200 p-2 rounded bg-gray-100 text-gray-500"
              />
            </div>

            {/* CAPACITY */}
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
                className={`w-full border p-2 rounded ${isInvalid("capacity")
                    ? "border-red-400"
                    : "border-gray-200"
                  }`}
              />

              {isInvalid("capacity") && (
                <p className="text-red-500 text-xs">
                  Capacity must be ≥ 0
                </p>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className="text-sm text-gray-600">Status *</label>
              <select
                value={form.status || ""}
                onBlur={() =>
                  setTouched({ ...touched, status: true })}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })}
                className={`w-full border p-2 rounded ${isInvalid("status")
                    ? "border-red-400"
                    : "border-gray-200"
                  }`}
              >
                <option value="">Select Status</option>
                <option value="OPERATIONAL">OPERATIONAL</option>
                <option value="UNDER_MAINTENANCE">
                  UNDER_MAINTENANCE
                </option>
                <option value="TEMPORARILY_CLOSED">
                  TEMPORARILY_CLOSED
                </option>
                <option value="DECOMMISSIONED">
                  DECOMMISSIONED
                </option>
              </select>

              {isInvalid("status") && (
                <p className="text-red-500 text-xs">
                  Status is required
                </p>
              )}
            </div>

            {/*  UPDATE BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg hover:bg-indigo-200 cursor-pointer transition"
            >
              Update
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditInfraModal;