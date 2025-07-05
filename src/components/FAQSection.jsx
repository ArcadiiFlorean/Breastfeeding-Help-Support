import React from "react";

function FAQSection() {
  const faqs = [
    {
      question: "How can I tell if my baby’s full?",
      answer:
        "Watch for steady weight gain, plenty of wet diapers, and a relaxed baby after feeding. Every little one is different—trust your instincts and reach out if you need extra support.",
    },
    {
      question: "What if breastfeeding is painful?",
      answer:
        "A little tenderness is normal at first, but ongoing pain isn’t. Try adjusting your baby’s latch and position. If it still hurts, a lactation consultant can help you find comfort.",
    },
    {
      question: "How do I boost my milk supply?",
      answer:
        "Nurse often, enjoy skin-to-skin time, and stay hydrated. If you’re worried, you’re not alone—personalized support can help you find what works best for you.",
    },
    {
      question: "Is frequent feeding normal?",
      answer:
        "Absolutely! Newborns often nurse every 1–3 hours, especially during growth spurts. This helps build your milk supply and gives your baby comfort and nourishment.",
    },
  ];

  return (
    <section className="bg-[#eef5f2] py-20">

      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
          Gentle guidance for new mothers
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          Your breastfeeding questions, answered
        </h2>
        <p className="text-gray-600 text-base mb-12">
          Explore caring, expert answers to the most common breastfeeding concerns.
          You’re not alone—let’s make your feeding journey feel calm and supported.
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
