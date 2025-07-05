import React from "react";

function HeaderNavbar() {
  return (
    <nav className="hidden md:flex gap-6 items-center text-gray-700 text-sm">
      <a href="#home" className="hover:text-gray-900">Acasa</a>
      <a href="#about" className="hover:text-gray-900">Despre mine</a>
      <a href="#blog" className="hover:text-gray-900">Articole</a>
      <a href="#contact" className="hover:text-gray-900">Preturi</a>
      <a href="#reviews" className="hover:text-gray-900">Recenzii</a>
      <a href="#services" className="hover:text-gray-900">Cum te pot ajuta</a>
      <a href="#faq" className="hover:text-gray-900">Contact</a>
    </nav>
  );
}

export default HeaderNavbar;
