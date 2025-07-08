import React from "react";
import { FaCheck } from "react-icons/fa";

function SupportPackages() {
  const packages = [
    {
      title: "Start",
      price: 0,
      description: "Sprijin blând pentru început.",
      features: ["Apel video introductiv", "Plan simplu de alăptare"],
      button: "Începe",
    },
    {
      title: "Bază",
      price: 9,
      description: "Ghidare constantă pentru început de drum.",
      features: ["Două ședințe de verificare", "2 săptămâni suport prin mesaje", "Revizuire jurnal alăptare"],
      button: "Alege",
    },
    {
      title: "Extins",
      price: 19,
      description: "Îngrijire suplimentară pe măsură ce crești.",
      features: [
        "4 întâlniri de urmărire",
        "1 lună suport prin mesaje",
        "Ajutor cu atașarea corectă",
        "Sfaturi pentru biberon și pompă",
        "Recomandări pentru somn și alăptare",
      ],
      button: "Selectează",
    },
    {
      title: "Premium",
      price: 29,
      description: "Sprijin continuu, empatic și prezent mereu.",
      features: [
        "Întâlniri nelimitate",
        "Asistență prioritară prin mesaje",
        "Resurse personalizate",
        "Sfaturi pentru diversificare",
        "Ședință Q&A cu familia",
      ],
      button: "Alătură-te",
    },
  ];

  return (
    <section className="bg-[#f0e9fa] py-20">
      <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold text-center text-[#b06b4c] mb-12 leading-tight">
  Pachete de Sprijin
</h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white border border-gray-200 p-6 rounded-md shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {pkg.price === 0 ? "Gratuit" : `$${pkg.price}`}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {pkg.price > 0 ? "Pe lună" : "Fără costuri, fără obligații"}
                </p>
                <h4 className="text-lg font-medium text-gray-800 mb-1">{pkg.title}</h4>
                <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>
                <button className="w-full bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 font-medium py-2 rounded transition">
                  {pkg.button}
                </button>
              </div>

              <ul className="mt-6 space-y-2 text-sm">
                <li className="text-gray-500 font-semibold">INCLUDE</li>
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <FaCheck className="text-orange-500 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportPackages;
