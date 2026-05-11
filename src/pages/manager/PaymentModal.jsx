import { useState } from "react";

export default function PaymentModal({ amount, onClose, onSuccess }) {

  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false); // used to show Processing...

  // Validation
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

  // MAIN PAYMENT HANDLER
  const handlePayment = () => {
    const cleanCard = card.replace(/\s/g, "");

    // CARD length check
    if (!/^\d{16}$/.test(cleanCard)) {
      alert("Card must be exactly 16 digits");
      return;
    }

    // EXPIRY
    if (!validateExpiry(expiry)) {
      alert("Expiry must be valid and not in past");
      return;
    }

    // CVV (strict 3 digits)
    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be exactly 3 digits");
      return;
    }

    setLoading(true);

    // FAKE SUCCESS
    setTimeout(() => {
      setLoading(false);
      alert("✅ Payment Successful!");

      onSuccess();
    }, 1500);
  };

  return (
  <>
    {/* BACKDROP */}
    <div
      className="fixed inset-0 bg-black/50 z-[9999]"
      onClick={onClose}
    />

    {/* CENTER MODAL */}
    <div className="fixed inset-0 flex items-center justify-center z-[10000]">

      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-5"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="flex justify-between mb-3">
          <h4 className="text-lg font-semibold">💳 Secure Payment</h4>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        {/* BODY */}
        <div className="space-y-3">

          <p className="font-semibold">Amount: ₹ {amount}</p>

          <input
            className="w-full border p-2 rounded"
            placeholder="Card Number"
            value={card}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "");
              val = val.slice(0, 16);
              val = val.replace(/(.{4})/g, "$1 ").trim();
              setCard(val);
            }}
          />

          <div className="flex gap-2">
            <input
              className="w-full border p-2 rounded"
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

            <input
              className="w-full border p-2 rounded"
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

        {/* FOOTER */}
        <div className="flex justify-end gap-2 mt-4">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-3 py-1 rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${amount}`}
          </button>

        </div>

      </div>
    </div>
  </>
);
}