import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm({ amount = 2000 }) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardName, setCardName] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: cardName,
        address: zip ? { postal_code: zip } : {}, // trimite ZIP doar dacă e completat
      },
    });

    if (error) {
      alert("❌ " + error.message);
      return;
    }

    const res = await fetch(
      "http://localhost/Consultant-Land-Page/api/charge.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount,
        }),
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("✅ Plata a fost procesată!");
    } else {
      alert("❌ Eroare la plată: " + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700">
        Nume de pe card
      </label>
      <input
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        placeholder="ex: Maria Popescu"
        required
        className="border p-2 rounded w-full"
      />

      <label className="block text-sm font-medium text-gray-700">
        Cod poștal (opțional)
      </label>
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="ex: 123456"
        className="border p-2 rounded w-full"
      />

      <label className="block text-sm font-medium text-gray-700 mt-2">
        Detalii card
      </label>
      <CardElement
        options={{
          hidePostalCode: true, // 👈 ascundem ZIP-ul intern
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": { color: "#a0aec0" },
            },
            invalid: { color: "#e53e3e" },
          },
        }}
        className="border p-4 rounded"
      />

      <button
        type="submit" // 👈 OBLIGATORIU
        disabled={!stripe}
        className="bg-[#4a584b] text-white px-6 py-2 rounded hover:bg-[#3a4739] w-full"
      >
        Plătește
      </button>
    </form>
  );
}

export default CheckoutForm;
