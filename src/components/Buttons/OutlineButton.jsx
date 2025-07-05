import React from "react";

function OutlineButton({ href, children }) {
  return (
    <a
      href={href}
      className="border border-gray-500 text-gray-800 font-medium px-6 py-3 rounded transition hover:bg-gray-100"
    >
      {children}
    </a>
  );
}

export default OutlineButton;
