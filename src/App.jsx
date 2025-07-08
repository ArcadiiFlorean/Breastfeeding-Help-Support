import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SupportPackages from "./components/SupportPackages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";



function PricingPage() {
  return (
    <>
      <Header />
      <SupportPackages />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
