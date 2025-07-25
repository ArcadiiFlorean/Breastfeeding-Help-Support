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
      hour: "",
    }));
  };

  const handleTimeChange = (selectedTime) => {
    setFormData((prev) => ({
      ...prev,
      hour: selectedTime,
    }));
  };

  const verifySlotAvailability = async () => {
    if (!formData.date || !formData.hour) return true;

    try {
      const timeWithSeconds = formData.hour.includes(':00') ? formData.hour : formData.hour + ':00';
      const response = await fetch(
        `http://localhost/Consultant-Land-Page/admin/check_slot_availability.php?date=${formData.date}&time=${timeWithSeconds}`
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

  const isValid = formData.date && formData.hour;

  // Format date for display
  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ro-RO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-2">
            Selectează data și ora
          </h2>
          <p className="text-gray-600">Alege un moment potrivit pentru consultația ta</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg mb-6 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={fetchAvailableSlots}
              className="mt-2 text-sm underline hover:no-underline text-red-700 font-medium"
            >
              Reîncarcă sloturile
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Se încarcă sloturile disponibile...</p>
          </div>
        ) : availableDates.length === 0 ? (
          /* No Slots Available */
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg mb-6">Nu sunt sloturi disponibile momentan.</p>
            <button
              onClick={fetchAvailableSlots}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reîncarcă
            </button>
          </div>
        ) : (
          /* Main Content */
          <div className="space-y-8">
            {/* Date Selection */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Alege data
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
                className="w-full border-2 border-gray-200 p-4 rounded-xl text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm shadow-sm"
                placeholder="Selectează data dorită"
              />
            </div>

            {/* Time Selection */}
            {formData.date && (
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-800 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Alege ora
                </label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                  {(availableSlotsByDate[formData.date] || []).map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeChange(time)}
                      className={`p-3 rounded-lg border-2 text-center font-medium transition-all duration-200 transform hover:-translate-y-0.5 ${
                        formData.hour === time
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-500 shadow-lg'
                          : 'bg-white/70 border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 shadow-sm'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Slot Display */}
            {formData.date && formData.hour && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-1">
                      Programarea ta este confirmată
                    </h3>
                    <p className="text-emerald-700">
                      <span className="font-medium">{formatDateDisplay(formData.date)}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">ora {formData.hour}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Message */}
            {!isValid && formData.date && (
              <div className="text-center">
                <p className="text-amber-600 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Te rugăm să selectezi și o oră disponibilă
                </p>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleNext}
              disabled={!isValid}
              className={`w-full px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform ${
                isValid
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isValid ? (
                <span className="flex items-center justify-center">
                  Continuă
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              ) : (
                "Selectează un slot pentru a continua"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepDateTime;