import React from "react";
import CheckoutForm from "./CheckoutForm";

function StepPayment({ prevStep }) {
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#4a584b]">Plată cu cardul</h2>

      <CheckoutForm />

      <div className="mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Înapoi
        </button>
      </div>
    </div>
  );
}

export default StepPayment;
