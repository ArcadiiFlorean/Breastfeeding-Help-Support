import React from "react";
import HeaderCompact from "./Header/HeaderCompact"; // ajustează calea dacă ai alt folder

function Booking() {
  return (
    <>
      <HeaderCompact />

      <section className="py-12 bg-[#fff8f4] min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#cb8645] mb-6">
            Programează o consultanță
          </h1>

          <form
            action="https://nume-site.ro/process_booking.php"
            method="POST"
            className="space-y-4 bg-white p-6 rounded-xl shadow-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Nume complet"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon"
              className="w-full p-2 border rounded"
            />
            <select
              name="consult_type"
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Tip consultanță</option>
              <option value="Alăptare nou-născut">Alăptare nou-născut</option>
              <option value="Pompare și biberon">Pompare și biberon</option>
              <option value="Durere la alăptare">Durere la alăptare</option>
            </select>
            <input
              type="datetime-local"
              name="datetime"
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="payment_method"
              required
              className="w-full p-2 border rounded"
            >
              <option value="Card">Card</option>
              <option value="Transfer bancar">Transfer bancar</option>
              <option value="Cash">Cash</option>
            </select>
            <textarea
              name="notes"
              placeholder="Detalii suplimentare"
              className="w-full p-2 border rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-[#cb8645] hover:bg-[#a96c37] text-white px-4 py-2 rounded"
            >
              Trimite
            </button>
          </form>

          {/* Buton Stripe - sub formular */}
          <div className="mt-8 text-center">
            <p className="mb-2 text-gray-600">
              Dorești să achiți cu cardul online?
            </p>
            <a
              href="https://buy.stripe.com/test_abc1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Plătește cu cardul (Stripe)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Booking;
