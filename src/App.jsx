import React from "react";
import { Routes, Route } from "react-router-dom";

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
import BookingWizard from './components/BookingWizard/BookingWizard';
import ThankYou from "./components/ThankYou";

// 👇 HomePage construit manual din secțiuni
function HomePage() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
         <Route path="/BookingWizard" element={<BookingWizard />} />
      <Route path="/thankyou" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
