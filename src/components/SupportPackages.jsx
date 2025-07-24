import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function SupportPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Culori alternante pentru background-uri
  const backgroundColors = ["bg-[#dc9071]", "bg-[#fef6f2]"];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Calea corectă conform testului tău
      const response = await fetch(
        "http://localhost/Consultant-Land-Page/api/services.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Servicii primite:", result); // Debug

      // services.php returnează {success: true, data: [...]}
      if (result.success) {
        setPackages(result.data);
      } else {
        throw new Error(result.message || "Eroare la încărcarea serviciilor");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError(`Nu s-au putut încărca serviciile: ${error.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="SupportPackages" className="bg-[#fbfbfb] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b06b4c] mx-auto"></div>
            <p className="mt-4 text-[#b06b4c]">Se încarcă serviciile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="SupportPackages" className="bg-[#fbfbfb] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
          {packages.map((pkg, index) => {
            const bgColor = backgroundColors[index % 2];
            const textColor =
              bgColor === "bg-[#fef6f2]" ? "text-gray-800" : "text-white";

            return (
              <div
                key={pkg.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group transform transition-all duration-300 ease-in-out hover:scale-[1.05] hover:-translate-y-2"
              >
                <div
                  className={`rounded-3xl p-6 flex flex-col items-center text-center shadow-md transition-all duration-300 ease-in-out group-hover:shadow-2xl cursor-pointer ${bgColor} ${textColor}`}
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
                    {pkg.name}
                  </h3>
                  <p className="text-sm opacity-90 mb-6 leading-relaxed">
                    {pkg.description || "Descriere în curs de actualizare..."}
                  </p>
                  <span className="text-2xl font-bold tracking-tight">
                    {pkg.price} {pkg.currency || "RON"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {packages.length === 0 && !loading && (
          <div className="text-center text-gray-600">
            <p>Nu sunt servicii disponibile momentan.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SupportPackages;
