import React, { useState } from "react";

function StepServiceSelection({ services, formData, updateSelectedService, nextStep }) {
  const [selectedServiceId, setSelectedServiceId] = useState(formData.serviceId || "");

  const handleServiceSelect = (service) => {
    setSelectedServiceId(service.id.toString());
    updateSelectedService(service);
  };

  const handleContinue = () => {
    if (!selectedServiceId) {
      alert("Vă rugăm să selectați un serviciu pentru a continua.");
      return;
    }
    nextStep();
  };

  const formatPrice = (price, currency = "GBP") => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatDuration = (minutes) => {
    if (minutes === 0) return "Plan personalizat";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Selectează serviciul dorit
        </h2>
        <p className="text-gray-600 mb-8">
          Alege din serviciile noastre disponibile cel care se potrivește nevoilor tale.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                selectedServiceId === service.id.toString()
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-200 hover:border-green-300 hover:shadow-sm"
              }`}
              onClick={() => handleServiceSelect(service)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={selectedServiceId === service.id.toString()}
                      onChange={() => handleServiceSelect(service)}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <h3 className="ml-3 text-xl font-semibold text-gray-800">
                      {service.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDuration(service.duration)}
                    </div>
                    {service.currency && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6h8z" />
                        </svg>
                        Plată securizată
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(service.price, service.currency || "GBP")}
                  </div>
                  {selectedServiceId === service.id.toString() && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Selectat
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nu sunt servicii disponibile
            </h3>
            <p className="text-gray-500">
              Momentan nu avem servicii disponibile pentru rezervare.
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mt-8 pt-6 border-gray-200">
          <div className="text-sm text-gray-500">
            Pasul 1 din 4
          </div>
          
          <button
            onClick={handleContinue}
            disabled={!selectedServiceId}
            className={`px-8 py-3 rounded-md font-semibold transition-all duration-200 ${
              selectedServiceId
                ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continuă cu programarea
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepServiceSelection;