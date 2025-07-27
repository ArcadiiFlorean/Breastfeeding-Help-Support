import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeaderSocials from "./Header/HeaderSocial";

function AboutMe() {

useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      id="AboutMe"
      className="bg-[#fff8f4] px-3 sm:px-4 phone:px-6 relative overflow-visible py-12 sm:py-16 tablet:py-20"
    >
      {/* Container principal */}
      <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 items-start">
        
        {/* TITLU – optimizat pentru mobile */}
        <div data-aos="fade-down" className="col-span-full">
          <h2 
            className="
              text-center tablet:text-left
              text-3xl sm:text-4xl phone:text-5xl tabletSm:text-6xl tablet:text-7xl
              font-cantata text-[#9f6032] z-10
              mb-6 sm:mb-8 tablet:mb-8
              px-2 sm:px-0
            "
          >
            Despre mine
          </h2>
        </div>

        {/* Imaginea consultantului - optimizată pentru mobile */}
        <div data-aos="fade-right" className="flex justify-center lg:justify-start relative z-10 order-1 lg:order-1">
          <div className="relative">
            <img
              src="/Hero_img_2.jpg"
              alt="Consultant în alăptare"
              className="
                w-full max-w-[280px] sm:max-w-[320px] phone:max-w-[400px] 
                tabletSm:max-w-[450px] tablet:max-w-[500px] 
                h-auto rounded-xl shadow-2xl object-cover
                transition-transform duration-300 hover:scale-105
              "
            />
            {/* Decorative element pentru mobile */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#9f6032] rounded-full opacity-20 animate-pulse sm:hidden"></div>
            <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-amber-400 rounded-full opacity-30 animate-pulse sm:hidden"></div>
          </div>
        </div>

        {/* Textul descriptiv - optimizat pentru mobile */}
        <div className="order-2 lg:order-2">
          <div 
            data-aos="fade-left" 
            className="
              shadow-lg sm:shadow-2xl shadow-black/20 sm:shadow-black/30 
              p-4 sm:p-6 phone:p-8 
              space-y-4 sm:space-y-6 
              w-full max-w-[1200px] 
              h-auto tablet:h-auto lg:h-[550px] 
              overflow-y-auto 
              mx-auto 
              rounded-lg sm:rounded-xl 
              bg-white
              border border-orange-100 sm:border-none
            "
          >
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-1 text-[#9f6032]">
                Drumul meu către consultanța în alăptare
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Drumul meu către a deveni consultant în alăptare a început cu propria mea experiență de mamă. Alăptarea a fost mai dificilă decât mă așteptam, iar sprijinul pe care l-am primit a schimbat totul. Acel moment m-a inspirat să ajut și alte persoane să-și parcurgă această călătorie cu empatie, cunoștințe și sprijin practic la fiecare pas.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-1 text-[#9f6032]">
                Filosofia și abordarea mea
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Cred că fiecare călătorie în alăptare este unică. Abordarea mea se bazează pe îngrijire bazată pe dovezi, compasiune și pe întâlnirea familiilor exact acolo unde se află. Fie că te confrunți cu provocări sau cauți încredere, sunt aici să te susțin fără judecăți și să te ajut să iei decizii informate și sigure pentru tine și bebelușul tău.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-1 text-[#9f6032]">
                Certificări și formare
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Sunt consultant internațional certificat în lactație (IBCLC), formată în cele mai noi științe despre alăptare și îngrijirea sugarilor. Experiența mea include ore de practică clinică, educație continuă și sprijin oferit familiilor diverse. Sunt dedicată învățării continue și oferirii unui sprijin competent și de încredere.
              </p>
            </div>

            {/* Quote inspirațional pentru mobile */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-3 sm:p-4 rounded-lg border-l-4 border-[#9f6032] sm:hidden">
              <p className="text-xs text-gray-600 italic text-center">
                "Fiecare mamă merită să se simtă susținută și încurajată în călătoria ei de alăptare."
              </p>
            </div>
          </div>

          {/* Rețele sociale - optimizate pentru mobile */}
          <div className="mt-6 sm:mt-8 tablet:mt-12 flex justify-center lg:justify-start">
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 tablet:bg-transparent tablet:shadow-none tablet:p-0">
              <HeaderSocials />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements pentru mobile */}
      <div className="absolute top-10 left-5 w-8 h-8 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 animate-bounce sm:hidden"></div>
      <div className="absolute bottom-20 right-5 w-6 h-6 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-30 animate-pulse sm:hidden"></div>
    </section>
  );
}

export default AboutMe;