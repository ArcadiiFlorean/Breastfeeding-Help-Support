import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: `„Prezența calmă a Marinei a fost exact ce aveam nevoie. M-a ascultat cu empatie, mi-a oferit ghidare blândă și m-a ajutat să capăt încredere în mine ca mamă la început de drum.”`,
    name: "Cristina Ionescu",
    role: "Mamă pentru prima dată",
    image: "/Header_Logo.jpg",
  },
  {
    text: `„Sprijinul oferit de Marina a fost mai mult decât profesionist — a fost uman. Recomand cu tot sufletul.”`,
    name: "Laura Popescu",
    role: "Mamă din Chișinău",
    image: "/Header_Logo.jpg",
  },
  {
    text: `„Fără ea aș fi renunțat la alăptare. Mi-a oferit informații clare și mi-a dat curajul să continui. Mulțumesc, Marina!”`,
    name: "Irina Dobre",
    role: "Mamă singură",
    image: "/Header_Logo.jpg",
  },
];

function Testimonial() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  const goNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const goPrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const startSlider = () => {
    intervalRef.current = setInterval(goNext, 4000);
  };

  const stopSlider = () => clearInterval(intervalRef.current);

  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, []);

  const current = testimonials[index];

  return (
    <section
      id="Testimonials"
      className="bg-[#fbfbfb] py-20 px-6"
      onMouseEnter={stopSlider}
      onMouseLeave={startSlider}
    >
      <div className="max-w-5xl mx-auto text-center relative px-6 min-h-[300px] flex flex-col justify-center items-center overflow-hidden transition-all duration-500">
        {/* Buton stânga */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Conținut testimonial */}
        <div
          key={index}
          className={`transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          } max-w-4xl`}
        >
          <p className="text-2xl md:text-3xl font-playwrite text-gray-800 leading-relaxed mb-12">
            {current.text}
          </p>

          <div className="flex justify-center items-center gap-6 mt-6">
            <img
              src={current.image}
              alt={current.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-lg font-playwrite text-gray-800">{current.name}</p>
              <p className="text-sm text-gray-600">{current.role}</p>
            </div>
          </div>
        </div>

        {/* Buton dreapta */}
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </section>
  );
}

export default Testimonial;
