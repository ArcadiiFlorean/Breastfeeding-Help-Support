import React from "react";
import { Link } from "react-router-dom";

const helpItems = [
  {
    title: "Sprijin pentru atașare și poziționare",
    desc: "Îți este dificil să atașezi corect bebelușul? Te ajut să găsești poziții confortabile și eficiente pentru alăptare, reducând durerea și îmbunătățind hrănirea.",
    image: "/help_img_01.jpg",
  },
  {
    title: "Îngrijorări legate de cantitatea de lapte",
    desc: "Ai lapte prea puțin sau prea mult? Te ajut să înțelegi semnalele corpului tău și să echilibrezi producția de lapte într-un mod sănătos.",
    image: "/help_img_02.jpg",
  },
  {
    title: "Ghidare pentru pompare și hrănirea cu biberonul",
    desc: "Vrei să introduci biberonul sau te întorci la muncă? Îți ofer sfaturi despre pompare, păstrarea laptelui și menținerea producției.",
    image: "/help_img_03.jpg",
  },
  {
    title: "Educație prenatală pentru alăptare",
    desc: "Pregătește-te din timp! Sesiuni personalizate te ajută să știi la ce să te aștepți și cum să începi alăptarea cu încredere, chiar din primele zile.",
    image: "/help_img_04.jpg",
  },
  {
    title: "Soluții pentru alăptare dureroasă",
    desc: "Durerea nu este normală. Fie că ai ragade, angorjare sau alte probleme, îți ofer soluții blânde și eficiente pentru ameliorare rapidă.",
    image: "/help_img_05.jpg",
  },
  {
    title: "Sprijin pentru înțărcare și tranziție",
    desc: "Când ești gata să oprești alăptarea, te ghidez printr-un proces blând și respectuos – total sau parțial, în ritmul tău.",
    image: "/help_img_06.jpg",
  },
];

function Help() {
  return (
    <section id="Help" className="bg-[#ffffff] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          data-aos="fade-up"
          className="text-4xl tablet:text-5xl laptop:text-6xl font-bold text-center text-[#b06b4c] mb-6 leading-tight"
        >
          Moduri în care te pot ajuta
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center text-base tablet:text-lg text-gray-700 max-w-2xl mx-auto mb-12"
        >
          Fie că ești la început de drum sau întâmpini dificultăți, sunt aici
          să-ți ofer sprijin, înțelegere și soluții personalizate.
        </p>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left"
        >
          {helpItems.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={`${150 + index * 100}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
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
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-12 flex justify-center py-10"
        >
          <a
            href="#preturi"
            className="bg-[#d39473] hover:bg-[#c87f5b] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            Vezi prețurile și pachetele
          </a>
        </div>
      </div>
    </section>
  );
}

export default Help;
