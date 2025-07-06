import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero";
import SupportFeatures from "./components/SupportFeatures";
import SupportPackages from "./components/SupportPackages";
import FAQSection from "./components/FAQSection";
import Testimonials from "./components/Testimonials";
import ContactOptions from "./components/ContactOptions";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";

function App() {
  return (
    <>
      <Header />
      <Hero /> 
       <AboutMe />
      <SupportFeatures />
    
      <SupportPackages />
      <FAQSection />
      <Testimonials />
      <ContactOptions />
      <Footer />
    </>
  );
}

export default App;
