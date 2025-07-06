import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

function HeaderSocial() {
  return (
    <div className="hidden tablet:flex items-center gap-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-gray-600 hover:text-gray-900" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-gray-600 hover:text-gray-900" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="text-gray-600 hover:text-gray-900" />
      </a>
      <a href="https://wa.me/447000000000" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="text-gray-600 hover:text-green-600" />
      </a>
    </div>
  );
}

export default HeaderSocial;
