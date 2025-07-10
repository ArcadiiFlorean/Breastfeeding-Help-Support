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
          <a href="#page-0" className="hover:underline">Home</a>
          <a href="#AboutMe" className="hover:underline">Despre mine</a>
          <a href="#SupportFeatures" className="hover:underline">Sprijin</a>
          <a href="#Help" className="hover:underline">Cum te pot ajuta</a>
          <a href="#SupportPackages" className="hover:underline">Prețuri</a>
          <a href="#FAQSection" className="hover:underline">Întrebări</a>
          <a href="#Testimonials" className="hover:underline">Recenzii</a>
          <a href="#ContactOptions" className="hover:underline">Contact</a>
          <a href="#booking" className="hover:underline">Programează-te</a>
        </nav>

        {/* Rețele Social Media */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedinIn />
          </a>
          <a href="#" className="hover:text-white">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Drepturi de autor */}
      <div className="text-center text-xs text-gray-400 mt-6">
        © 2025 CONSULT — Toate drepturile rezervate.
      </div>
    </footer>
  );
}

export default Footer;
