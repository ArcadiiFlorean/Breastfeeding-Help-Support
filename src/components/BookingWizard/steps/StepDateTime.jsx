import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

function StepDateTime({ formData, setFormData, nextStep }) {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlotsByDate, setAvailableSlotsByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost/Consultant-Land-Page/admin/get_available_slots.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const grouped = {};
        data.slots.forEach((slot) => {
          const [date, time] = slot.datetime_combined.split("T");
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(time.slice(0, 5)); // HH:MM
        });

        setAvailableSlotsByDate(grouped);

        const uniqueDates = Object.keys(grouped).map((d) => new Date(d));
        setAvailableDates(uniqueDates);
        setError(null);
      } else {
        throw new Error(data.error || "Eroare necunoscută");
      }
    } catch (err) {
      console.error("Eroare la încărcarea sloturilor:", err);
      setError("Nu s-au putut încărca sloturile disponibile. Încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const handleDateChange = ([date]) => {
    if (!date) return;
    const slot_date = date.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    setFormData((prev) => ({
      ...prev,
      date: slot_date,
      time: "",
    }));
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setFormData((prev) => ({
      ...prev,
      time: selectedTime + ":00", // HH:MM:00
    }));
  };

  const verifySlotAvailability = async () => {
    if (!formData.date || !formData.time) return true;

    try {
      const response = await fetch(
        `http://localhost/Consultant-Land-Page/admin/check_slot_availability.php?date=${formData.date}&time=${formData.time}`
      );
      const data = await response.json();

      if (!data.available) {
        setError(
          "⚠️ Slotul selectat nu mai este disponibil. Vă rugăm să alegeți altul."
        );
        fetchAvailableSlots();
        return false;
      }

      return true;
    } catch (err) {
      console.warn("Nu s-a putut verifica disponibilitatea:", err);
      return true;
    }
  };

  const handleNext = async () => {
    if (!isValid) return;
    const isStillAvailable = await verifySlotAvailability();
    if (isStillAvailable) {
      nextStep();
    }
  };

  const isValid = formData.date && formData.time;

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#4a584b]">
        Selectează data și ora
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={fetchAvailableSlots}
            className="ml-2 underline hover:no-underline"
          >
            Reîncarcă
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-600">Se încarcă sloturile...</div>
      ) : availableDates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Nu sunt sloturi disponibile momentan.</p>
          <button
            onClick={fetchAvailableSlots}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reîncarcă
          </button>
        </div>
      ) : (
        <>
          {/* Selectare dată */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Alege data:
          </label>
          <Flatpickr
            options={{
              enable: availableDates,
              dateFormat: "Y-m-d",
              minDate: "today",
              defaultDate: formData.date || null,
              static: true,
              locale: { firstDayOfWeek: 1 },
            }}
            onChange={handleDateChange}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#4a584b] focus:border-transparent"
            placeholder="Selectează data"
          />

          {/* Selectare oră din sloturi disponibile pentru ziua aleasă */}
          {formData.date && (
            <>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Alege ora:
              </label>
              <select
                value={formData.time?.slice(0, 5) || ""}
                onChange={handleTimeChange}
                className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-[#4a584b] focus:border-transparent"
              >
                <option value="">-- alege ora disponibilă --</option>
                {(availableSlotsByDate[formData.date] || []).map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Afișare slot selectat */}
          {formData.date && formData.time && (
            <div className="bg-green-50 border border-green-200 p-3 rounded mb-4">
              <p className="text-green-800">
                <strong>Data si ora a fost selectata</strong> {formData.date} {formData.time}
              </p>
            </div>
          )}

          {!isValid && (
            <p className="text-red-600 text-sm mb-4">
              Selectează o dată și o oră disponibilă.
            </p>
          )}

          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`w-full px-6 py-3 rounded-lg text-white font-medium transition ${
              isValid
                ? "bg-[#4a584b] hover:bg-[#3a4739]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isValid ? "Continuă →" : "Selectează un slot"}
          </button>
        </>
      )}
    </div>
  );
}

export default StepDateTime;
