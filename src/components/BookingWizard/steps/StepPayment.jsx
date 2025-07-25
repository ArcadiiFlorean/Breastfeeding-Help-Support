import React from "react";
import CheckoutForm from "./CheckoutForm";
import { CreditCard, Calendar, Clock, User, Shield, ArrowLeft, CheckCircle } from "lucide-react";

function StepPayment({ formData, setFormData, prevStep }) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">
            Finalizează plata
          </h2>
          <p className="text-center text-purple-100 text-lg">
            Ultimul pas pentru confirmarea rezervării tale
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Rezumatul rezervării
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Service */}
                  <div className="flex items-start p-4 bg-white/60 rounded-xl border border-purple-100">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Serviciu selectat</p>
                      <p className="font-semibold text-gray-800 text-lg">
                        {formData.serviceName}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start p-4 bg-white/60 rounded-xl border border-purple-100">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Data</p>
                        <p className="font-semibold text-gray-800">
                          {formatDateDisplay(formData.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-white/60 rounded-xl border border-purple-100">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ora</p>
                        <p className="font-semibold text-gray-800">
                          {formData.hour}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-start p-4 bg-white/60 rounded-xl border border-purple-100">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Client</p>
                      <p className="font-semibold text-gray-800 text-lg">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formData.email} • {formData.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-green-600 mb-1">Total de plată</p>
                      <p className="text-3xl font-bold text-green-700">
                        {formData.servicePrice} £
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">
                      Plată securizată
                    </h4>
                    <p className="text-sm text-blue-700">
                      Datele tale sunt protejate prin criptare SSL. Nu stocăm informații 
                      despre cardul tău bancar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Detalii plată
                  </h3>
                </div>

                <CheckoutForm 
                  amount={Math.round(formData.servicePrice * 100)} // Convert to cents
                  formData={formData}
                />
              </div>

              {/* Payment Methods */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Metode de plată acceptate:
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    💳 Visa
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    💳 Mastercard
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    🏦 Maestro
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    💰 American Express
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={prevStep}
              className="group px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Înapoi la informații
            </button>

            {/* Progress Indicator */}
            <div className="text-center">
              <div className="flex justify-center items-center space-x-3 mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-12 h-1 bg-emerald-500 mx-1"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-1"></div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Pasul 3 din 3 - Plată securizată
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-600 mr-2">⚡</span>
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Confirmare instantanee:</span> 
                Vei primi confirmarea pe email imediat după plată
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepPayment;