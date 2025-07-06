import React from "react";

function HeaderNavbar({ menuOpen, setMenuOpen }) {
  const commonClass = "text-[1em] font-normal font-robotoCondensed text-black hover:text-[#cb8645] no-underline transition-colors duration-200";


  return (
    <>
      {/* Linkuri pe desktop/tabletă */}
      <nav className="hidden tablet:flex gap-[30px] items-center text-gray-700 text-xl font-robotoCondensed">
        <a href="#page-0" className={commonClass}>Home</a>
        <a href="#about" className={commonClass}>Despre mine</a>
        <a href="#blog" className={commonClass}>Articole</a>
        <a href="#contact" className={commonClass}>Prețuri</a>
        <a href="#reviews" className={commonClass}>Recenzii</a>
        <a href="#services" className={commonClass}>Cum te pot ajuta</a>
        <a href="#faq" className={commonClass}>Contact</a>
      </nav>

      {/* Meniu mobil/tabletă */}
      {menuOpen && (
        <div className="tablet:hidden absolute top-20 right-4 left-4 bg-white border rounded-xl shadow-lg py-6 px-4 z-50">
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
                  className="block px-4 py-2 rounded hover:bg-[#fef6f2] hover:text-[#cb8645] transition-all duration-200"
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
