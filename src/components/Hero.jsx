import React from "react";

function Hero() {
  return (
    <section className="bg-[#fef6f2] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Imagine */}
        <div className="max-w-md mx-auto">
          <img
            src="Hero_img_2.jpg"
            alt="Mame într-un spațiu liniștit"
            className="rounded-xl w-full h-auto object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="text-gray-800">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            Hrănește fiecare clipă,<br />îmbrățișează fiecare alăptare
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sprijin blând și profesionist în alăptare pentru mame aflate la început de drum sau în așteptarea bebelușului. 
            Fii ascultată, sprijinită și încrezătoare—călătoria ta începe chiar acum.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#booking"
              className="bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 font-medium px-6 py-3 rounded transition"
            >
              Programează-te
            </a>
            <a
              href="#learn"
              className="border border-gray-500 text-gray-800 font-medium px-6 py-3 rounded transition hover:bg-gray-100"
            >
              Află mai mult
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
