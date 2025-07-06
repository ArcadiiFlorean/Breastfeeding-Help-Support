import React, { useState } from "react";
import HeaderNavbar from "./HeaderNavbar";
import HeaderSocial from "./HeaderSocial";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#fef6f2] shadow-sm pt-4">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="Header_Logo.jpg"
            alt="Logo Consult"
            className="w-16 h-16 rounded-full border-2 border-white shadow"
          />
          <span className="text-gray-800 font-medium text-lg"></span>
        </div>

        {/* Navigație */}
        <HeaderNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Social + burger */}
        <div className="flex items-center gap-4">
          <HeaderSocial />

          {/* Buton burger (mobil/tabletă) */}
          <button
            className="block tablet:hidden text-amber-800 focus:outline-none"
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
        </div>
      </div>
    </header>
  );
}

export default Header;
