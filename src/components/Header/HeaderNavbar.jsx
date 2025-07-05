import React, { useState } from "react";

function HeaderNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Buton burger - doar pe mobil */}
      <button
        className="md:hidden text-amber-800 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Linkuri pe desktop */}
      <nav className="hidden md:flex gap-6 items-center text-gray-700 text-sm font-robotoCondensed">
        <a href="#home" className="hover:text-gray-900">Acasă</a>
        <a href="#about" className="hover:text-gray-900">Despre mine</a>
        <a href="#blog" className="hover:text-gray-900">Articole</a>
        <a href="#contact" className="hover:text-gray-900">Prețuri</a>
        <a href="#reviews" className="hover:text-gray-900">Recenzii</a>
        <a href="#services" className="hover:text-gray-900">Cum te pot ajuta</a>
        <a href="#faq" className="hover:text-gray-900">Contact</a>
      </nav>

      {/* Linkuri mobile – dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 right-4 left-4 bg-white border rounded-lg shadow-lg py-4 px-6 space-y-3 z-50 text-gray-700 text-base font-robotoCondensed">
          <a href="#home" onClick={() => setMenuOpen(false)} className="block">Acasă</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="block">Despre mine</a>
          <a href="#blog" onClick={() => setMenuOpen(false)} className="block">Articole</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block">Prețuri</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)} className="block">Recenzii</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="block">Cum te pot ajuta</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block">Contact</a>
        </div>
      )}
    </>
  );
}

export default HeaderNavbar;
