import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function DecisionModal({ application, onClose, onSubmit }) {

  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const submitHandler = () => {

    if (!decision) {
      alert("Select decision");
      return;
    }

    if (decision === "APPROVED") {
      if (!amount) {
        alert("Enter amount");
        return;
      }

      setShowPayment(true);
      return;
    }

    if (decision === "REJECTED") {
      if (!reason) {
        alert("Enter reason");
        return;
      }

      onSubmit(decision, reason, "");
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    onSubmit("APPROVED", "", amount);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={onClose}
      />

      {/* CENTER POPUP */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">

        <div
          className="bg-white w-full max-w-md rounded-xl shadow-lg p-5"
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER */}
          <div className="flex justify-between mb-3">
            <h4 className="text-lg font-semibold">Review Project</h4>
            <button onClick={onClose} className="text-xl">×</button>
          </div>

          {/* BODY */}
          <div className="space-y-3">

            <p className="font-semibold">{application.title}</p>

            <select
              className="w-full border p-2 rounded"
              onChange={(e) => setDecision(e.target.value)}
            >
              <option value="">Select Decision</option>
              <option value="APPROVED">Approve</option>
              <option value="REJECTED">Reject</option>
            </select>

            {decision === "APPROVED" && (
              <input
                type="number"
                placeholder="Enter grant amount"
                className="w-full border p-2 rounded"
                onChange={(e) => setAmount(e.target.value)}
              />
            )}

            {decision === "REJECTED" && (
              <textarea
                placeholder="Enter rejection reason"
                className="w-full border p-2 rounded"
                onChange={(e) => setReason(e.target.value)}
              />
            )}
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>

            <button
              onClick={submitHandler}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              {decision === "APPROVED"
                ? "Pay & Approve 💳"
                : "Submit"}
            </button>
          </div>

        </div>
      </div>

      {/* PAYMENT */}
      {showPayment && (
        <PaymentModal
          amount={amount}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}