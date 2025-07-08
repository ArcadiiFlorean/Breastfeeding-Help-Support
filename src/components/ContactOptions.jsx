import React from "react";
import {
  FaEnvelope,
  FaComments,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";

function ContactOptions() {
  const contacts = [
    {
      icon: <FaEnvelope size={24} className="text-orange-500" />,
      title: "Email",
      text: "Trimite întrebări sau gânduri oricând.",
      value: "macociug@mail.com",
      link: "mailto:macociug@mail.com",
    },
    {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "Telefon",
      text: "Disponibilă de luni până vineri, între orele 8:00–17:00.",
      value: "+373 69 123 456",
      link: "tel:+37369123456",
    },
     {
      icon: <FaComments size={24} className="text-orange-500" />,
      title: "Insatgram",
      text: "24/24 pentru întrebări rapide.",
      value: "@marina.cociug",
      link: "https://www.instagram.com/marina.cociug/",
    },
    
  ];

  return (
    <section
      id="ContactOptions"
      className="bg-[#fcf7ed] py-20 px-6 text-center"
    >
      <p className="text-sm font-medium text-gray-500 uppercase mb-3 tracking-wide">
        Hai să luăm legătura
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Sprijinul e la un mesaj distanță
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Scrie-mi dacă ai întrebări, ai nevoie de sprijin sau dorești să
        programezi o ședință—sunt aici pentru tine.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {contacts.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-orange-100 p-3 rounded">{item.icon}</div>
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
              <p className="mt-2 text-sm font-medium text-gray-800">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactOptions;
