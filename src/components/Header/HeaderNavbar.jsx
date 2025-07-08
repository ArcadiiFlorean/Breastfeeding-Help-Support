import React from "react";

function HeaderNavbar({ menuOpen, setMenuOpen }) {
  const commonClass =
    "text-[1em] font-normal font-robotoCondensed text-black hover:text-[#cb8645] no-underline transition-colors duration-200";

  // Elementele din navbar (folosite și la desktop și la mobil)
  const navItems = [
    { href: "#page-0", label: "Home" },
    { href: "#AboutMe", label: "Despre mine" },
    { href: "#SupportFeatures", label: "Sprijin" },
    { href: "#Help", label: "Cum te pot ajuta" },
    { href: "#SupportPackages", label: "Prețuri" },
    { href: "#FAQSection", label: "Întrebări" },
    { href: "#Testimonials", label: "Recenzii" },
    { href: "#ContactOptions", label: "Contact" },
  ];

  return (
    <>
      {/* Meniu pe desktop/tabletă */}
      <nav className="hidden tablet:flex gap-[30px] items-center text-gray-700 text-xl font-robotoCondensed">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={commonClass}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Meniu pe mobil */}
      {menuOpen && (
        <div className="tablet:hidden absolute top-20 right-4 left-4 bg-white border rounded-xl shadow-lg py-6 px-4 z-50">
          <ul className="space-y-4 text-gray-800 font-robotoCondensed text-base">
            {navItems.map((item) => (
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
