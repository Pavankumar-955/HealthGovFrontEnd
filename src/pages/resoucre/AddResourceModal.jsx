import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AddResourceModal = ({ show, onClose, onCreate }) => {

  const [form, setForm] = useState({
    type: "",
    quantity: "",
    status: "",
  });

  const [touched, setTouched] = useState({});

  // ✅ RESET FORM
  useEffect(() => {
    if (!show) {
      setForm({
        type: "",
        quantity: "",
        status: "",
      });
      setTouched({});
    }
  }, [show]);

  if (!show) return null;

  // ✅ VALIDATION
  const errors = {
    type: form.type === "",
    quantity:
      form.quantity === "" ||
      form.quantity === "-" ||
      isNaN(form.quantity) ||
      Number(form.quantity) < 0,
    status: form.status === "",
  };

  const isInvalid = (field) => touched[field] && errors[field];

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      type: true,
      quantity: true,
      status: true,
    });

    if (Object.values(errors).includes(true)) {
      toast.error("Please fill all fields correctly ❌");
      return;
    }

    // ✅ BUSINESS RULE VALIDATION (UNCHANGED)
    if (form.type !== "FUNDS" && form.status === "PENDING") {
      toast.error("PENDING is allowed only for FUNDS ❌");
      return;
    }

    if (form.type === "FUNDS" && form.status === "INACTIVE") {
      toast.error("FUNDS cannot be INACTIVE ❌");
      return;
    }

    onCreate({
      ...form,
      quantity: Number(form.quantity),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow p-6">

        {/* ✅ HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Add Resource
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

          {/* ✅ TYPE */}
          <div>
            <label className="text-sm text-gray-600">Type *</label>
            <select
              value={form.type}
              onBlur={() => setTouched({ ...touched, type: true })}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                  status: "", // ✅ keep your logic
                })
              }
              className={`w-full border p-2 rounded ${
                isInvalid("type") ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Type</option>
              <option value="FUNDS">FUNDS</option>
              <option value="LAB">LAB</option>
              <option value="EQUIPMENT">EQUIPMENT</option>
            </select>

            {isInvalid("type") && (
              <p className="text-red-500 text-xs">Type is required</p>
            )}
          </div>

          {/* ✅ QUANTITY */}
          <div>
            <label className="text-sm text-gray-600">Quantity *</label>
            <input
              type="number"
              value={form.quantity}
              onBlur={() =>
                setTouched({ ...touched, quantity: true })
              }
              onChange={(e) => {
                const value = e.target.value;

                if (value === "" || value === "-") {
                  setForm({ ...form, quantity: value });
                  return;
                }

                const num = Number(value);

                if (!isNaN(num)) {
                  setForm({ ...form, quantity: num });
                }
              }}
              className={`w-full border p-2 rounded ${
                isInvalid("quantity") ? "border-red-500" : ""
              }`}
              placeholder="Enter quantity"
            />

            {isInvalid("quantity") && (
              <p className="text-red-500 text-xs">
                Quantity must be ≥ 0
              </p>
            )}
          </div>

          {/* ✅ STATUS */}
          <div>
            <label className="text-sm text-gray-600">Status *</label>
            <select
              value={form.status}
              onBlur={() =>
                setTouched({ ...touched, status: true })
              }
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })}
              className={`w-full border p-2 rounded ${
                isInvalid("status") ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Status</option>

              {/* ✅ SAME LOGIC */}
              {form.type === "FUNDS" && (
                <>
                  <option value="PENDING">PENDING</option>
                  <option value="ALLOCATED">ALLOCATED</option>
                  <option value="ACTIVE">ACTIVE</option>
                </>
              )}

              {form.type !== "FUNDS" && form.type && (
                <>
                  <option value="ALLOCATED">ALLOCATED</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </>
              )}

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
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700"
          >
            Create
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;