import React from "react";

function Testimonial() {
  return (
    <section className="bg-[#f2eefc] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-10">
          „Prezența calmă a Marinei a fost exact ce aveam nevoie. M-a ascultat cu empatie,
          mi-a oferit ghidare blândă și m-a ajutat să capăt încredere în mine ca mamă la început de drum.
          Alăptarea a fost o provocare la început, dar cu sprijinul ei, am găsit liniște și curaj.
          Sunt profund recunoscătoare pentru bunătatea și profesionalismul ei — se vede că are grijă sinceră de fiecare familie pe care o întâlnește.”
        </p>

        <div className="flex justify-center items-center gap-4 mt-8">
          <img
            src="/taylor.jpg"
            alt="Taylor Bennett"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">Taylor Bennett</p>
            <p className="text-xs text-gray-500">Mamă pentru prima dată</p>
          </div>
          <img src="/360lab-logo.svg" alt="360Lab" className="h-6 ml-4" />
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
