import React from "react";

function HeaderNavbar({ menuOpen, setMenuOpen }) {
  return (
    <>
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

      {/* Meniu mobil */}
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
