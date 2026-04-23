import React from 'react';
import { Microchip, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AboutCanvas from './AboutCanvas';

const AboutUs = ({ theme }) => {
  return (
    <section id="about" className="relative py-24 bg-gradient-tech overflow-hidden transition-colors">
      <AboutCanvas theme={theme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-4 bg-blue-100 dark:bg-electric-blue/20 blur-3xl rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-transparent to-transparent z-10 opacity-40 dark:opacity-70 dark:from-charcoal-dark"></div>
              <img 
                src="/multimeter_about_1776613640499.png" 
                alt="Multimeter on workbench with cables" 
                className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-[1.03] transition-transform duration-700" 
              />
              
              {/* Overlay Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 left-6 z-20 bg-white/90 dark:bg-charcoal-dark/80 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center space-x-4 shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-electric-blue/10 rounded-full flex items-center justify-center border border-blue-200 dark:border-electric-blue/30">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-electric-blue" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-bold">100% Precision</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Diagnostic Guarantee</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="h-1.5 w-12 bg-blue-600 dark:bg-electric-blue rounded-full"></span>
              <span className="text-blue-700 dark:text-electric-blue font-bold tracking-widest uppercase text-sm">About Us</span>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">State-of-the-Art <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-electric-blue dark:to-blue-400">Testing Equipment</span></h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              At Ultra Engineering, we pride ourselves on utilizing advanced, industry-leading diagnostic tools. Our professional teams are equipped to handle complex fault findings and precise tracing across both underground and overhead domains. 
              Trust in advanced technology paired with deep engineering expertise.
            </p>
            
            <motion.ul 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="space-y-4 mb-10"
            >
              {['Advanced Multimeter Diagnostics', 'Pinpoint Accuracy Fault Location', 'Certified Electrical Engineers', 'Rapid Response & Rectification'].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-electric-blue mr-3 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white dark:bg-charcoal-light border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-start shadow-sm"
            >
              <Microchip className="w-8 h-8 text-blue-600 dark:text-electric-blue mt-1 flex-shrink-0 mr-4 hidden sm:block" />
              <div>
                <h4 className="text-gray-900 dark:text-white font-bold mb-2">Modern Technology Infrastructure</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We continually invest in the newest shielding analyses and megger testing arrays to maintain uncompromised continuity and safety for high-voltage networks.</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
