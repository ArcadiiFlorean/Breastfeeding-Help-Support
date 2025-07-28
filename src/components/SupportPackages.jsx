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
          gradient: "from-blue-500 to-indigo-600",
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
          gradient: "from-purple-500 to-pink-600",
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
          gradient: "from-orange-500 to-red-500",
          stats: "< 2h răspuns"
        },
      ]);
    }
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case "consultation":
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "premium":
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case "emergency":
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center mb-6 mx-auto">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#dc9071]"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-xl font-bold text-[#b06b4c] mb-2">Se încarcă pachetele...</h3>
          <p className="text-gray-600">Pregătim ofertele speciale pentru tine</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border border-red-100">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ups! Ceva nu a mers bine</h3>
            <p className="text-gray-600 mb-6 text-sm">{error}</p>
            <button
              onClick={fetchServices}
              className="w-full bg-gradient-to-r from-[#dc9071] to-[#b06b4c] hover:from-[#c87d5a] hover:to-[#9d5a3f] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
      className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#dc9071]/10 to-pink-200/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-200/10 to-amber-200/10 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-br from-rose-200/10 to-pink-300/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-200/5 to-orange-200/5 rounded-full animate-float-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Header Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-[#b06b4c] font-medium mb-6 shadow-lg">
            <span className="w-2 h-2 bg-[#dc9071] rounded-full mr-2 animate-pulse"></span>
            Pachete de consultanță specializată
          </div>
          
          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#b06b4c] mb-4 leading-tight">
            Pachete de
            <span className="relative inline-block mx-2">
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Suport
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
            </span>
            pentru Alăptare
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Alege soluția perfectă pentru călătoria ta de alăptare. Fiecare pachet este creat cu grijă pentru a-ți oferi sprijinul de care ai nevoie.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <span>500+ mame ajutate</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">★</span>
              </div>
              <span>Consultant certificat IBCLC</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">♥</span>
              </div>
              <span>Suport 24/7</span>
            </div>
          </div>
        </div>

        {/* Enhanced Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              data-aos="zoom-in-up"
              data-aos-delay={`${150 + index * 100}`}
              className={`relative group ${pkg.popular ? "lg:scale-105 lg:-mt-4" : ""}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
                    ⭐ Cel mai popular
                  </div>
                </div>
              )}

              {/* Enhanced Card */}
              <div className={`relative h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl transition-all duration-500 border-2 ${
                pkg.popular 
                  ? "border-purple-200 hover:border-purple-300" 
                  : "border-white/50 hover:border-orange-200/50"
              } overflow-hidden transform hover:-translate-y-3 group-hover:shadow-3xl`}>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-8">
                  {/* Enhanced Icon with Gradient */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${pkg.gradient || 'from-[#dc9071] to-[#b06b4c]'} rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {getIcon(pkg.icon)}
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute top-6 right-6 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {pkg.stats}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#b06b4c] mb-4 leading-tight group-hover:text-[#965a42] transition-colors duration-300">
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {pkg.description}
                  </p>

                  {/* Enhanced Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-[#b06b4c] mb-4 uppercase tracking-wide flex items-center">
                      <span className="w-2 h-2 bg-[#dc9071] rounded-full mr-2"></span>
                      Include:
                    </h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced Price Display */}
                  <div className="mb-8">
                    <div className={`relative bg-gradient-to-r ${pkg.gradient || 'from-[#dc9071] to-[#b06b4c]'} rounded-2xl p-6 text-white text-center shadow-lg`}>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">{pkg.price}</span>
                        <span className="text-xl ml-1">{pkg.currency}</span>
                      </div>
                      <p className="text-white/90 text-sm mt-1">per sesiune</p>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-2 right-2 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/10 rounded-full animate-bounce"></div>
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <button
                    onClick={() => handleSelectPackage(pkg.id, pkg.name, pkg.price, pkg.currency)}
                    className={`group/btn w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform shadow-xl hover:shadow-2xl ${
                      pkg.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        : "bg-white text-[#dc9071] border-2 border-[#dc9071] hover:bg-[#dc9071] hover:text-white"
                    } hover:-translate-y-1`}
                  >
                    <span className="flex items-center justify-center">
                      {pkg.popular ? "Alege Popularul ✨" : "Selectează Pachetul"}
                      <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="600">
          <div className="relative bg-gradient-to-r from-[#dc9071] to-[#b06b4c] rounded-3xl shadow-2xl p-8 lg:p-12 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ești gata să începi călătoria?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Nu ești sigură care pachet ți se potrivește? Programează o consultație gratuită de 15 minute pentru a discuta nevoile tale.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button 
                  onClick={handleFreeConsultation}
                  className="group bg-white text-[#dc9071] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center">
                    📞 Consultație Gratuită
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                
                <button 
                  onClick={handleSendMessage}
                  className="group border-2 border-white text-white hover:bg-white hover:text-[#dc9071] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="flex items-center">
                    💬 Trimite Mesaj
                    <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90 text-sm">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Certificare internațională
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  500+ mame ajutate
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Disponibil 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportPackages;