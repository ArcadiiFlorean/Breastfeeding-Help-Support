import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeaderSocial from "./Header/HeaderSocial";

import {
  FaEnvelope,
  FaComments,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";

function ContactOptions() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const contacts = [
    {
      icon: <FaEnvelope size={24} className="text-orange-500" />,
      title: "Email",
      text: "Trimite întrebări sau gânduri oricând.",
      value: "macociug@mail.com",
      link: "mailto:macociug@mail.com",
    },
    {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "WhatsApp",
      text: "Scrie-mi oricând pe WhatsApp — răspund rapid!",
      value: "+373 68179176",
      link: "https://wa.me/37368179176",
    },
    {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "Instagram",
      text: "24/24 pentru întrebări rapide.",
      value: "@marina.cociug",
      link: "https://www.instagram.com/marina.cociug/",
    },
  ];

  return (
    <section
      id="ContactOptions"
      className="bg-[#D39473] py-20 px-6 text-center"
    >
      <p
        className="text-m font-medium text-white uppercase mb-3 tracking-wide"
        data-aos="fade-up"
      >
        Hai să luăm legătura
      </p>
      <h2
        className="text-3xl md:text-4xl font-semibold text-white mb-4 font-playwrite"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Sprijinul e la un mesaj distanță
      </h2>
      <p
        className="text-gray-600 max-w-2xl mx-auto mb-12"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Scrie-mi dacă ai întrebări, ai nevoie de sprijin sau dorești să
        programezi o ședință—sunt aici pentru tine.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto justify-items-center">
        {contacts.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
            className="flex flex-col items-center"
          >
            <div className="bg-orange-100 p-3 rounded">{item.icon}</div>
            <h3 className="mt-4 font-medium text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.text}</p>
            {item.link ? (
              <a
                href={item.link}
                className="mt-2 text-sm text-blue-800 underline hover:text-blue-600"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-sm font-medium text-gray-800">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Social media icons */}
      <div className="mt-12 flex justify-center" data-aos="fade-up" data-aos-delay="400">
        <HeaderSocial />
      </div>
    </section>
  );
}

export default ContactOptions;
