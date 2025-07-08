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
      icon: <FaQuoteRight size={24} className="text-orange-500" />,
      title: "Ghidare blândă și profesionistă",
      desc: "Primești sprijin personalizat, oferit cu grijă și înțelegere, pentru fiecare etapă a alăptării.",
    },
    {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "Sfaturi actualizate și de încredere",
      desc: "Te simți în siguranță cu recomandări bazate pe cele mai noi cercetări, explicate clar și accesibil.",
    },
    {
      icon: <FaEnvelope size={24} className="text-orange-500" />,
      title: "Sprijin adaptat stilului tău",
      desc: "Alege ședințe față în față sau online—flexibilitate în funcție de viața și confortul tău.",
    },
    {
      icon: <FaCheckCircle size={24} className="text-orange-500" />,
      title: "Sprijin constant, pe termen lung",
      desc: "Rămânem în legătură prin monitorizări regulate și încurajare—ca să știi că ești ascultată.",
    },
    {
      icon: <FaHeart size={24} className="text-orange-500" />,
      title: "Primim fiecare familie cu căldură",
      desc: "Indiferent de stilul de parenting sau obiectivele tale, călătoria ta este respectată aici.",
    },
    {
      icon: <FaStar size={24} className="text-orange-500" />,
      title: "Spațiu calm și reconfortant",
      desc: "Relaxează-te într-un mediu liniștit, fără judecată, creat pentru a-ți oferi siguranță și confort.",
    },
  ];

  return (
    <section id="SupportFeatures" className="bg-[#D39473] py-32">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <p
      data-aos="fade-down"
      className="text-4xl tablet:text-5xl laptop:text-6xl font-extrabold text-white text-center leading-tight max-w-4xl mx-auto mb-10 px-4 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]"
    >
      De ce să ceri ajutorul unui specialist în alăptare?
    </p>

    <h2
      data-aos="fade-up"
      data-aos-delay="100"
      className="text-3xl md:text-xl font-semibold text-gray-800 mb-12"
    >
      Hrănește. Împuternicește. Începe cu încredere.
    </h2>

    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left px-4 md:px-0"
    >
      {features.map((item, index) => (
        <div
          key={index}
          data-aos="zoom-in"
          data-aos-delay={`${150 + index * 100}`}
          className="flex items-start gap-5 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
        >
          <div className="bg-[#fbcbb2] p-4 rounded-full text-white text-2xl">
            {item.icon}
          </div>
          <div>
            <h4 className="text-xl font-bold text-[#b06b4c] mb-2">
              {item.title}
            </h4>
            <p className="text-gray-700 text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div
      className="mt-6 flex justify-center"
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <a
        href="#booking"
        className="bg-[#ffdcc9] hover:bg-[#f7b99b] text-gray-800 font-semibold text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300"
      >
        Programează-te
      </a>
    </div>
  </div>
</section>

  );
}

export default SupportFeatures;
