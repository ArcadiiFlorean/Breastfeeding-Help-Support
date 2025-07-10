import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

function HeaderSocial() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div data-aos="fade-left" className="hidden tablet:flex items-center gap-5">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-gray-600 hover:text-[#1877F2] text-2xl transition-transform transform hover:scale-125 duration-200" />
      </a>
      <a
        href="https://www.instagram.com/marina.cociug/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="text-gray-600 hover:text-[#E1306C] text-2xl transition-transform transform hover:scale-125 duration-200" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="text-gray-600 hover:text-[#FF0000] text-2xl transition-transform transform hover:scale-125 duration-200" />
      </a>
      <a
        href="https://wa.me/+447510627788"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-gray-600 hover:text-[#25D366] text-2xl transition-transform transform hover:scale-125 duration-200" />
      </a>
      <a
        href="https://t.me/+MqS0PFqPb8UyZjcy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTelegramPlane className="text-gray-600 hover:text-[#0088cc] text-2xl transition-transform transform hover:scale-125 duration-200" />
      </a>
    </div>
  );
}

export default HeaderSocial;


