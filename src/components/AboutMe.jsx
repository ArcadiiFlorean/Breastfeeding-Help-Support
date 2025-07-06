import React from "react";

function AboutMe() {
  return (
    <section id="about" className="bg-[#fff8f4] py-20 px-6 relative overflow-visible">
      {/* Container de 1440px */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
        
      
        {/* Imaginea consultantului */}
        <div className="flex justify-center lg:justify-start mt-10">
          <img
            src="/AboutMeImg.jpg"
            alt="Lactation Consultant"
            className="w-full max-w-[500px] h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Textul descriptiv */}
        <div className="bg-white shadow-xl p-8 space-y-6 w-full max-w-[800px] h-auto lg:h-[400px] overflow-y-auto mt-10">
          <div>  {/* Titlul ieșit din container, centrat */}
               <h2 className="absolute -top-10 left-[800px] text-5xl font-bold text-[#a4663b] z-10 ']">
          About Me
        </h2>
            <h3 className="font-bold text-lg mb-1">My Journey to Lactation Consulting</h3>
            <p className="text-gray-700 leading-relaxed">
              My path to becoming a lactation consultant began with my own motherhood experience...
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-1">Philosophy & Approach</h3>
            <p className="text-gray-700 leading-relaxed">
              I believe every breastfeeding journey is unique...
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-1">Certifications & Training</h3>
            <p className="text-gray-700 leading-relaxed">
              I’m an International Board Certified Lactation Consultant (IBCLC)...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
