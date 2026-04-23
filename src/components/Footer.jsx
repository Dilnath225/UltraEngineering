import React from 'react';
import { Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-[#111] border-t border-gray-300 dark:border-gray-800 pt-16 pb-8 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-200 dark:border-gray-800 pb-12">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <a href="#home" className="flex items-center gap-3 mb-6">
              <img src="/logo.jpeg" alt="Ultra Engineering Logo" className="h-[60px] w-auto rounded-md shadow-sm border border-gray-300 dark:border-gray-800/50" />
            </a>
            <p className="text-gray-600 dark:text-gray-500 text-sm max-w-sm mb-6 mt-4">
              Precision Electrical & Cable Solutions. Providing top-tier underground and overhead cable tracing, fault finding, and advanced systemic rectifications.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1L9QCcJPVt/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-charcoal-light flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-blue-600 dark:hover:bg-electric-blue transition-colors shadow-sm"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href="https://wa.me/94767107462" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-charcoal-light flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#25D366] transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-charcoal-light flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-blue-300 dark:hover:text-white dark:hover:bg-electric-blue transition-colors shadow-sm">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-charcoal-light flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-blue-300 dark:hover:text-white dark:hover:bg-electric-blue transition-colors shadow-sm">
                <Cpu className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 tracking-wider">NAVIGATION</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-600 dark:text-gray-500 hover:text-blue-600 dark:hover:text-electric-blue transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 tracking-wider">CONTACT DIRECTORY</h4>
            <ul className="space-y-4">
              <li className="text-gray-600 dark:text-gray-500">
                <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Direct Lines</span>
                <span className="font-semibold text-gray-800 dark:text-gray-300">076-710-7462 / 075-600-7462</span>
              </li>
              <li className="text-gray-600 dark:text-gray-500">
                <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Office Line</span>
                <span className="font-semibold text-gray-800 dark:text-gray-300">036-226-5822</span>
              </li>
              <li className="text-gray-600 dark:text-gray-500">
                <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Social Networks</span>
                <a 
                  href="https://www.facebook.com/share/1L9QCcJPVt/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-electric-blue hover:underline"
                >
                  FB Page: Ultra Engineering
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Ultra Engineering. All Technical Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
