import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function SupportPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchServices();
  }, []);

  // Funcție pentru redirectionare la booking system
  const handleSelectPackage = (packageId, packageName, packagePrice, packageCurrency) => {
    // Construiește URL-ul către BookingWizard cu parametrii serviciului
    const bookingUrl = `/BookingWizard?service=${packageId}&name=${encodeURIComponent(packageName)}&price=${packagePrice}&currency=${packageCurrency}`;
    
    console.log('Redirecting to booking with:', {
      id: packageId,
      name: packageName,
      price: packagePrice,
      currency: packageCurrency,
      url: bookingUrl
    });
    
    // Redirectionează la sistemul de booking
    window.location.href = bookingUrl;
  };

  // Funcție pentru consultația gratuită
  const handleFreeConsultation = () => {
    const consultationUrl = `/BookingWizard?service=free&name=${encodeURIComponent('Free 15-minute Consultation')}&price=0&currency=GBP`;
    window.location.href = consultationUrl;
  };

  // Funcție pentru trimiterea de mesaj
  const handleSendMessage = () => {
    // Poți adăuga aici logica pentru contact form sau WhatsApp
    window.location.href = 'mailto:your-email@example.com?subject=Breastfeeding Consultation Inquiry';
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // URL-ul corect către API
      const response = await fetch(
        "http://localhost/Consultant-Land-Page/api/services.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Services received:", result); // Debug

      if (result.success) {
        setPackages(result.data);
      } else {
        throw new Error(result.message || "Error loading services");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError(`Could not load services: ${error.message}`);
      setLoading(false);

      // Fallback la servicii statice în caz de eroare
      setPackages([
        {
          id: 1,
          name: "Consultație Inițială",
          description: "Prima întâlnire pentru evaluarea nevoilor tale și stabilirea unui plan personalizat de alăptare.",
          price: "150",
          currency: "RON",
          popular: false,
          features: [
            "Evaluare completă",
            "Plan personalizat",
            "Ghid digital",
            "Suport 24h"
          ],
          icon: "consultation",
          color: "orange",
          stats: "90 min"
        },
        {
          id: 2,
          name: "Pachet Complet de Îngrijire",
          description: "Suport complet pentru întreaga ta călătorie de alăptare cu sesiuni multiple și monitorizare continuă.",
          price: "450",
          currency: "RON",
          popular: true,
          features: [
            "5 sesiuni incluse",
            "Monitorizare continuă",
            "Plan nutrițional",
            "Comunitate privată",
            "Urgențe 24/7"
          ],
          icon: "premium",
          color: "red",
          stats: "6 luni suport"
        },
        {
          id: 3,
          name: "Sesiune de Urgență",
          description: "Suport rapid pentru situații urgente de alăptare disponibil oricând.",
          price: "200",
          currency: "RON",
          popular: false,
          features: [
            "Răspuns rapid",
            "Consultație imediată",
            "Plan de acțiune",
            "Follow-up gratuit"
          ],
          icon: "emergency",
          color: "amber",
          stats: "< 2h răspuns"
        },
      ]);
    }
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case "consultation":
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "premium":
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case "emergency":
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "orange":
        return {
          icon: "bg-orange-500",
          badge: "bg-orange-100 text-orange-700 border-orange-200",
          button: "bg-orange-500 hover:bg-orange-600",
          border: "border-orange-200"
        };
      case "red":
        return {
          icon: "bg-red-500",
          badge: "bg-red-100 text-red-700 border-red-200",
          button: "bg-red-500 hover:bg-red-600",
          border: "border-red-200"
        };
      case "amber":
        return {
          icon: "bg-amber-500",
          badge: "bg-amber-100 text-amber-700 border-amber-200",
          button: "bg-amber-500 hover:bg-amber-600",
          border: "border-amber-200"
        };
      default:
        return {
          icon: "bg-orange-500",
          badge: "bg-orange-100 text-orange-700 border-orange-200",
          button: "bg-orange-500 hover:bg-orange-600",
          border: "border-orange-200"
        };
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-orange-50 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h3 className="text-xl font-semibold text-orange-800 mb-2">Se încarcă pachetele...</h3>
          <p className="text-orange-600">Pregătim ofertele speciale pentru tine</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-orange-50 py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-red-200">
            <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ups! Ceva nu a mers bine</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchServices}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="SupportPackages"
      className="min-h-screen bg-orange-50 py-20 sm:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-200">
            Pachete de consultanță specializată
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-900 mb-6">
            Pachete de Suport pentru Alăptare
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Alege soluția perfectă pentru călătoria ta de alăptare. Fiecare pachet este creat cu grijă pentru a-ți oferi sprijinul de care ai nevoie.
          </p>

          {/* Simple Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-700">
            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-orange-100">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-sm">✓</span>
              </div>
              <span className="font-medium">500+ mame ajutate</span>
            </div>
            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-orange-100">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-sm">★</span>
              </div>
              <span className="font-medium">Consultant certificat IBCLC</span>
            </div>
            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-orange-100">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-sm">♥</span>
              </div>
              <span className="font-medium">Suport 24/7</span>
            </div>
          </div>
        </div>

        {/* Simple Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => {
            const colors = getColorClasses(pkg.color);
            return (
              <div
                key={pkg.id}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
                className={`relative ${pkg.popular ? "lg:scale-105" : ""}`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      ⭐ Cel mai popular
                    </div>
                  </div>
                )}

                {/* Simple Card */}
                <div className={`bg-white rounded-2xl shadow-lg border-2 ${pkg.popular ? colors.border : "border-gray-100"} overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300`}>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Simple Icon */}
                    <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center mb-6`}>
                      {getIcon(pkg.icon)}
                    </div>

                    {/* Stats Badge */}
                    <div className={`absolute top-6 right-6 ${colors.badge} px-3 py-1 rounded-full text-xs font-medium border`}>
                      {pkg.stats}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {pkg.name}
                    </h3>

                    {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed max-w-full break-words">
  {pkg.description}
</p>

                    {/* Features */}
                    <div className="mb-8 flex-grow">
                      <h4 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                        Include:
                      </h4>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Simple Price */}
                    <div className="mb-6">
                      <div className="bg-gray-900 rounded-2xl p-6 text-center">
                        <div className="flex items-baseline justify-center mb-2">
                          <span className="text-4xl font-bold text-white">{pkg.price}</span>
                          <span className="text-lg ml-2 text-orange-300 font-semibold">{pkg.currency}</span>
                        </div>
                        <p className="text-gray-300 text-sm">per sesiune</p>
                      </div>
                    </div>

                    {/* Simple Button */}
                    <button
                      onClick={() => handleSelectPackage(pkg.id, pkg.name, pkg.price, pkg.currency)}
                      className={`w-full ${colors.button} text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 hover:transform hover:-translate-y-1`}
                    >
                      {pkg.popular ? "Alege Popularul" : "Selectează Pachetul"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple Bottom CTA */}
        <div className="text-center" data-aos="fade-up">
          <div className="bg-orange-500 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ești gata să începi călătoria?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Nu ești sigură care pachet ți se potrivește? Programează o consultație gratuită de 15 minute pentru a discuta nevoile tale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={handleFreeConsultation}
                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                📞 Consultație Gratuită
              </button>
              
              <button 
                onClick={handleSendMessage}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                💬 Trimite Mesaj
              </button>
            </div>

            {/* Simple Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white opacity-90">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Certificare internațională</span>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>500+ mame ajutate</span>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Disponibil 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportPackages;