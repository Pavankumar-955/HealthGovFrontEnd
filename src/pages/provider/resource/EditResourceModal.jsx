import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditResourceModal = ({ show, data, onClose, onUpdate }) => {

  const [form, setForm] = useState({});
  const [touched, setTouched] = useState({});

  // ✅ Sync form
  useEffect(() => {
    setForm(data || {});
    setTouched({});
  }, [data]);

  if (!show || !form) return null;

  // ✅ BLOCK IF COMPLETED (only styled)
  if (data?.status === "COMPLETED") {
    return (
      <>
        {/* ✅ BLUR BACKGROUND */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/10 z-[9998]"
          onClick={onClose}
        />

        <div className="fixed inset-0 flex items-center justify-center z-[9999]">

          <div
            className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >

            <h3 className="text-lg font-semibold mb-3">
              Edit Resource
            </h3>

            <p className="text-red-500 mb-4">
              Completed resources cannot be modified ❌
            </p>

            <button
              onClick={onClose}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 cursor-pointer transition"
            >
              Close
            </button>

          </div>
        </div>
      </>
    );
  }

  // ✅ VALIDATION
  const errors = {
    quantity:
      form.quantity === "" ||
      form.quantity === "-" ||
      isNaN(form.quantity) ||
      Number(form.quantity) < 0,

    status: !form.status,
  };

  const isInvalid = (field) => touched[field] && errors[field];

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      quantity: true,
      status: true,
    });

    if (Object.values(errors).includes(true)) {
      toast.error("Please enter valid data ❌");
      return;
    }

    // ✅ STRICT RULE (unchanged)
    if (
      form.status === "COMPLETED" &&
      data?.status !== "ACTIVE"
    ) {
      toast.error("Only ACTIVE resources can be completed ❌");
      return;
    }

    onUpdate({
      ...form,
      quantity: Number(form.quantity),
    });
  };

  return (
    <>
      {/* ✅ BLUR BACKGROUND */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/10 z-[9998]"
        onClick={onClose}
      />

      {/* ✅ MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">

        <div
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ✅ HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Resource
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* ✅ FORM */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* ✅ TYPE */}
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <input
                value={form.type || ""}
                disabled
                className="w-full border border-gray-200 p-2 rounded bg-gray-100 text-gray-500"
              />
            </div>

            {/* ✅ QUANTITY */}
            <div>
              <label className="text-sm text-gray-600">Quantity *</label>
              <input
                type="number"
                value={form.quantity ?? ""}
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
                  isInvalid("quantity")
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
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
                value={form.status || ""}
                onBlur={() =>
                  setTouched({ ...touched, status: true })
                }
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })}
                className={`w-full border p-2 rounded ${
                  isInvalid("status")
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select Status</option>

                {form.type === "FUNDS" ? (
                  <>
                    <option value="PENDING">PENDING</option>
                    <option value="ALLOCATED">ALLOCATED</option>
                    <option value="ACTIVE">ACTIVE</option>

                    {data?.status === "ACTIVE" && (
                      <option value="COMPLETED">COMPLETED</option>
                    )}
                  </>
                ) : (
                  <>
                    <option value="ALLOCATED">ALLOCATED</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>

                    {data?.status === "ACTIVE" && (
                      <option value="COMPLETED">COMPLETED</option>
                    )}
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

export default EditResourceModal;