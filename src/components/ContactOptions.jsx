import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeaderSocial from "./Header/HeaderSocial";

import {
  FaEnvelope,
  FaComments,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

function ContactOptions() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const contacts = [
    {
      icon: <FaEnvelope size={20} className="text-orange-500" />,
      title: "Email",
      text: "Trimite întrebări sau gânduri oricând.",
      value: "macociug@mail.com",
      link: "mailto:macociug@mail.com",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      textColor: "text-blue-700 hover:text-blue-800"
    },
    {
      icon: <FaWhatsapp size={20} className="text-green-500" />,
      title: "WhatsApp",
      text: "Scrie-mi oricând pe WhatsApp — răspund rapid!",
      value: "+373 68179176",
      link: "https://wa.me/37368179176",
      bgColor: "bg-green-50 hover:bg-green-100",
      textColor: "text-green-700 hover:text-green-800"
    },
    {
      icon: <FaInstagram size={20} className="text-pink-500" />,
      title: "Instagram",
      text: "24/24 pentru întrebări rapide.",
      value: "@marina.cociug",
      link: "https://www.instagram.com/marina.cociug/",
      bgColor: "bg-pink-50 hover:bg-pink-100",
      textColor: "text-pink-700 hover:text-pink-800"
    },
  ];

  return (
    <section
      id="ContactOptions"
      className="bg-[#D39473] py-12 sm:py-16 tablet:py-20 lg:py-24 px-3 sm:px-4 tablet:px-6 text-center"
    >
      {/* Header optimizat pentru mobile */}
      <div className="max-w-4xl mx-auto">
        <p
          className="
            text-xs sm:text-sm 
            font-medium text-white uppercase 
            mb-2 sm:mb-3 
            tracking-wide opacity-90
          "
          data-aos="fade-up"
        >
          Hai să luăm legătura
        </p>
        
        <h2
          className="
            text-2xl sm:text-3xl tablet:text-4xl lg:text-5xl 
            font-semibold text-white 
            mb-3 sm:mb-4 
            font-playwrite
            leading-tight
            px-2 sm:px-0
          "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Sprijinul e la un mesaj distanță
        </h2>
        
        <p
          className="
            text-white/90 
            text-sm sm:text-base tablet:text-lg
            max-w-2xl mx-auto 
            mb-8 sm:mb-10 tablet:mb-12
            leading-relaxed
            px-2 sm:px-0
          "
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Scrie-mi dacă ai întrebări, ai nevoie de sprijin sau dorești să
          programezi o ședință—sunt aici pentru tine.
        </p>
      </div>

      {/* Contact cards - optimizate pentru mobile */}
      <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        gap-4 sm:gap-6 tablet:gap-8 lg:gap-10 
        max-w-5xl mx-auto 
        px-2 sm:px-0
      ">
        {contacts.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
            className="
              bg-white bg-opacity-95 backdrop-blur-sm
              rounded-xl sm:rounded-2xl 
              p-4 sm:p-5 tablet:p-6
              shadow-lg hover:shadow-xl
              transition-all duration-300
              transform hover:-translate-y-1 sm:hover:-translate-y-2
              border border-white border-opacity-20
              group
            "
          >
            {/* Icon container */}
            <div className="
              w-12 h-12 sm:w-14 sm:h-14 tablet:w-16 tablet:h-16
              bg-white rounded-full
              flex items-center justify-center
              mx-auto mb-3 sm:mb-4
              shadow-md
              group-hover:scale-110 transition-transform duration-300
            ">
              {React.cloneElement(item.icon, {
                size: window.innerWidth < 640 ? 18 : window.innerWidth < 768 ? 20 : 22
              })}
            </div>
            
            {/* Content */}
            <div className="text-center">
              <h3 className="
                text-base sm:text-lg tablet:text-xl 
                font-semibold text-gray-800 
                mb-2 sm:mb-3
              ">
                {item.title}
              </h3>
              
              <p className="
                text-xs sm:text-sm tablet:text-base 
                text-gray-600 
                mb-3 sm:mb-4
                leading-relaxed
                px-1 sm:px-0
              ">
                {item.text}
              </p>
              
              {/* Contact link/value */}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-block
                    text-xs sm:text-sm tablet:text-base 
                    font-medium
                    px-3 sm:px-4 py-2 sm:py-3
                    rounded-lg sm:rounded-xl
                    transition-all duration-300
                    transform hover:scale-105
                    shadow-sm hover:shadow-md
                    ${item.bgColor}
                    ${item.textColor}
                  `}
                >
                  {item.value}
                </a>
              ) : (
                <p className="
                  text-xs sm:text-sm tablet:text-base 
                  font-medium text-gray-800
                  bg-gray-100 
                  px-3 py-2 rounded-lg
                  inline-block
                ">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick action buttons pentru mobile */}
      <div className="
        mt-8 sm:mt-10 tablet:mt-12
        flex flex-col sm:flex-row 
        justify-center gap-3 sm:gap-4
        px-4 sm:px-0
        sm:hidden
      " data-aos="fade-up" data-aos-delay="400">
        <a
          href="https://wa.me/37368179176"
          className="
            bg-green-500 hover:bg-green-600
            text-white font-semibold
            px-6 py-3 rounded-full
            flex items-center justify-center gap-2
            transition-all duration-300
            transform hover:scale-105
            shadow-lg
          "
        >
          <FaWhatsapp size={16} />
          Scrie pe WhatsApp
        </a>
        <a
          href="mailto:macociug@mail.com"
          className="
            bg-blue-500 hover:bg-blue-600
            text-white font-semibold
            px-6 py-3 rounded-full
            flex items-center justify-center gap-2
            transition-all duration-300
            transform hover:scale-105
            shadow-lg
          "
        >
          <FaEnvelope size={16} />
          Trimite Email
        </a>
      </div>

      {/* Social media section - îmbunătățită pentru mobile */}
      <div className="
        mt-10 sm:mt-12 tablet:mt-16
        bg-white bg-opacity-10 backdrop-blur-sm
        rounded-xl sm:rounded-2xl
        p-4 sm:p-6 tablet:p-8
        max-w-md mx-auto
        border border-white border-opacity-20
      " data-aos="fade-up" data-aos-delay="500">
        <h3 className="
          text-white font-semibold 
          text-base sm:text-lg 
          mb-3 sm:mb-4
        ">
          Urmărește-mă pe social media
        </h3>
        <div className="flex justify-center">
          <HeaderSocial />
        </div>
        <p className="
          text-white/80 
          text-xs sm:text-sm 
          mt-3 sm:mt-4
        ">
          Conținut util și inspirațional despre alăptare
        </p>
      </div>

      {/* Trust indicators pentru mobile */}
      <div className="
        mt-8 sm:mt-10 tablet:mt-12
        flex flex-col sm:flex-row 
        items-center justify-center 
        gap-4 sm:gap-8
        text-white/80
        text-xs sm:text-sm
      " data-aos="fade-up" data-aos-delay="600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Răspund în max 24h</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>Consultații online & offline</span>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span>Suport 24/7</span>
        </div>
      </div>

      {/* Decorative elements pentru mobile */}
      <div className="absolute top-10 left-5 w-6 h-6 bg-white bg-opacity-10 rounded-full animate-bounce sm:hidden"></div>
      <div className="absolute bottom-20 right-5 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-pulse sm:hidden"></div>
    </section>
  );
}

export default ContactOptions;