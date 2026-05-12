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

      // ✅ OPEN PAYMENT MODAL
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

  // ✅ AFTER PAYMENT SUCCESS
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    onSubmit("APPROVED", "", amount);
  };

  return (
    <>
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Review Project</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">

              <p className="fw-bold">{application.title}</p>

              <select
                className="form-select mb-3"
                onChange={(e) => setDecision(e.target.value)}
              >
                <option value="">Select Decision</option>
                <option value="APPROVED">Approve</option>
                <option value="REJECTED">Reject</option>
              </select>

              {decision === "APPROVED" && (
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Enter grant amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              )}

              {decision === "REJECTED" && (
                <textarea
                  className="form-control"
                  placeholder="Enter rejection reason"
                  onChange={(e) => setReason(e.target.value)}
                />
              )}

            </div>

            <div className="modal-footer">

              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={submitHandler}
              >
                {decision === "APPROVED"
                  ? "Pay & Approve 💳"
                  : "Submit Decision"}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* ✅ PAYMENT POPUP */}
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