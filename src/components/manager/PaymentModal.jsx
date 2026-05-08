import { useState } from "react";

export default function PaymentModal({ amount, onClose, onSuccess }) {

  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Expiry validation (MM/YY + future only)
  const validateExpiry = (exp) => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;

    const [month, year] = exp.split("/").map(Number);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  // ✅ MAIN PAYMENT HANDLER
  const handlePayment = () => {
    const cleanCard = card.replace(/\s/g, "");

    // ✅ CARD: only length check (your rule)
    if (!/^\d{16}$/.test(cleanCard)) {
      alert("Card must be exactly 16 digits");
      return;
    }

    // ✅ EXPIRY
    if (!validateExpiry(expiry)) {
      alert("Expiry must be valid and not in past");
      return;
    }

    // ✅ CVV (strict 3 digits)
    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be exactly 3 digits");
      return;
    }

    setLoading(true);

    // ✅ FAKE SUCCESS
    setTimeout(() => {
      setLoading(false);
      alert("✅ Payment Successful!");

      onSuccess();
    }, 1500);
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content shadow">

          <div className="modal-header">
            <h5>💳 Secure Payment</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <p className="fw-bold">Amount: ₹ {amount}</p>

            {/* ✅ CARD NUMBER */}
            <input
              className="form-control mb-2"
              placeholder="Card Number"
              value={card}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                val = val.slice(0, 16);
                val = val.replace(/(.{4})/g, "$1 ").trim();
                setCard(val);
              }}
            />

            <div className="d-flex gap-2">

              {/* ✅ EXPIRY (auto slash) */}
              <input
                className="form-control"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "");

                  if (val.length >= 3) {
                    val = val.slice(0, 2) + "/" + val.slice(2, 4);
                  }

                  setExpiry(val);
                }}
                maxLength={5}
              />

              {/* ✅ CVV */}
              <input
                className="form-control"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 3) setCvv(val);
                }}
                maxLength={3}
              />

            </div>

          </div>

          <div className="modal-footer">

            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-success"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${amount}`}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}