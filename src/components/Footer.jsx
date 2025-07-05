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

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded">
            <span className="text-[#1f3b3a] font-bold text-xl">★</span>
          </div>
          <span className="text-white text-lg font-semibold tracking-wide">
            CONSULT
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-200">
          <a href="#about" className="hover:underline">About</a>
          <a href="#support" className="hover:underline">Support</a>
          <a href="#packages" className="hover:underline">Packages</a>
          <a href="#booking" className="hover:underline">Booking</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#social" className="hover:underline">Social</a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-center w-full mt-4 lg:mt-0">
          All rights reserved © 2025 Consult.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
