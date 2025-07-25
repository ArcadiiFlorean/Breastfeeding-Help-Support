import React, { useState } from "react";
import { User, Mail, Phone, AlertCircle, CheckCircle, Shield, ArrowLeft, ArrowRight } from "lucide-react";

function StepUserInfo({ formData, setFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Funcții de validare
  const validateField = (name, value) => {
    const validationErrors = {};

    switch (name) {
      case "firstName":
        if (!value || value.trim().length < 2) {
          validationErrors.firstName =
            "Prenumele trebuie să aibă cel puțin 2 caractere";
        } else if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(value)) {
          validationErrors.firstName = "Prenumele conține caractere nevalide";
        }
        break;

      case "lastName":
        if (!value || value.trim().length < 2) {
          validationErrors.lastName =
            "Numele trebuie să aibă cel puțin 2 caractere";
        } else if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(value)) {
          validationErrors.lastName = "Numele conține caractere nevalide";
        }
        break;

      case "email":
        if (!value) {
          validationErrors.email = "Email-ul este obligatoriu";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          validationErrors.email = "Formatul email-ului nu este valid";
        }
        break;

      case "phone":
        if (!value) {
          validationErrors.phone = "Telefonul este obligatoriu";
        } else {
          // Remove spaces, dashes, parentheses
          const cleanPhone = value.replace(/[\s\-\(\)]/g, "");

          // Validare internațională: începe opțional cu + și conține 8-20 cifre
          if (!/^\+?[0-9]{8,20}$/.test(cleanPhone)) {
            validationErrors.phone =
              "Numărul de telefon internațional nu este valid";
          }
        }
        break;

      default:
        break;
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizăm form data
    setFormData({ ...formData, [name]: value });

    // Validăm câmpul dacă a fost atins
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
        ...(Object.keys(fieldErrors).length === 0 && { [name]: undefined }),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Marcăm câmpul ca atins
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validăm câmpul
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      ...fieldErrors,
      ...(Object.keys(fieldErrors).length === 0 && { [name]: undefined }),
    }));
  };

  const validateAllFields = () => {
    const allErrors = {};
    const fields = ["firstName", "lastName", "email", "phone"];

    fields.forEach((field) => {
      const fieldErrors = validateField(field, formData[field] || "");
      Object.assign(allErrors, fieldErrors);
    });

    setErrors(allErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    });

    return Object.keys(allErrors).length === 0;
  };

  const handleNext = () => {
    if (validateAllFields()) {
      nextStep();
    }
  };

  // Helper pentru formatarea automată a telefonului
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.startsWith("40")) {
      // +40 format
      return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
    } else if (cleaned.startsWith("0")) {
      // 0xxx format
      return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{3})/, "$1$2 $3 $4");
    }

    return value;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);

    setFormData({ ...formData, phone: formatted });

    if (touched.phone) {
      const fieldErrors = validateField("phone", value);
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
        ...(Object.keys(fieldErrors).length === 0 && { phone: undefined }),
      }));
    }
  };

  // Check dacă un câmp este valid
  const isFieldValid = (fieldName) => {
    return touched[fieldName] && !errors[fieldName] && formData[fieldName];
  };

  const isFormValid = () => {
    return ["firstName", "lastName", "email", "phone"].every(
      (field) => formData[field] && !errors[field]
    );
  };

  const getFieldBorderClass = (fieldName) => {
    if (errors[fieldName]) {
      return "border-red-300 bg-red-50/30 focus:ring-red-100 focus:border-red-400";
    }
    if (isFieldValid(fieldName)) {
      return "border-emerald-300 bg-emerald-50/30 focus:ring-emerald-100 focus:border-emerald-400";
    }
    return "border-gray-200 bg-white/70 focus:ring-emerald-100 focus:border-emerald-400 hover:border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-3xl w-full border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
            Informațiile tale
          </h2>
          <p className="text-gray-600 text-lg">
            Completează datele pentru a finaliza rezervarea
          </p>
        </div>

        <div className="space-y-8">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prenume */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Prenume *
              </label>
              <div className="relative group">
                <input
                  name="firstName"
                  type="text"
                  placeholder="Prenumele tău"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-4 pr-12 py-4 border-2 rounded-xl text-lg transition-all duration-200 shadow-sm focus:shadow-md ${getFieldBorderClass("firstName")}`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {isFieldValid("firstName") && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {errors.firstName && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              {errors.firstName && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                  <p className="text-sm text-red-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.firstName}
                  </p>
                </div>
              )}
            </div>

            {/* Nume */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Nume *
              </label>
              <div className="relative group">
                <input
                  name="lastName"
                  type="text"
                  placeholder="Numele tău de familie"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-4 pr-12 py-4 border-2 rounded-xl text-lg transition-all duration-200 shadow-sm focus:shadow-md ${getFieldBorderClass("lastName")}`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {isFieldValid("lastName") && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {errors.lastName && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              {errors.lastName && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                  <p className="text-sm text-red-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.lastName}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-500" />
              Adresa de email *
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Mail className={`w-5 h-5 transition-colors duration-200 ${
                  isFieldValid("email") ? "text-emerald-500" : 
                  errors.email ? "text-red-500" : "text-gray-400"
                }`} />
              </div>
              <input
                name="email"
                type="email"
                placeholder="exemplu@email.com"
                value={formData.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg transition-all duration-200 shadow-sm focus:shadow-md ${getFieldBorderClass("email")}`}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {isFieldValid("email") && (
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                {errors.email && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
            {errors.email && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                <p className="text-sm text-red-700 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.email}
                </p>
              </div>
            )}
          </div>

          {/* Telefon */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-blue-500" />
              Număr de telefon *
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Phone className={`w-5 h-5 transition-colors duration-200 ${
                  isFieldValid("phone") ? "text-emerald-500" : 
                  errors.phone ? "text-red-500" : "text-gray-400"
                }`} />
              </div>
              <input
                name="phone"
                type="tel"
                placeholder="0712 345 678"
                value={formData.phone || ""}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg transition-all duration-200 shadow-sm focus:shadow-md ${getFieldBorderClass("phone")}`}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {isFieldValid("phone") && (
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                {errors.phone && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
            {errors.phone && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                <p className="text-sm text-red-700 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.phone}
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
              💡 Formatul acceptat: 0712345678, +40712345678
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">
                Protecția datelor personale
              </h3>
              <p className="text-sm text-blue-700">
                Informațiile tale vor fi folosite doar pentru procesarea rezervării 
                și nu vor fi partajate cu terți. Respectăm pe deplin GDPR.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={prevStep}
            className="group px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Înapoi la dată
          </button>

          <button
            onClick={handleNext}
            disabled={!isFormValid()}
            className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg ${
              isFormValid()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isFormValid() ? (
              <>
                Continuă la plată
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            ) : (
              "Completează toate câmpurile"
            )}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-3 mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="w-12 h-1 bg-emerald-500 mx-1"></div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div className="w-12 h-1 bg-gray-300 mx-1"></div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500 font-bold text-sm">3</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Pasul 2 din 3 - Informații personale
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepUserInfo;