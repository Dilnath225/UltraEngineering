import React, { useState } from 'react';
import { Send, Phone, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactCanvas from './ContactCanvas';

const ContactSection = ({ theme }) => {
  const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage("Connection failed. Please check your internet.");
    }
  };

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

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-10 flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Sent!</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. Our engineering team will review your request and contact you shortly.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="mt-8 text-blue-600 dark:text-electric-blue font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  {/* Web3Forms Configuration */}
                  <input type="hidden" name="access_key" value="02cc2290-16f4-42c0-aefa-726bb54e9ac5" />
                  <input type="hidden" name="subject" value="New Contact Inquiry from Ultra Engineering" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

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

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm font-medium"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-electric-blue text-white rounded-lg font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,162,255,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Send Request
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
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
              <div className="mt-4 space-y-3">
                <a
                  href="https://www.facebook.com/share/1L9QCcJPVt/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-electric-blue font-semibold hover:translate-x-1 transition-transform"
                >
                  <svg className="w-5 h-5 text-blue-600 dark:text-electric-blue" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  <span>Facebook Page</span>
                </a>

                <a
                  href="https://www.instagram.com/ultraengineering.22?igsh=aXF5MHZ5YnBpdXhi&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E1306C] dark:hover:text-[#E1306C] font-semibold hover:translate-x-1 transition-transform"
                >
                  <svg className="w-5 h-5 text-blue-600 dark:text-electric-blue group-hover:text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.tiktok.com/@ultra.engineering8?_r=1&_t=ZS-95nNm6uqDob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold hover:translate-x-1 transition-transform"
                >
                  <svg className="w-5 h-5 text-blue-600 dark:text-electric-blue group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                  <span>TikTok</span>
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

