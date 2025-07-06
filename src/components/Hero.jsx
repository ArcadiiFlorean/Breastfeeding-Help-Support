import React from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import OutlineButton from "./Buttons/OutlineButton";
import HeroImg from "/Hero_img-COPY.png"; // PNG transparent din /public

function Hero() {
  return (
    <section className="relative bg-[#fef6f2] overflow-hidden">
      {/* FUNDAL FLORI JOS */}
      <img
        src="/flowers-bg.jpg"
        alt="Fundal flori"
        className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 w-[1500px] h-[33vh] object-cover object-bottom z-0 opacity-30"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 max-w-[1440px] mx-auto px-6 py-20 gap-12 items-center">
        {/* TEXT PE STÂNGA */}
  <div className="text-gray-800 max-w-3xl text-[1.25rem] lg:text-[1.5rem] leading-relaxed mb-10 lg:mb-[500px]">

 <h1 className="text-6xl lg:text-8xl font-fjalla text-[#b06b4c] leading-tight max-w-3xl">
  Trusted Breastfeeding Help & Support
</h1>


  <p className="text-3xl font-semibold text-gray-900 mb-6">
    Compassionate, Certified Support for New Mothers at Every Step
  </p>

  <p className="text-lg text-gray-700 mb-10">
    Get expert lactation advice, personalized care, and confidence-boosting
    support to help you and your baby thrive through every stage of breastfeeding.
  </p>

  <div className="flex flex-wrap gap-6">
    <PrimaryButton href="#booking">Book a Free Consultation</PrimaryButton>
    <OutlineButton href="#services">Explore my Services</OutlineButton>
  </div>
</div>


        {/* IMAGINE DECUPATĂ */}
  <div className="flex justify-center lg:justify-end relative">
  <img
    src={HeroImg}
    alt="Consultant alăptare și bebeluș"
    className="w-full max-w-[1000px] h-auto object-contain z-10"
  />
</div>

      </div>
    </section>
  );
}

export default Hero;
