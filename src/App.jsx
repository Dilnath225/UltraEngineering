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

  return (
    <HelmetProvider>
      <Helmet>
        <title>Ultra Engineering | Underground Cable Scanning & Fault Finding Sri Lanka</title>
        <meta
          name="description"
          content="Ultra Engineering – Sri Lanka's trusted experts in underground cable scanning, overhead cable fault finding, earth insulation testing, and electrical diagnostics in Matara and across the Southern Province."
        />
        <meta
          name="keywords"
          content="Underground cable scanning Sri Lanka, Overhead cable fault finding, Earth insulation testing Matara, cable tracing Sri Lanka, electrical fault finding, megger testing, cable path tracing, Ultra Engineering"
        />
        <link rel="canonical" href="https://ultra-engineering-chi.vercel.app" />
        <meta property="og:title" content="Ultra Engineering | Precision Electrical & Cable Solutions – Sri Lanka" />
        <meta property="og:description" content="Professional underground & overhead cable fault finding, earth resistance testing, and insulation diagnostics across Sri Lanka." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ultra-engineering-chi.vercel.app" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ultra Engineering" />
      </Helmet>

      <Router>
        <div className="w-full min-h-screen font-sans selection:bg-electric-blue selection:text-white transition-colors duration-300">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} />
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
