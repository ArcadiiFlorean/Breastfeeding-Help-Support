import React from "react";

function FAQSection() {
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
    <section className="bg-[#eef5f2] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
          Ghidare blândă pentru mămici
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          Întrebări frecvente despre alăptare
        </h2>
        <p className="text-gray-600 text-base mb-12">
          Descoperă răspunsuri grijulii și profesioniste la cele mai des întâlnite întrebări despre alăptare. Nu ești singură—hai să facem ca această călătorie să fie mai calmă și susținută.
        </p>

        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div key={index} className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
