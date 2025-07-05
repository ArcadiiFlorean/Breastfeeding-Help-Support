import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";

import Footer from "./components/Footer";
import SupportFeatures from "./components/SupportFeatures";
import SupportPackages from "./components/SupportPackages";
import FAQ from "./components/FAQSection";

import Testimonials from "./components/Testimonials";
import ContactOptions from "./components/ContactOptions";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <SupportFeatures />
      <SupportPackages />
      <FAQ />
      <Testimonials />
      <ContactOptions />
      <Footer />
    </>
  );
}
export default App;
