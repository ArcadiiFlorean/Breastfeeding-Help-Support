import React from "react";
import { FaCheck } from "react-icons/fa";

function SupportPackages() {
  const packages = [
    {
      title: "Starter",
      price: 0,
      description: "Gentle support to get started.",
      features: ["Intro video call", "Simple feeding plan"],
      button: "Begin",
    },
    {
      title: "Basic",
      price: 9,
      description: "Steady guidance for new journeys.",
      features: ["Two check-ins", "2 weeks text help", "Feeding log review"],
      button: "Choose",
    },
    {
      title: "Extended",
      price: 19,
      description: "Extra care as you grow.",
      features: [
        "Four follow-ups",
        "1 month text support",
        "Latch & position help",
        "Bottle & pump tips",
        "Sleep and feeding tips",
      ],
      button: "Select",
    },
    {
      title: "Premium",
      price: 29,
      description: "Ongoing, nurturing support always here.",
      features: [
        "Unlimited follow-ups",
        "Priority text help",
        "Custom resources",
        "Solids & weaning tips",
        "Family Q&A session",
      ],
      button: "Join",
    },
  ];

  return (
<section className="bg-[#f0e9fa] py-20">

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
          Support Packages
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white border border-gray-200 p-6 rounded-md shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">${pkg.price}</h3>
                <p className="text-sm text-gray-500 mb-4">{pkg.price > 0 ? "Per month" : "No cost, no commitment"}</p>
                <h4 className="text-lg font-medium text-gray-800 mb-1">{pkg.title}</h4>
                <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>
                <button className="w-full bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 font-medium py-2 rounded transition">
                  {pkg.button}
                </button>
              </div>

              <ul className="mt-6 space-y-2 text-sm">
                <li className="text-gray-500 font-semibold">INCLUDES</li>
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
