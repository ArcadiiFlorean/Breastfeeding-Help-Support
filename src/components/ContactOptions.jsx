import React from "react";
import { FaEnvelope, FaComments, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";

function ContactOptions() {
  const contacts = [
    {
      icon: <FaEnvelope size={24} className="text-orange-500" />,
      title: "Email",
      text: "Send your thoughts or concerns anytime.",
      value: "hello@consultmarina.com",
      link: "mailto:hello@consultmarina.com",
    },
    {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "Call",
      text: "Available weekdays, 8am–5pm for support.",
      value: "+1 (555) 321-7890",
      link: "tel:+15553217890",
    },
    {
      icon: <FaMapMarkerAlt size={24} className="text-orange-500" />,
      title: "Visit office",
      text: "A calm, welcoming space awaits you.",
      value: "101 Blossom Ave, SF, CA",
    },
    {
      icon: <FaShoppingCart size={24} className="text-orange-500" />,
      title: "Visit store",
      text: "Explore gentle care essentials in person.",
      value: "101 Blossom Ave, SF, CA",
    },
  ];

  return (
     <section className="bg-[#fcf7ed] py-20 px-6 text-center">
      <p className="text-sm font-medium text-gray-500 uppercase mb-3 tracking-wide">
        Let’s connect
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Support is just a message away
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Reach out with questions or to book your session—I’m here for you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {contacts.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-orange-100 p-3 rounded">
              {item.icon}
            </div>
            <h3 className="mt-4 font-medium text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.text}</p>
            {item.link ? (
              <a
                href={item.link}
                className="mt-2 text-sm text-blue-800 underline hover:text-blue-600"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-sm font-medium text-gray-800">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactOptions;
