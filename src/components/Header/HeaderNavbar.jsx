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
  <div className="md:hidden absolute top-20 right-4 left-4 bg-white border rounded-xl shadow-lg py-6 px-4 z-50">
    <ul className="space-y-4 text-gray-800 font-robotoCondensed text-base">
      {[
        { href: "#page-0", label: "Home" },
        { href: "#about", label: "Despre mine" },
        { href: "#blog", label: "Articole" },
        { href: "#contact", label: "Prețuri" },
        { href: "#reviews", label: "Recenzii" },
        { href: "#services", label: "Cum te pot ajuta" },
        { href: "#faq", label: "Contact" },
      ].map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 rounded hover:bg-[#fef6f2] hover:text-[#b06b4c] transition-all duration-200"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}

    </>
  );
}

export default HeaderNavbar;
