import React, { useState } from "react";
import Sidebar from "./Sidebar";
import StepDateTime from "./steps/StepDateTime";
import StepUserInfo from "./steps/StepUserInfo";
import StepPayment from "./steps/StepPayment";

function BookingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar step={step} />

      <div className="flex-1 p-6">
        {step === 1 && (
          <StepDateTime
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepUserInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
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
