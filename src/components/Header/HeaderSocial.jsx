import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

function HeaderSocial() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div data-aos="fade-left" className="hidden tablet:flex items-center gap-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-gray-600 hover:text-gray-900" />
      </a>
      <a href="https://www.instagram.com/marina.cociug/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-gray-600 hover:text-gray-900" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="text-gray-600 hover:text-gray-900" />
      </a>
      <a href="https://wa.me/+44 7510 627788" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="text-gray-600 hover:text-green-600" />
      </a>
    </div>
  );
}

export default HeaderSocial;
