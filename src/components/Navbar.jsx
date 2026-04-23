import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-100/95 dark:bg-charcoal-dark/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-200 dark:border-gray-800' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center gap-3">
              <img src="/logo.png" alt="Ultra Engineering Logo" className="h-14 md:h-16 w-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl md:text-2xl text-gray-900 dark:text-white leading-none tracking-tight">ULTRA</span>
                <span className="font-bold text-sm md:text-base text-blue-600 dark:text-electric-blue leading-none tracking-widest mt-1">ENGINEERING</span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-electric-blue transition-colors text-sm uppercase tracking-wider font-semibold"
              >
                {link.name}
              </motion.a>
            ))}
            
            {/* Theme Toggle Button */}
            <motion.button 
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-charcoal-light dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.a 
              href="#quote" 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-electric-blue text-white font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,162,255,0.4)] transition-all"
            >
              Get Quote
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-charcoal-light">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-100/95 dark:bg-charcoal-light/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-5 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-charcoal-dark border-l-4 border-transparent hover:border-blue-600 dark:hover:border-electric-blue transition-all">
                {link.name}
              </a>
            ))}
            <a href="#quote" onClick={() => setMobileMenuOpen(false)} className="block text-center mt-4 px-4 py-3 rounded-md text-base font-bold bg-electric-blue text-white hover:bg-blue-500 mx-3">
              Get Quote
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
