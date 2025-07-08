import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function FAQSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const faqs = [
    {
      question: "Cum îmi dau seama dacă bebelușul este sătul?",
      answer:
        "Urmărește creșterea în greutate, scutece ude frecvent și un bebeluș liniștit după alăptare. Fiecare copil e diferit—ascultă-ți instinctul și cere ajutor dacă ai nevoie.",
    },
    {
      question: "Ce fac dacă alăptarea e dureroasă?",
      answer:
        "O ușoară sensibilitate e normală la început, dar durerea constantă nu este. Încearcă să ajustezi atașarea sau poziția copilului. Dacă durerea persistă, un consultant în alăptare te poate ajuta.",
    },
    {
      question: "Cum pot stimula producția de lapte?",
      answer:
        "Alăptează des, petrece timp piele-pe-piele și hidratează-te suficient. Dacă te îngrijorează ceva, nu ești singură—sprijinul personalizat te poate ajuta să găsești ce funcționează pentru tine.",
    },
    {
      question: "Este normal ca bebelușul să ceară des sân?",
      answer:
        "Absolut! Nou-născuții cer sân la fiecare 1–3 ore, mai ales în perioadele de creștere accelerată. Acest lucru ajută la formarea rezervei de lapte și oferă confort și hrană bebelușului.",
    },
  ];

  return (
    <section id="FAQSection" className="bg-[#D39473] py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* TEXTUL pe stânga */}
        <div data-aos="fade-right">
          <p className="text-sm text-white uppercase tracking-wide mb-2">
            Ghidare blândă pentru mămici
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Întrebări frecvente despre alăptare
          </h2>
          <p className="text-white/90 text-base mb-10">
            Descoperă răspunsuri grijulii și profesioniste la cele mai des întâlnite întrebări despre alăptare. Nu ești singură—hai să facem ca această călătorie să fie mai calmă și susținută.
          </p>

          <div className="space-y-8">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border-t border-white/50 pt-5"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-white/90">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGINE pe dreapta */}
        <div className="flex justify-center lg:justify-end" data-aos="fade-left">
          <img
            src="/Hero_img-COPY.png"
            alt="Întrebări frecvente"
            className="w-full max-w-md lg:max-w-lg rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
