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
      className="relative bg-[#fef6f2] bg-contain bg-no-repeat bg-top tablet:bg-none overflow-hidden "
    >
      {/* FUNDAL FLORI JOS */}
      <img
        src="/flowers-bg.jpg"
        alt="Fundal flori"
        className=" tablet:block absolute tablet:bottom-[150px] laptop:bottom-[150px] lg:bottom-[186px] left-1/2 -translate-x-1/2 w-full max-w-[1500px] h-auto tablet:max-h-[180px] laptop:max-h-[280px] lg:max-h-[350px] object-cover object-bottom z-0 opacity-30"
      />

      {/* CONȚINUT */}
      <div className="relative z-10 flex flex-col tablet:grid tablet:grid-cols-2 max-w-[1440px] mx-auto px-4 tablet:px-6 py-16 tablet:py-20 gap-10 tablet:gap-12 laptop:gap-10 items-center">
        {/* TEXT */}
        <div
          className="order-1 tablet:order-2 tablet:-mt-12 tabletMd:-mt-12 laptop:mt-6 lg:mt-12 text-gray-800 max-w-3xl text-base tablet:text-[1.1rem] laptop:text-[1rem] lg:text-[1.5rem] leading-relaxed mb-10 laptop:mb-6 lg:mb-[500px]"
          data-aos="fade-up"
        >
          <h1
            className="text-3xl text-center tabletSm:text-7xl tabletSm:text-center tablet:text-5xl laptop:text-7xl lg:text-8xl font-fjalla text-[#b06b4c] leading-tight max-w-3xl pb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Sprijin profesionist pentru{" "}
            <span className="text-amber-900">mame</span> dedicate
          </h1>

          <p
            className="text-lg tabletSm:text-4xl text-center tablet:text-2xl laptop:text-xl lg:text-3xl font-semibold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Susținere caldă pentru începutul tău.
          </p>

          <p
            className="text-sm tabletSm:text-2xl text-center tablet:text-base laptop:text-sm lg:text-lg text-gray-700 mb-8 laptop:mb-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Îți ofer îndrumare sigură, îngrijire adaptată nevoilor tale și
            susținere emoțională pentru ca tu și bebelușul tău să treceți cu
            încredere prin fiecare etapă a alăptării.
          </p>

          <div
            className="flex flex-row flex-wrap justify-center gap-4 tabletSm:gap-6 lg:flex-row"
            data-aos="zoom-in-up"
            data-aos-delay="400"
          >
            <PrimaryButton href="#booking">
              Programează o consultație
            </PrimaryButton>
            <OutlineButton href="Alăptare primul pas (Ebook)">
              Alăptare primul pas (Ebook) gratuit
            </OutlineButton>
          </div>
        </div>

        {/* IMAGINE */}
        <div
          className="order-2 tablet:order-1 flex justify-center lg:justify-end relative -mt-10 tablet:mt-0"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <img
            src={HeroIgenerateimg}
            alt="Consultant alăptare și bebeluș"
            className="w-full max-w-[700px] tablet:max-w-[1000px] laptop:max-w-[1200px] lg:max-w-[1400px] h-auto object-contain z-10"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
