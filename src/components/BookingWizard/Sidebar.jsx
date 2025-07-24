import React from "react";

const steps = [
  { id: 1, label: "Data și ora", icon: "📅" },
  { id: 2, label: "Informatia ta", icon: "👤" },
  { id: 3, label: "Plăți", icon: "💳" },
];

function Sidebar({ step }) {
  return (
    <div className="w-64 bg-[#4a584b] text-white p-4 flex flex-col">
      {steps.map((s) => (
        <div
          key={s.id}
          className={`flex items-center gap-3 p-3 mb-2 rounded ${
            s.id === step
              ? "bg-white text-[#4a584b] font-bold"
              : s.id < step
              ? "bg-green-600"
              : "bg-gray-600"
          }`}
        >
          <span>{s.icon}</span>
          <span>{s.label}</span>
        </div>
      ))}
      <div className="mt-auto text-sm">
        <button className="text-white hover:underline">Restrângeți meniul →</button>
      </div>
    </div>
  );
}

export default Sidebar;
