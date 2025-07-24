import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function HeaderNavbar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const commonClass =
    "text-[1em] font-normal font-robotoCondensed text-black hover:text-[#cb8645] no-underline transition-colors duration-200";

  const navItems = [
    { href: "#page-0", label: "Home" },
    { href: "#AboutMe", label: "Despre mine" },
    { href: "#SupportFeatures", label: "Sprijin" },
    { href: "#Help", label: "Cum te pot ajuta" },
    { href: "#SupportPackages", label: "Prețuri" },
    { href: "#FAQSection", label: "Întrebări" },
    { href: "#Testimonials", label: "Recenzii" },
  ];

  const contactItem = { href: "#ContactOptions", label: "Contact" };

  return (
    <>
      {/* Desktop/Tablet Nav */}
      <nav
        data-aos="fade-down"
        className="hidden tablet:flex gap-6 items-center text-gray-700 text-xl font-robotoCondensed"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={commonClass}>
            {item.label}
          </a>
        ))}

        {/* Contact (outline button) */}
        <a
          href={contactItem.href}
          className="px-4 py-2 rounded-lg border border-[#cb8645] text-[#cb8645] font-semibold hover:bg-[#fef6f2] transition-colors duration-200"
        >
          {contactItem.label}
        </a>

        {/* ✅ Programează-te (React Router Link) */}
        <Link
          to="/BookingWizard"
          className="px-4 py-2 rounded-lg bg-[#cb8645] text-white font-semibold shadow hover:bg-[#a25f34] transition-colors duration-200"
        >
          Programează-te
        </Link>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <div
          data-aos="fade-down"
          className="tablet:hidden absolute top-20 right-4 left-4 bg-white border rounded-xl shadow-lg py-6 px-4 z-50"
        >
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
            <li>
              <a
                href={contactItem.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded border border-[#cb8645] text-[#cb8645] font-semibold hover:bg-[#fef6f2] transition-all duration-200"
              >
                {contactItem.label}
              </a>
            </li>
            {/* ✅ Mobile - Programează-te */}
            <li>
              <Link
                to="/booking"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded bg-[#cb8645] text-white font-semibold hover:bg-[#a25f34] transition-all duration-200"
              >
                Programează-te
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default HeaderNavbar;
