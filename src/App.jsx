import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import Projects from './components/Projects';
import AboutUs from './components/AboutUs';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProjectsPage from './pages/AllProjectsPage';

const HomePage = ({ theme }) => (
  <main>
    <HeroSection theme={theme} />
    <ServicesGrid theme={theme} />
    <Projects theme={theme} />
    <AboutUs theme={theme} />
    <ContactSection theme={theme} />
  </main>
);

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ultra Engineering",
    "image": "https://ultraengineeringlk.com/logo.png",
    "@id": "https://ultraengineeringlk.com",
    "url": "https://ultraengineeringlk.com",
    "telephone": "+94767107462",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Matara",
      "addressLocality": "Matara",
      "addressRegion": "Southern Province",
      "postalCode": "81000",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 5.9549,
      "longitude": 80.555
    },
    "description": "Ultra Engineering is Sri Lanka's leading specialist in underground cable fault scanning, path tracing, and high voltage testing. Precision diagnostics for industrial power networks.",
    "serviceType": [
      "Underground Cable Fault Scanning",
      "Cable Path Tracing",
      "High Voltage Cable Testing",
      "Underground Water Leak Detection"
    ],
    "areaServed": "Sri Lanka",
    "sameAs": [
      "https://www.facebook.com/share/1L9QCcJPVt/?mibextid=wwXIfr",
      "https://www.instagram.com/ultraengineering.22?igsh=aXF5MHZ5YnBpdXhi&utm_source=qr"
    ]
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Underground Cable Fault Scanning Sri Lanka | Ultra Engineering</title>
        <meta
          name="description"
          content="Leading specialists in underground cable fault scanning and path tracing in Sri Lanka. Expert high voltage testing and fault finding for industrial power grids."
        />
        <meta
          name="keywords"
          content="underground cable fault scanning Sri Lanka, cable path tracing Sri Lanka, electrical fault finding specialists, high voltage cable testing Sri Lanka, underground water leak detection, Ultra Engineering Sri Lanka, industrial cable tracing, power grid troubleshooting"
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Underground Cable Fault Scanning Sri Lanka | Ultra Engineering" />
        <meta property="og:description" content="Precision engineering solutions for underground cable tracing, fault finding, and high voltage testing across Sri Lanka." />
        <meta property="og:image" content="https://ultraengineeringlk.com/og-image.jpg" />
        <meta property="og:url" content="https://ultraengineeringlk.com" />
        <meta property="og:type" content="website" />

        <link rel="canonical" href="https://ultraengineeringlk.com" />
        <meta name="robots" content="index, follow" />
        
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Router>
        <div className="w-full min-h-screen font-sans selection:bg-electric-blue selection:text-white transition-colors duration-300">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/services" element={<HomePage theme={theme} />} />
            <Route path="/contact" element={<HomePage theme={theme} />} />
            <Route path="/projects" element={<AllProjectsPage />} />
          </Routes>
          
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

