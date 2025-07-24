import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

function StepDateTime({ formData, setFormData, nextStep }) {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
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
        const slotList = data.slots.map((slot) => {
          return new Date(slot.datetime_combined);
        });

        console.log("📅 Sloturi disponibile:", slotList);
        setAvailableDates(slotList);
        setError(null);
      } else {
        throw new Error(data.error || "Eroare necunoscută");
      }
    } catch (err) {
      console.error("Eroare la încărcarea sloturilor:", err);
      setError(
        "Nu s-au putut încărca sloturile disponibile. Încercați din nou."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const handleChange = ([date]) => {
    if (!date) return;

    const slot_date = date.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    const time = date.toTimeString().slice(0, 5) + ":00"; // HH:MM:00

    console.log("📅 Slot selectat:", { slot_date, time });

    setSelectedDateTime(date);
    setFormData({ ...formData, date: slot_date, time });
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

  if (loading) {
    return (
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            Se încarcă sloturile disponibile...
          </p>
        </div>
      </div>
    );
  }

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

      {availableDates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Nu sunt sloturi disponibile momentan.
          </p>
          <button
            onClick={fetchAvailableSlots}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reîncarcă
          </button>
        </div>
      ) : (
        <>
          <Flatpickr
            options={{
              mode: "single", // opțional dar recomandat
              enable: availableDates,
              enableTime: true,
              closeOnSelect: false, // <<--- aceasta e cheia!
              dateFormat: "Y-m-d H:i",
              time_24hr: true,
              defaultDate:
                formData.date && formData.time
                  ? new Date(`${formData.date}T${formData.time}`)
                  : availableDates[0] || null,
              minDate: "today",
              minuteIncrement: 30,
              static: true,
              locale: {
                firstDayOfWeek: 1,
                weekdays: {
                  shorthand: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                  longhand: [
                    "Duminică",
                    "Luni",
                    "Marți",
                    "Miercuri",
                    "Joi",
                    "Vineri",
                    "Sâmbătă",
                  ],
                },
                months: {
                  shorthand: [
                    "Ian",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mai",
                    "Iun",
                    "Iul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Noi",
                    "Dec",
                  ],
                  longhand: [
                    "Ianuarie",
                    "Februarie",
                    "Martie",
                    "Aprilie",
                    "Mai",
                    "Iunie",
                    "Iulie",
                    "August",
                    "Septembrie",
                    "Octombrie",
                    "Noiembrie",
                    "Decembrie",
                  ],
                },
              },
            }}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#4a584b] focus:border-transparent"
            placeholder="Alegeți data și ora..."
          />

          {selectedDateTime && (
            <div className="bg-green-50 border border-green-200 p-3 rounded mb-4">
              <p className="text-green-800">
                <strong>Slot selectat:</strong>{" "}
                {selectedDateTime.toLocaleString("ro-RO")}
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
