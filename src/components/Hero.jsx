import React from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import OutlineButton from "./Buttons/OutlineButton";

function Hero() {
  return (
    <section className="bg-[#fef6f2] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        {/* Text în stânga */}
        <div className="text-gray-800">
          <h1 className="text-4xl lg:text-7xl font-semibold font-fredoka leading-tight mb-6 text-amber-800">
            Ajutor și sprijin de încredere pentru alăptare
          </h1>

          <p className="text-lg text-gray-700 font-robotoCondensed mb-8">
            Sprijin blând și profesionist în alăptare pentru mame aflate la
            început de drum sau în așteptarea bebelușului.
            <br className="hidden md:block" />
            Fii ascultată, sprijinită și încrezătoare — călătoria ta începe
            chiar acum.
          </p>

          <div className="flex flex-wrap gap-4">
            <PrimaryButton href="#booking">Programează-te</PrimaryButton>
            <OutlineButton href="#learn">Află mai mult</OutlineButton>
          </div>
        </div>

        {/* Imagine în dreapta */}
        <div className="max-w-md mx-auto">
          <img
            src="Hero_img_2.jpg"
            alt="Mame într-un spațiu liniștit"
            className="rounded-xl w-full h-auto object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
