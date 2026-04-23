import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

const HeroSection = ({ theme }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-100 dark:bg-charcoal-dark">
      
      {/* Modern Fade Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Image on the right side, fading to transparent on the left */}
        <div 
          className="absolute inset-0 w-full h-full lg:w-[70%] lg:left-auto lg:right-0 opacity-40 lg:opacity-100"
          style={{
            backgroundImage: 'url("/ultrabg.jpeg")',
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0">
        <div className="max-w-2xl">
          
          {/* Text Panel */}
          <div className="flex flex-col justify-center text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-start space-x-2 mb-6"
            >
              <span className="h-1.5 w-12 bg-blue-600 dark:bg-electric-blue rounded-full"></span>
              <span className="text-blue-700 dark:text-electric-blue font-bold tracking-widest uppercase text-sm drop-shadow-md">Industrial Grade</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white drop-shadow-sm"
            >
              ULTRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 dark:from-white dark:to-gray-400">ENGINEERING</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200"
            >
              Precision Electrical & <br className="hidden md:block" /> Cable Solutions.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl"
            >
              State-of-the-art diagnostic equipment and expert engineering for fault finding, path tracing, and high-voltage rectification. We ensure your circuits never break.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a href="#services" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-electric-blue text-white rounded-full font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(0,162,255,0.4)] transition-all transform hover:-translate-y-1">
                Our Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="tel:+94767107462" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/50 dark:bg-black/30 backdrop-blur-sm border-2 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:border-blue-600 dark:hover:border-electric-blue hover:text-blue-600 dark:hover:text-electric-blue transition-all">
                <PhoneCall className="mr-2 w-5 h-5" />
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
