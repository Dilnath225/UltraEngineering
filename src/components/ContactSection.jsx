import React from 'react';
import { Send, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCanvas from './ContactCanvas';

const ContactSection = ({ theme }) => {
  return (
    <section id="contact" className="relative py-24 bg-gray-100 dark:bg-charcoal-dark border-y border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
      <ContactCanvas theme={theme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-blue-600 dark:text-electric-blue font-bold tracking-widest uppercase text-sm mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Request Your Quote Today</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Facing an electrical fault or need professional cable tracing? Reach out to our engineering team immediately for rigorous troubleshooting.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-gray-50 dark:bg-charcoal-light p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-electric-blue/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            
            <form action="https://formsubmit.co/your-email@example.com" method="POST" className="relative z-10 space-y-6">
              {/* Optional: Formsubmit configuration */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Service Request from Ultra Engineering" />
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : '#'} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Full Name</label>
                  <input type="text" name="name" required className="w-full bg-gray-50 dark:bg-charcoal-dark border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-electric-blue focus:ring-1 focus:ring-blue-600 dark:focus:ring-electric-blue transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Phone Number</label>
                  <input type="tel" name="phone" required className="w-full bg-gray-50 dark:bg-charcoal-dark border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-electric-blue focus:ring-1 focus:ring-blue-600 dark:focus:ring-electric-blue transition-colors" placeholder="+94 7X XXX XXXX" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Email Address</label>
                <input type="email" name="email" required className="w-full bg-gray-50 dark:bg-charcoal-dark border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-electric-blue focus:ring-1 focus:ring-blue-600 dark:focus:ring-electric-blue transition-colors" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Service Required Details</label>
                <textarea rows="4" name="message" required className="w-full bg-gray-50 dark:bg-charcoal-dark border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-electric-blue focus:ring-1 focus:ring-blue-600 dark:focus:ring-electric-blue transition-colors" placeholder="Describe your fault finding or tracing requirements..."></textarea>
              </div>
              
              <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-electric-blue text-white rounded-lg font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,162,255,0.4)] transition-all transform hover:-translate-y-0.5">
                <Send className="mr-2 w-5 h-5" />
                Send Request
              </button>
            </form>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 dark:bg-charcoal-light border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-blue-300 dark:hover:border-electric-blue/30 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-gray-50 dark:bg-charcoal-dark rounded-lg flex items-center justify-center mb-4 border border-gray-100 dark:border-transparent">
                <Phone className="w-6 h-6 text-blue-600 dark:text-electric-blue" />
              </div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-2">Call Us Directive</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Rapid response lines for emergency fault finding.</p>
              <div className="mt-4 space-y-1">
                <a href="tel:+94767107462" className="block text-blue-700 dark:text-electric-blue font-semibold hover:underline">076-710-7462</a>
                <a href="tel:+94756007462" className="block text-blue-700 dark:text-electric-blue font-semibold hover:underline">075-600-7462</a>
                <a href="tel:+94362265822" className="block text-blue-700 dark:text-electric-blue font-semibold hover:underline">036-226-5822</a>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-charcoal-light border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-blue-300 dark:hover:border-electric-blue/30 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-gray-50 dark:bg-charcoal-dark rounded-lg flex items-center justify-center mb-4 border border-gray-100 dark:border-transparent">
                <Mail className="w-6 h-6 text-blue-600 dark:text-electric-blue" />
              </div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-2">Digital Contact</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Send us schematics or requirements.</p>
              <div className="mt-4">
                <a 
                  href="https://www.facebook.com/share/1L9QCcJPVt/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-electric-blue font-semibold hover:underline"
                >
                  FB Page: Ultra Engineering
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
