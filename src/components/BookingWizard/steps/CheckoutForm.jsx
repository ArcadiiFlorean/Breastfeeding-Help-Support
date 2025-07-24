import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

/**
 * Renders a Stripe checkout form for processing payments.
 * @param {object} props - The component props.
 * @param {number} [props.amount=2000] - The amount to charge in cents (e.g., 2000 for $20.00).
 */
function CheckoutForm({ amount = 2000 }) {
  const stripe = useStripe();
  const elements = useElements();

  // State for cardholder name and postal code
  const [cardName, setCardName] = useState("");
  const [zip, setZip] = useState("");
  // State for loading and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * Handles the form submission for payment processing.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setIsLoading(true); // Set loading state

    console.log("➡️ handleSubmit a fost apelat");

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a PaymentMethod with Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardName,
        address: zip ? { postal_code: zip } : {}, // Only include postal_code if zip is provided
      },
    });

    if (error) {
      setMessage("❌ " + error.message);
      setIsLoading(false);
      return;
    }

    // Replace the fetch block in your handleSubmit function with this:

    try {
      console.log("🚀 Sending request to server...");

      // Send the paymentMethodId to your backend
      const res = await fetch(
        "http://127.0.0.1/Consultant-Land-Page/api/charge.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount,
          }),
        }
      );

      console.log("📡 Response status:", res.status);
      console.log("📡 Response headers:", res.headers);

      // Check if the response is OK before parsing JSON
      if (!res.ok) {
        console.error("❌ HTTP Error:", res.status, res.statusText);

        // Try to get error text from response
        const errorText = await res.text();
        console.error("❌ Error response body:", errorText);

        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ Server response:", data);

      if (data.success) {
        setMessage("✅ Plata a fost procesată!");
        // Optionally, clear form fields or redirect
        setCardName("");
        setZip("");
        cardElement.clear(); // Clear the card input field
      } else {
        setMessage(
          "❌ Eroare la plată: " +
            (data.message || "A apărut o eroare necunoscută.")
        );
      }
    } catch (fetchError) {
      // Catch network errors or errors thrown from the res.ok check
      console.error("🚨 Fetch error details:", fetchError);

      if (
        fetchError.name === "TypeError" &&
        fetchError.message.includes("fetch")
      ) {
        setMessage(
          "❌ Eroare de conectare: Nu se poate conecta la server. Verifică dacă serverul rulează."
        );
      } else {
        setMessage("❌ Eroare la plată: " + fetchError.message);
      }
    } finally {
      setIsLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Completează Detaliile de Plată
      </h2>

      {/* Cardholder Name Input */}
      <div>
        <label
          htmlFor="card-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nume de pe card
        </label>
        <input
          id="card-name"
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="ex: Maria Popescu"
          required
          className="border border-gray-300 p-2 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Postal Code Input (Optional) */}
      <div>
        <label
          htmlFor="zip-code"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cod poștal (opțional)
        </label>
        <input
          id="zip-code"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ex: 123456"
          className="border border-gray-300 p-2 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Stripe CardElement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Detalii card
        </label>
        <CardElement
          options={{
            hidePostalCode: true, // You explicitly set this, so I kept it.
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
          className="border border-gray-300 p-3 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Submission Button */}
      <button
        type="submit"
        disabled={!stripe || isLoading} // Disable button if Stripe not loaded or submission in progress
        className={`w-full px-6 py-2 rounded-md text-white font-semibold transition duration-200 ease-in-out
          ${
            !stripe || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#4a584b] hover:bg-[#3a4739]"
          }
        `}
      >
        {isLoading ? "Se procesează..." : "Plătește"}
      </button>

      {/* Display Messages (Success/Error) */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm font-medium ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
