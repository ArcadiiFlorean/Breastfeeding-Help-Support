import React, { useEffect } from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import OutlineButton from "./Buttons/OutlineButton";
import HeroIgenerateimg from "/HeroIgenerateimg.png";
import AOS from "aos";
import "aos/dist/aos.css";

function Hero() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      id="page-0"
      className="relative bg-[#fef6f2] bg-contain bg-no-repeat bg-top tablet:bg-none overflow-hidden min-h-screen flex items-center"
    >
      {/* FUNDAL FLORI JOS */}
      <img
        src="/flowers-bg.jpg"
        alt="Fundal flori"
        className="tablet:block absolute tablet:bottom-[150px] laptop:bottom-[150px] lg:bottom-[186px] left-1/2 -translate-x-1/2 w-full max-w-[1500px] h-auto tablet:max-h-[180px] laptop:max-h-[280px] lg:max-h-[350px] object-cover object-bottom z-0 opacity-30"
      />

      {/* CONȚINUT */}
      <div className="relative z-10 flex flex-col tablet:grid tablet:grid-cols-2 max-w-[1440px] mx-auto px-4 tablet:px-6 py-8 tablet:py-20 gap-6 tablet:gap-12 laptop:gap-10 items-center w-full">
        
        {/* IMAGINE - Prima pe mobile */}
        <div
          className="order-1 tablet:order-1 flex justify-center lg:justify-end relative w-full"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <img
            src={HeroIgenerateimg}
            alt="Consultant alăptare și bebeluș"
            className="w-full max-w-[280px] sm:max-w-[350px] tablet:max-w-[1000px] laptop:max-w-[1200px] lg:max-w-[1400px] h-auto object-contain z-10"
          />
        </div>

        {/* TEXT - Al doilea pe mobile */}
        <div
          className="order-2 tablet:order-2 tablet:-mt-12 tabletMd:-mt-12 laptop:mt-6 lg:mt-12 text-gray-800 w-full text-center tablet:text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h1
            className="text-2xl sm:text-3xl tabletSm:text-7xl tablet:text-5xl laptop:text-7xl lg:text-8xl font-fjalla text-[#b06b4c] leading-tight pb-3 sm:pb-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Sprijin profesionist pentru{" "}
            <span className="text-amber-900">mame</span> dedicate
          </h1>

          <p
            className="text-base sm:text-lg tabletSm:text-4xl tablet:text-2xl laptop:text-xl lg:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Susținere caldă pentru începutul tău.
          </p>

          <p
            className="text-sm sm:text-base tabletSm:text-2xl tablet:text-base laptop:text-sm lg:text-lg text-gray-700 mb-6 sm:mb-8 laptop:mb-6 leading-relaxed px-2 tablet:px-0"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Îți ofer îndrumare sigură, îngrijire adaptată nevoilor tale și
            susținere emoțională pentru ca tu și bebelușul tău să treceți cu
            încredere prin fiecare etapă a alăptării.
          </p>

          {/* BUTOANE OPTIMIZATE PENTRU MOBILE */}
          <div
            className="flex flex-col sm:flex-row justify-center tablet:justify-start gap-3 sm:gap-4 tabletSm:gap-6 px-2 tablet:px-0"
            data-aos="zoom-in-up"
            data-aos-delay="600"
          >
            <PrimaryButton 
              href="#booking"
              className="w-full sm:w-auto text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-3"
            >
              Programează consultația
            </PrimaryButton>
            <OutlineButton 
              href="Alăptare primul pas (Ebook)"
              className="w-full sm:w-auto text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap"
            >
              Ebook gratuit
            </OutlineButton>
          </div>

          {/* INDICATOR SCROLL PENTRU MOBILE */}
          <div 
            className="flex justify-center mt-8 tablet:hidden"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div className="flex flex-col items-center text-gray-500 animate-bounce">
              <span className="text-xs mb-1">Scroll jos</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* GRADIENT OVERLAY PENTRU TRANZIȚIE FRUMOASĂ */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20 tablet:hidden"></div>
    </section>
  );
}

export default Hero;