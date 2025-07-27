import React, { useEffect, useState } from "react";

function SupportPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Înlocuiește cu URL-ul tău real către API
      const response = await fetch(
        "http://localhost/Consultant-Land-Page/api/services.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Services received:", result); // Debug

      if (result.success) {
        setPackages(result.data);
      } else {
        throw new Error(result.message || "Error loading services");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError(`Could not load services: ${error.message}`);
      setLoading(false);

      // Fallback la servicii statice în caz de eroare
      setPackages([
        {
          id: 1,
          name: "Initial Consultation",
          description:
            "First meeting to assess your needs and establish a personalised breastfeeding plan.",
          price: "75",
          currency: "GBP",
          popular: false,
          features: [
            "Complete assessment",
            "Personalised plan",
            "Digital guide",
            "24h support",
          ],
          icon: "consultation",
        },
        {
          id: 2,
          name: "Complete Care Package",
          description:
            "Comprehensive support for your entire breastfeeding journey with multiple sessions and continuous monitoring.",
          price: "199",
          currency: "GBP",
          popular: true,
          features: [
            "5 sessions",
            "Continuous monitoring",
            "Nutritional plan",
            "Private community",
            "24/7 emergencies",
          ],
          icon: "premium",
        },
        {
          id: 3,
          name: "Emergency Session",
          description:
            "Rapid support for urgent breastfeeding situations available at any time.",
          price: "95",
          currency: "GBP",
          popular: false,
          features: [
            "Rapid response",
            "Immediate consultation",
            "Action plan",
            "Free follow-up",
          ],
          icon: "emergency",
        },
      ]);
    }
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case "consultation":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "premium":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case "emergency":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#dc9071]"></div>
            </div>
            <p className="text-[#b06b4c] text-lg font-medium">
              Loading services...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchServices}
              className="bg-[#dc9071] hover:bg-[#c87d5a] text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="SupportPackages"
      className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#dc9071]/10 to-[#fef6f2]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#dc9071]/10 to-[#fef6f2]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#fef6f2]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#dc9071] to-[#b06b4c] rounded-full mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#b06b4c] mb-4 leading-tight">
            Support Packages
          </h2>
          <h3 className="text-2xl md:text-3xl font-medium text-[#dc9071] mb-6">
            for Breastfeeding
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect solution for your breastfeeding journey. Each
            package is carefully crafted to provide the support you need.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative group ${
                pkg.popular ? "lg:scale-105 lg:-mt-4" : ""
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#dc9071] to-[#b06b4c] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`
                relative h-full bg-white rounded-3xl shadow-xl transition-all duration-500 ease-out
                group-hover:shadow-2xl group-hover:-translate-y-2
                ${
                  pkg.popular
                    ? "border-2 border-[#dc9071]/20"
                    : "border border-gray-100"
                }
                overflow-hidden
              `}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#dc9071] to-[#fef6f2]"></div>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc9071' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  ></div>
                </div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg
                    ${
                      pkg.popular
                        ? "bg-gradient-to-br from-[#dc9071] to-[#b06b4c] text-white"
                        : "bg-gradient-to-br from-[#fef6f2] to-white text-[#dc9071] border border-[#dc9071]/20"
                    }
                  `}
                  >
                    {getIcon(pkg.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#b06b4c] mb-3 leading-tight">
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-[#b06b4c] mb-3 uppercase tracking-wide">
                      Includes:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 text-[#dc9071] mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div
                      className={`
                      inline-flex items-baseline px-6 py-4 rounded-2xl
                      ${
                        pkg.popular
                          ? "bg-gradient-to-r from-[#dc9071] to-[#b06b4c] text-white"
                          : "bg-gradient-to-r from-[#fef6f2] to-orange-50 text-[#b06b4c]"
                      }
                    `}
                    >
                      <span className="text-3xl font-bold">{pkg.price}</span>
                      <span className="text-lg ml-1">{pkg.currency}</span>
                      <span
                        className={`text-sm ml-2 ${
                          pkg.popular ? "text-white/80" : "text-[#dc9071]"
                        }`}
                      >
                        per session
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`
                    w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300
                    transform group-hover:scale-105 shadow-lg hover:shadow-xl
                    ${
                      pkg.popular
                        ? "bg-gradient-to-r from-[#dc9071] to-[#b06b4c] text-white hover:from-[#c87d5a] hover:to-[#9d5a3f]"
                        : "bg-white text-[#dc9071] border-2 border-[#dc9071] hover:bg-[#dc9071] hover:text-white"
                    }
                  `}
                  >
                    {pkg.popular ? "Choose Popular ✨" : "Select Package"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-white/20">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#dc9071] to-[#b06b4c] rounded-full mb-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[#b06b4c] mb-4">
              Ready to start your journey?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Not sure which package is right for you? Book a free 15-minute
              consultation to discuss your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-[#dc9071] to-[#b06b4c] hover:from-[#c87d5a] hover:to-[#9d5a3f] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                📞 Free Consultation
              </button>
              <button className="bg-white text-[#dc9071] border-2 border-[#dc9071] hover:bg-[#dc9071] hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                💬 Send Message
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200/50">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#dc9071] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  International certification
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#dc9071] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  500+ mothers helped
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#dc9071] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Available 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportPackages;
