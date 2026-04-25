import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

const HeroSection = ({ theme }) => {
  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 lg:pt-20 overflow-hidden bg-gray-100 dark:bg-charcoal-dark">

      {/* Modern Fade Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Image on the right side, fading to transparent on the left */}
        <div
          className="absolute inset-0 w-full h-full lg:w-[70%] lg:left-auto lg:right-0 opacity-40 lg:opacity-100"
          style={{
            backgroundImage: 'url("/ultrabgfinal.PNG")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)'
          }}
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/95 to-transparent dark:from-charcoal-dark dark:via-charcoal-dark/95 dark:to-transparent w-full lg:w-[60%]" />
      </div>

      {/* Three.js Particle Network Background restricted to details side */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[60%] z-[1] pointer-events-none opacity-60"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
        }}
      >
        <HeroCanvas theme={theme} />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6 lg:py-0">
        <div className="max-w-3xl">

          {/* Text Panel */}
          <div className="flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-start space-x-3 mb-4"
            >
              <span className="h-px w-10 bg-blue-600 dark:bg-electric-blue"></span>
              <span className="text-blue-700 dark:text-electric-blue font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Industrial Grade</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-black tracking-tight mb-3 leading-[1.05] text-gray-900 dark:text-white"
            >
              <span className="block text-sm md:text-lg text-blue-600 dark:text-electric-blue mb-1 tracking-[0.2em] font-extrabold uppercase">ULTRA ENGINEERING</span>
              <span className="block drop-shadow-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Underground <br className="hidden sm:block" /> Cable Fault Scanning</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg font-bold mb-6 text-gray-800 dark:text-gray-200 tracking-tight max-w-2xl"
            >
              Precision <span className="text-blue-600 dark:text-electric-blue">Path Tracing & High Voltage Diagnostics</span> Specialists in Sri Lanka
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed font-medium"
            >
              Specializing in high-precision underground cable fault finding, path tracing, and high-voltage rectification across Sri Lanka. Engineered for reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a href="#services" className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 dark:bg-electric-blue text-white rounded-full font-bold text-sm md:text-base hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(0,162,255,0.4)] transition-all transform hover:-translate-y-1">
                Our Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="tel:+94767107462" className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm border-2 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white rounded-full font-bold text-sm md:text-base hover:border-blue-600 dark:hover:border-electric-blue hover:text-blue-600 dark:hover:text-electric-blue transition-all">
                <PhoneCall className="mr-2 w-4 h-4" />
                Call Now
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
