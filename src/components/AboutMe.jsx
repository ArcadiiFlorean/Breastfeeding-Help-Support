import React from "react";
import HeaderSocials from "./Header/HeaderSocial";

function AboutMe() {
  return (
    <section
      id="AboutMe"
      className="bg-[#fff8f4] px-4 phone:px-6 relative overflow-visible pb-20"
    >
      {/* Container principal */}
      <div className="max-w-[1440px] mx-auto space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 items-start p-4">
        
        {/* TITLU – sus pentru toate dimensiunile */}
        <div className="col-span-full">
          <h2
            className="
              text-center tablet:text-left
              text-4xl phone:text-5xl tabletSm:text-6xl tablet:text-7xl
              font-cantata text-[#9f6032] z-10
              mb-6 tablet:mb-8
            "
          >
            Despre mine
          </h2>
        </div>

        {/* Imaginea consultantului */}
        <div className="flex justify-center lg:justify-start relative z-10 -mb-6 tablet:-mb-10">
          <img
            src="/Hero_img_2.jpg"
            alt="Consultant în alăptare"
            className="w-full max-w-[320px] phone:max-w-[400px] tabletSm:max-w-[450px] tablet:max-w-[500px] h-auto rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Textul descriptiv */}
        <div>
          <div className="shadow-2xl shadow-black/30 p-6 phone:p-8 space-y-6 w-full max-w-[1200px] h-auto tablet:h-auto lg:h-[550px] overflow-y-auto mt-[10px] mx-auto rounded-lg bg-white">
            <div>
              <h3 className="font-bold text-lg mb-1">Drumul meu către consultanța în alăptare</h3>
              <p className="text-gray-700 leading-relaxed">
                Drumul meu către a deveni consultant în alăptare a început cu propria mea experiență de mamă. Alăptarea a fost mai dificilă decât mă așteptam, iar sprijinul pe care l-am primit a schimbat totul. Acel moment m-a inspirat să ajut și alte persoane să-și parcurgă această călătorie cu empatie, cunoștințe și sprijin practic la fiecare pas.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Filosofia și abordarea mea</h3>
              <p className="text-gray-700 leading-relaxed">
                Cred că fiecare călătorie în alăptare este unică. Abordarea mea se bazează pe îngrijire bazată pe dovezi, compasiune și pe întâlnirea familiilor exact acolo unde se află. Fie că te confrunți cu provocări sau cauți încredere, sunt aici să te susțin fără judecăți și să te ajut să iei decizii informate și sigure pentru tine și bebelușul tău.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">Certificări și formare</h3>
              <p className="text-gray-700 leading-relaxed">
                Sunt consultant internațional certificat în lactație (IBCLC), formată în cele mai noi științe despre alăptare și îngrijirea sugarilor. Experiența mea include ore de practică clinică, educație continuă și sprijin oferit familiilor diverse. Sunt dedicată învățării continue și oferirii unui sprijin competent și de încredere.
              </p>
            </div>
          </div>

          {/* Rețele sociale */}
          <div className="mt-12">
            <HeaderSocials />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
