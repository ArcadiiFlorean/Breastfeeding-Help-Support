import React, { useState } from "react";
import { User, Mail, Phone, AlertCircle, CheckCircle } from "lucide-react";

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

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Informațiile tale
        </h2>
        <p className="text-gray-600">
          Completează datele pentru a finaliza rezervarea
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prenume */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prenume *
            </label>
            <div className="relative">
              <input
                name="firstName"
                type="text"
                placeholder="Prenumele tău"
                value={formData.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-4 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.firstName
                    ? "border-red-300 bg-red-50"
                    : isFieldValid("firstName")
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300"
                }`}
              />
              {isFieldValid("firstName") && (
                <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
              )}
              {errors.firstName && (
                <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Nume */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nume *
            </label>
            <div className="relative">
              <input
                name="lastName"
                type="text"
                placeholder="Numele tău de familie"
                value={formData.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-4 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.lastName
                    ? "border-red-300 bg-red-50"
                    : isFieldValid("lastName")
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300"
                }`}
              />
              {isFieldValid("lastName") && (
                <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
              )}
              {errors.lastName && (
                <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresa de email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="exemplu@email.com"
              value={formData.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : isFieldValid("email")
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300"
              }`}
            />
            {isFieldValid("email") && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
            )}
            {errors.email && (
              <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Telefon */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Număr de telefon *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="phone"
              type="tel"
              placeholder="0712 345 678"
              value={formData.phone || ""}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.phone
                  ? "border-red-300 bg-red-50"
                  : isFieldValid("phone")
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300"
              }`}
            />
            {isFieldValid("phone") && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
            )}
            {errors.phone && (
              <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Formatul acceptat: 0712345678, +40712345678
          </p>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Confidențialitate:</span> Informațiile
          tale vor fi folosite doar pentru procesarea rezervării și nu vor fi
          partajate cu terți.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          ← Înapoi la dată
        </button>

        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`px-8 py-3 rounded-lg font-medium transition ${
            isFormValid()
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isFormValid()
            ? "Continuă la plată →"
            : "Completează toate câmpurile"}
        </button>
      </div>

      {/* Form progress indicator */}
      <div className="mt-6 text-center">
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Pasul 2 din 3</p>
      </div>
    </div>
  );
}

export default StepUserInfo;
