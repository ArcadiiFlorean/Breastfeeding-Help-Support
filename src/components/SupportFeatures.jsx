import React from "react";
import {
  FaQuoteRight,
  FaComments,
  FaEnvelope,
  FaCheckCircle,
  FaHeart,
  FaStar,
} from "react-icons/fa";

function SupportFeatures() {
  const features = [
    {
      icon: <FaQuoteRight size={24} className="text-orange-500" />,
      title: "Gentle, expert guidance",
      desc: "You’ll receive caring, personalized support for every stage—always with warmth and understanding.",
    },
    {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "Trusted, up-to-date care",
      desc: "Feel confident with advice rooted in the latest research, shared in a way that’s easy to follow.",
    },
    {
      icon: <FaEnvelope size={24} className="text-orange-500" />,
      title: "Care on your terms",
      desc: "Choose in-person or virtual visits—flexible options to fit your life and comfort.",
    },
    {
      icon: <FaCheckCircle size={24} className="text-orange-500" />,
      title: "Steady, ongoing support",
      desc: "Stay connected with regular check-ins and encouragement, so you always feel heard.",
    },
    {
      icon: <FaHeart size={24} className="text-orange-500" />,
      title: "Welcoming every family",
      desc: "All backgrounds, goals, and parenting styles are embraced—your journey is honored here.",
    },
    {
      icon: <FaStar size={24} className="text-orange-500" />,
      title: "Calm, soothing space",
      desc: "Relax in a peaceful, judgment-free setting designed to help you feel at ease.",
    },
  ];

  return (
 <section className="bg-[#f3e8ff] py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
          Support that feels like home
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
          Nurture. Empower. Begin with confidence.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-[#fbcbb2] p-3 rounded">{item.icon}</div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="#booking"
            className="bg-[#fbcbb2] hover:bg-[#f7b99b] text-gray-800 font-medium px-6 py-3 rounded transition"
          >
            Book now
          </a>
        </div>
      </div>
    </section>
  );
}

export default SupportFeatures;
