import React from "react";

function HeaderNavbar({ menuOpen, setMenuOpen }) {
  const linkStyle = {
    fontSize: "1em",
    fontWeight: 400,
    fontStyle: "normal",
    color: "rgb(0, 0, 0)",
    fontKerning: "none",
    textDecoration: "none",
  };

  const commonClass = "OYPEnA";

  return (
    <>
      {/* Linkuri pe desktop */}
      <nav className="hidden md:flex gap-[60px] items-center text-gray-700 text-m font-robotoCondensed">
        <a href="#page-0" target="_self" draggable="false" rel="noopener nofollow" className={commonClass} style={linkStyle}>
          Home
        </a>
        <a href="#about" className={commonClass} style={linkStyle}>
          Despre mine
        </a>
        <a href="#blog" className={commonClass} style={linkStyle}>
          Articole
        </a>
        <a href="#contact" className={commonClass} style={linkStyle}>
          Prețuri
        </a>
        <a href="#reviews" className={commonClass} style={linkStyle}>
          Recenzii
        </a>
        <a href="#services" className={commonClass} style={linkStyle}>
          Cum te pot ajuta
        </a>
        <a href="#faq" className={commonClass} style={linkStyle}>
          Contact
        </a>
      </nav>

      {/* Meniu mobil */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 right-4 left-4 bg-white border rounded-lg shadow-lg py-4 px-6 space-y-3 z-50 text-gray-700 text-base font-robotoCondensed">
          <a href="#page-0" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Home
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Despre mine
          </a>
          <a href="#blog" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Articole
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Prețuri
          </a>
          <a href="#reviews" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Recenzii
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Cum te pot ajuta
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className={commonClass} style={linkStyle}>
            Contact
          </a>
        </div>
      )}
    </>
  );
}

export default HeaderNavbar;
