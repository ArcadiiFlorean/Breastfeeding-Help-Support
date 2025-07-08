import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import SupportFeatures from "./components/SupportFeatures";
import Help from "./components/Help";
import SupportPackages from "./components/SupportPackages";
import FAQSection from "./components/FAQSection";
import Testimonials from "./components/Testimonials";
import ContactOptions from "./components/ContactOptions";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <SupportFeatures />
      <Help />
      <SupportPackages />
      <FAQSection />
      <Testimonials />
      <ContactOptions />
      <Footer />
    </>
  );
}

export default App;
