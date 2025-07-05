import React from "react";

function Header() {
  return (
    <header className="bg-[#fcdfef] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo Consult" className="w-6 h-6" />
          <span className="text-gray-800 font-medium text-lg">Consult Marina</span>
        </div>

        {/* Navigație */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700 text-sm">
          <div className="relative group">
            <button className="hover:text-gray-900">Sprijin ▼</button>
            {/* dropdown opțional */}
          </div>
          <a href="#about" className="hover:text-gray-900">Despre</a>
          <a href="#blog" className="hover:text-gray-900">Articole</a>
          <div className="relative group">
            <button className="hover:text-gray-900">Ajutor ▼</button>
            {/* dropdown opțional */}
          </div>
        </nav>

        {/* Buton programare */}
        <a
          href="#booking"
          className="bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 text-sm font-medium px-4 py-2 rounded transition"
        >
          Programează-te
        </a>
      </div>
    </header>
  );
}

export default Header;
