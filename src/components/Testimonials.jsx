import React from "react";

function Testimonial() {
  return (
  <section className="bg-[#f2eefc] py-20 px-6">

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-10">
          “Marina’s calm presence was exactly what I needed. She listened with compassion,
          offered gentle guidance, and helped me feel empowered as a new mom. Breastfeeding
          was challenging at first, but with her support, I found confidence and peace.
          I’m deeply grateful for her kindness and expertise—she truly cares about every family she meets.”
        </p>

        <div className="flex justify-center items-center gap-4 mt-8">
          <img
            src="/taylor.jpg"
            alt="Taylor Bennett"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">Taylor Bennett</p>
            <p className="text-xs text-gray-500">First-time mother</p>
          </div>
          <img src="/360lab-logo.svg" alt="360Lab" className="h-6 ml-4" />
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
