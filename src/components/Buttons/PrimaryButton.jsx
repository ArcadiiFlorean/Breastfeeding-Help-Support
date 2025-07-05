import React from "react";

function PrimaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 font-medium px-6 py-3 rounded transition"
    >
      {children}
    </a>
  );
}

export default PrimaryButton;
