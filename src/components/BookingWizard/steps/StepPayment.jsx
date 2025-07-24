import React from "react";

function StepPayment({ formData, setFormData, prevStep }) {
  const handleChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Formular trimis:", formData);
    alert("Rezervarea a fost trimisă cu succes!");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#4a584b]">Plată</h2>

      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Selectează metoda de plată --</option>
        <option value="Card">Card</option>
        <option value="Transfer bancar">Transfer bancar</option>
        <option value="Cash">Cash</option>
      </select>

      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
          Înapoi
        </button>
        <button onClick={handleSubmit} className="bg-[#4a584b] text-white px-6 py-2 rounded hover:bg-[#3a4739]">
          Trimite
        </button>
      </div>
    </div>
  );
}

export default StepPayment;
