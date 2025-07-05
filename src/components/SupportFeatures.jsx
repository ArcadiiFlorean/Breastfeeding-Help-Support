import React from "react";
import {
  FaQuoteRight,
  FaComments,
  FaEnvelope,
  FaCheckCircle,
  FaHeart,
  FaStar,
} from "react-icons/fa";

function SupportFeatures() {
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
    <section className="bg-[#f3e8ff] py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
          Sprijin care te face să te simți acasă
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
          Hrănește. Împuternicește. Începe cu încredere.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-[#fbcbb2] p-3 rounded">{item.icon}</div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="#booking"
            className="bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 font-medium px-6 py-3 rounded transition"
          >
            Programează-te
          </a>
        </div>
      </div>
    </section>
  );
}

export default SupportFeatures;
