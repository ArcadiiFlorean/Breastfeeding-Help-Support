import React from "react";
import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
import StepPayment from "./components/BookingWizard/steps/StepPayment";


// Stripe public key
const stripePromise = loadStripe("pk_test_51RX5afGbmcCvmvOdy7YGcVdAVtbtFRb8K44iUc8PfSENZfS4VDgb8oRr1Ev8bL0s761UjSESgbeUErjbAFbf9szi000m7J4TA6");

// HomePage secvențial
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
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BookingWizard" element={<BookingWizard />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/payment" element={<StepPayment />} /> {/* ✅ Nou */}
      </Routes>
    </Elements>
  );
}

export default App;
