import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import StepDateTime from "./steps/StepDateTime";
import StepUserInfo from "./steps/StepUserInfo";
import StepPayment from "./steps/StepPayment";
import StepServiceSelection from "./steps/StepServiceSelection";

function BookingWizard() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    serviceId: "",
    serviceName: "",
    servicePrice: 0,
    serviceDuration: 0,
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });

  // Preia serviciile disponibile la încărcarea componentei
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1/Consultant-Land-Page/api/services.php");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
        setError("");
      } else {
        setError(data.message || "Eroare la încărcarea serviciilor");
      }
    } catch (err) {
      console.error("Eroare la preluarea serviciilor:", err);
      setError("Nu s-au putut încărca serviciile disponibile");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Actualizează datele serviciului selectat
  const updateSelectedService = (service) => {
    setFormData(prev => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: parseFloat(service.price),
      serviceDuration: parseInt(service.duration),
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă serviciile disponibile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Eroare</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Încearcă din nou
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar step={step} />

      <div className="flex-1 p-6">
        {step === 1 && (
          <StepServiceSelection
            services={services}
            formData={formData}
            setFormData={setFormData}
            updateSelectedService={updateSelectedService}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepDateTime
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <StepUserInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <StepPayment
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
          />
        )}
      </div>
    </div>
  );
}

export default BookingWizard;