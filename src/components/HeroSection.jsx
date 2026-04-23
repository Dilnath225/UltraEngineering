import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

const HeroSection = ({ theme }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-tech">
      {/* Three.js Particle Network Background */}
      <HeroCanvas theme={theme} />

      {/* Soft gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-gray-100/80 dark:to-charcoal-dark/90" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Panel */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center lg:justify-start space-x-2 mb-6"
            >
              <span className="h-1.5 w-12 bg-blue-600 dark:bg-electric-blue rounded-full"></span>
              <span className="text-blue-700 dark:text-electric-blue font-bold tracking-widest uppercase text-sm">Industrial Grade</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white"
            >
              ULTRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-400 dark:from-white dark:to-gray-400">ENGINEERING</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold mb-8 text-gray-700 dark:text-gray-300"
            >
              Precision Electrical & <br className="hidden md:block" /> Cable Solutions.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0"
            >
              State-of-the-art diagnostic equipment and expert engineering for fault finding, path tracing, and high-voltage rectification. We ensure your circuits never break.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a href="#services" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-electric-blue text-white rounded-full font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(0,162,255,0.4)] transition-all transform hover:-translate-y-1">
                Our Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="tel:+94767107462" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:border-blue-600 dark:hover:border-electric-blue hover:text-blue-600 dark:hover:text-electric-blue transition-all">
                <PhoneCall className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </motion.div>
          </div>
          
          {/* Visual Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-full"
          >
            <div className="absolute inset-0 bg-blue-600 dark:bg-electric-blue opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-40 dark:opacity-60 dark:from-charcoal-dark"></div>
              <video 
                src="/homeultra.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto object-cover aspect-square lg:aspect-auto lg:h-[600px]"
              />
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-6 left-6 z-20"
              >
                <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">Advanced Shielding Tech</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
