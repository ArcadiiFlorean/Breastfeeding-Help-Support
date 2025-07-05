import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#1f3b3a] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">

        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded">
            <span className="text-[#1f3b3a] font-bold text-xl">★</span>
          </div>
          <span className="text-white text-lg font-semibold tracking-wide">
            CONSULT
          </span>
        </div>

        {/* Linkuri Navigație */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-200">
          <a href="#about" className="hover:underline">Despre</a>
          <a href="#support" className="hover:underline">Sprijin</a>
          <a href="#packages" className="hover:underline">Pachete</a>
          <a href="#booking" className="hover:underline">Programare</a>
          <a href="#faq" className="hover:underline">Întrebări</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#social" className="hover:underline">Rețele</a>
        </nav>

        {/* Drepturi de autor */}
        <p className="text-xs text-center w-full mt-4 lg:mt-0">
          Toate drepturile rezervate © 2025 Consult.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
