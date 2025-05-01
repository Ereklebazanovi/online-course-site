// src/components/CheckoutForm.tsx
import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

interface Props {
  courseId: string;
  amount: number;
}

const CheckoutForm: React.FC<Props> = ({ courseId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // ❗ Replace this with your own backend call to create a payment intent
    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, courseId }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      alert('Payment successful!');
      // Optional: Mark course as purchased in Firestore
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded" disabled={!stripe}>
        Pay ${amount.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;
