import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaQuoteRight,
  FaComments,
  FaEnvelope,
  FaCheckCircle,
  FaHeart,
  FaStar,
} from "react-icons/fa";

function SupportFeatures() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    {
      icon: <FaQuoteRight size={20} className="text-orange-500" />,
      title: "Ghidare blândă și profesionistă",
      desc: "Primești sprijin personalizat, oferit cu grijă și înțelegere, pentru fiecare etapă a alăptării.",
    },
    {
      icon: <FaComments size={20} className="text-orange-500" />,
      title: "Sfaturi actualizate și de încredere",
      desc: "Te simți în siguranță cu recomandări bazate pe cele mai noi cercetări, explicate clar și accesibil.",
    },
    {
      icon: <FaEnvelope size={20} className="text-orange-500" />,
      title: "Sprijin adaptat stilului tău",
      desc: "Alege ședințe față în față sau online—flexibilitate în funcție de viața și confortul tău.",
    },
    {
      icon: <FaCheckCircle size={20} className="text-orange-500" />,
      title: "Sprijin constant, pe termen lung",
      desc: "Rămânem în legătură prin monitorizări regulate și încurajare—ca să știi că ești ascultată.",
    },
    {
      icon: <FaHeart size={20} className="text-orange-500" />,
      title: "Primim fiecare familie cu căldură",
      desc: "Indiferent de stilul de parenting sau obiectivele tale, călătoria ta este respectată aici.",
    },
    {
      icon: <FaStar size={20} className="text-orange-500" />,
      title: "Spațiu calm și reconfortant",
      desc: "Relaxează-te într-un mediu liniștit, fără judecată, creat pentru a-ți oferi siguranță și confort.",
    },
  ];

  return (
    <section id="SupportFeatures" className="bg-[#D39473] py-12 sm:py-16 tablet:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 tablet:px-6 text-center">
        
        {/* Titlu principal - optimizat pentru mobile */}
        <h1
          data-aos="fade-down"
          className="
            text-2xl sm:text-3xl tablet:text-4xl laptop:text-5xl lg:text-6xl 
            font-extrabold text-white text-center leading-tight 
            max-w-4xl mx-auto mb-6 sm:mb-8 tablet:mb-10 
            px-2 sm:px-4 
            drop-shadow-[1px_2px_4px_rgba(0,0,0,0.5)] sm:drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]
          "
        >
          De ce să ceri ajutorul unui specialist în alăptare?
        </h1>

        {/* Subtitlu */}
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="
            text-base sm:text-lg tablet:text-xl lg:text-2xl 
            font-semibold text-gray-800 
            mb-8 sm:mb-10 tablet:mb-12
            px-2 sm:px-0
          "
        >
          Hrănește. Împuternicește. Începe cu încredere.
        </h2>

        {/* Grid cu features - responsive optimizat */}
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4 sm:gap-6 tablet:gap-8 lg:gap-10 
          text-left 
          px-2 sm:px-4 tablet:px-0
        ">
          {features.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={`${150 + index * 100}`}
              className="
                flex items-start gap-3 sm:gap-4 tablet:gap-5 
                bg-white rounded-lg sm:rounded-xl 
                p-4 sm:p-5 tablet:p-6 
                shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl 
                transition duration-300
                border border-orange-100 sm:border-none
              "
            >
              {/* Icon container - responsive */}
              <div className="
                bg-[#fbcbb2] 
                p-2 sm:p-3 tablet:p-4 
                rounded-lg sm:rounded-full 
                text-white 
                flex-shrink-0
                min-w-[40px] sm:min-w-[48px] tablet:min-w-[56px]
              ">
                <div className="flex items-center justify-center">
                  {React.cloneElement(item.icon, {
                    size: window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 18 : 20
                  })}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="
                  text-base sm:text-lg tablet:text-xl 
                  font-bold text-[#b06b4c] 
                  mb-1 sm:mb-2 
                  leading-tight
                ">
                  {item.title}
                </h4>
                <p className="
                  text-gray-700 
                  text-sm sm:text-base 
                  leading-relaxed
                ">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - optimizat pentru mobile */}
        <div
          className="mt-8 sm:mt-10 tablet:mt-12 flex justify-center px-2 sm:px-0"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <a
            href="#booking"
            className="
              bg-[#ffdcc9] hover:bg-[#f7b99b] 
              text-gray-800 font-semibold 
              text-base sm:text-lg 
              px-6 sm:px-8 
              py-3 sm:py-4 
              rounded-full 
              shadow-md hover:shadow-lg 
              transition duration-300
              w-full sm:w-auto
              max-w-xs sm:max-w-none
              text-center
              transform hover:scale-105
            "
          >
            Programează-te acum
          </a>
        </div>

        {/* Trust indicator pentru mobile */}
        <div 
          className="mt-6 sm:hidden flex items-center justify-center gap-2 text-white/80"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <FaStar size={12} className="text-yellow-300" />
          <span className="text-xs">Peste 100 de mame mulțumite</span>
          <FaStar size={12} className="text-yellow-300" />
        </div>
      </div>
    </section>
  );
}

export default SupportFeatures;