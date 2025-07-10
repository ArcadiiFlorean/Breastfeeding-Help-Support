import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const packages = [
  {
    title: "Newborn Feeding Starter Session",
    desc: "Perfect for first-time parents or those needing a refresher. This 45-minute virtual session covers latch basics, feeding positions, hunger cues, and what to expect in the early days. Includes a personalized care summary and 2 days of post-session email support.",
    price: "$75",
    bg: "bg-[#dc9071]",
  },
  {
    title: "Comprehensive Lactation Consult",
    desc: "A full 90-minute session for in-depth support. Ideal for latch issues, supply concerns, or persistent feeding pain. Includes feeding assessment, custom care plan, and 5 days of follow-up email support to ensure you feel confident and cared for throughout.",
    price: "$125",
    bg: "bg-[#fef6f2]",
  },
  {
    title: "Pumping & Bottle Feeding Support",
    desc: "Learn how to introduce a bottle, build a freezer stash, and maintain supply while pumping. In this 60-minute session, we'll cover pump fit, settings, and storage tips. Includes a printable pumping guide and 3 days of post-session email support.",
    price: "$85",
    bg: "bg-[#dc9071]",
  },
  {
    title: "Prenatal Breastfeeding Prep",
    desc: "Prepare before baby arrives with this 75-minute educational session. Learn what to expect in the first weeks, how milk supply works, latch techniques, and more. Includes a prenatal checklist, feeding plan template, and 3 days of follow-up support.",
    price: "$95",
    bg: "bg-[#dc9071]",
  },
  {
    title: "Weaning Guidance & Transition Plan",
    desc: "Whether you’re weaning from breast to bottle, solids, or full weaning, this 60-minute session gives you a gentle, step-by-step plan tailored to your goals. Includes tips for emotional transitions, nutrition, and 3 days of follow-up support by email.",
    price: "$85",
    bg: "bg-[#fef6f2]",
  },
  {
    title: "Custom Lactation Care Package",
    desc: "Not sure what you need? I’ll build a care plan just for you. From ongoing support to complex challenges (twins, NICU, re-latching, etc.), pricing and structure depend on your needs. Includes a 15-min intake chat to create your personalized plan.",
    price: "Starting at $60",
    bg: "bg-[#dc9071]",
  },
];

function SupportPackages() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="SupportPackages" className="bg-[#fbfbfb] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl tablet:text-5xl laptop:text-6xl font-bold text-center text-[#b06b4c] mb-16 leading-tight font-fjalla"
          data-aos="fade-up"
        >
          Pachete de Sprijin pentru Alăptare
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group transform transition-all duration-300 ease-in-out hover:scale-[1.05] hover:-translate-y-2"
            >
              <div
                className={`rounded-3xl p-6 flex flex-col items-center text-center shadow-md transition-all duration-300 ease-in-out group-hover:shadow-2xl cursor-pointer ${pkg.bg} ${
                  pkg.bg === "bg-[#fef6f2]" ? "text-gray-800" : "text-white"
                }`}
              >
                <div className="mb-6">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 mx-auto"
                    fill="none"
                  >
                    <circle cx="32" cy="32" r="30" fill="#fdeae1" />
                    <path
                      d="M32 14 C36 20, 44 20, 44 32 C44 44, 36 44, 32 50 C28 44, 20 44, 20 32 C20 20, 28 20, 32 14 Z"
                      fill="#ffccd5"
                    />
                    <circle cx="32" cy="32" r="6" fill="#b06b4c" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 font-robotoCondensed leading-snug">
                  {pkg.title}
                </h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">
                  {pkg.desc}
                </p>
                <span className="text-2xl font-bold tracking-tight">{pkg.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportPackages;
