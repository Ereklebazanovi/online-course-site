// // src/components/course/CheckoutForm.tsx
// import { FC, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createCheckoutSession } from "../../services/stripe";

// interface Props { courseId: string; amount: number; }

// const CheckoutForm: FC<Props> = ({ courseId, amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setLoading(true);
//     // Hit your backend/Cloud Function to create a Stripe Checkout session
//     const session = await createCheckoutSession(courseId, amount);
//     // Redirect to hosted Stripe checkout
//     await stripe.redirectToCheckout({ sessionId: session.id });
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement options={{ hidePostalCode: true }} />
//       <button
//         type="submit"
//         disabled={loading || !stripe}
//         className="w-full bg-indigo-600 text-white py-2 rounded disabled:opacity-50"
//       >
//         {loading ? "Redirecting…" : `Pay $${amount.toFixed(2)}`}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;
