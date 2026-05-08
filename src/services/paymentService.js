import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

export const makePayment = async (amount) => {
  const stripe = await stripePromise;

  // ✅ Fake session (UI only)
  alert(`Redirecting to payment of ₹${amount}`);

  // In real app → backend creates session
  await stripe.redirectToCheckout({
    lineItems: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: "Research Grant Funding" },
          unit_amount: amount * 100
        },
        quantity: 1
      }
    ],
    mode: "payment",
    successUrl: window.location.href,
    cancelUrl: window.location.href
  });
};