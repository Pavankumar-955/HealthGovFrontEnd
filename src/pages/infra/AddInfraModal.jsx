import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AddInfraModal = ({ show, onClose, onCreate }) => {
  const [form, setForm] = useState({
    type: "",
    location: "",
    capacity: "",
    status: "",
  });

  const [touched, setTouched] = useState({});

  // ✅ RESET FORM
  useEffect(() => {
    if (!show) {
      setForm({
        type: "",
        location: "",
        capacity: "",
        status: "",
      });
      setTouched({});
    }
  }, [show]);

  if (!show) return null;

  // ✅ VALIDATION
  const errors = {
    type: form.type === "",
    location: form.location.trim() === "",
    capacity:
      form.capacity === "" ||
      form.capacity === "-" ||
      isNaN(form.capacity) ||
      Number(form.capacity) < 0,
    status: form.status === "",
  };

  const isInvalid = (field) => touched[field] && errors[field];

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      type: true,
      location: true,
      capacity: true,
      status: true,
    });

    if (Object.values(errors).includes(true)) {
      toast.error("Please fill all fields correctly ❌");
      return;
    }

    onCreate({
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
            Add Infrastructure
          </h3>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✖
          </button>
        </div>

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600">Type *</label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })}
              onBlur={() => setTouched({ ...touched, type: true })}
              className={`w-full border p-2 rounded ${
                isInvalid("type") ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Type</option>
              <option value="HOSPITAL">HOSPITAL</option>
              <option value="LAB">LAB</option>
              <option value="CENTER">CENTER</option>
            </select>

            {isInvalid("type") && (
              <p className="text-red-500 text-xs">Type required</p>
            )}
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm text-gray-600">Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })}
              onBlur={() => setTouched({ ...touched, location: true })}
              className={`w-full border p-2 rounded ${
                isInvalid("location") ? "border-red-500" : ""
              }`}
              placeholder="Enter location"
            />

            {isInvalid("location") && (
              <p className="text-red-500 text-xs">
                Location required
              </p>
            )}
          </div>

          {/* CAPACITY */}
          <div>
            <label className="text-sm text-gray-600">Capacity *</label>
            <input
              type="number"
              value={form.capacity}
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
              onBlur={() => setTouched({ ...touched, capacity: true })}
              className={`w-full border p-2 rounded ${
                isInvalid("capacity") ? "border-red-500" : ""
              }`}
              placeholder="Enter capacity"
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
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })}
              onBlur={() => setTouched({ ...touched, status: true })}
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
              <p className="text-red-500 text-xs">Status required</p>
            )}
          </div>

          {/* ✅ BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700"
          >
            Create
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddInfraModal;