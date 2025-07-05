import React from "react";
import HeaderNavbar from "./HeaderNavbar";
import HeaderSocial from "./HeaderSocial";

function Header() {
  return (
    <header className="bg-[#fef6f2] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo Consult" className="w-6 h-6" />
          <span className="text-gray-800 font-medium text-lg">
        Place for logo
          </span>
        </div>

        {/* Navigație */}
        <HeaderNavbar />

        {/* Social media */}
        <HeaderSocial />
      </div>
    </header>
  );
}

export default Header;