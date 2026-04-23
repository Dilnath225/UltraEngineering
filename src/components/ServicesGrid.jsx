import React from 'react';
import { PenTool, Zap, Activity, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import ServicesCanvas from './ServicesCanvas';

const ServicesGrid = ({ theme }) => {
  const services = [
    {
      id: 1,
      icon: <PenTool className="w-10 h-10 text-blue-600 dark:text-electric-blue" />,
      title: "Underground Tracing & Faults",
      items: [
        "Cable Path Tracing",
        "Fault Finding, Ad Finding",
        "Repair and Rectification"
      ]
    },
    {
      id: 2,
      icon: <Zap className="w-10 h-10 text-blue-600 dark:text-electric-blue" />,
      title: "Overhead Systems",
      items: [
        "Overhead Cable Fault Finding",
        "Line Inspection & Testing",
        "Prompt Rectification"
      ]
    },
    {
      id: 3,
      icon: <Activity className="w-10 h-10 text-blue-600 dark:text-electric-blue" />,
      title: "Testing & Diagnostics",
      items: [
        "Earth Resistance Testing",
        "Insulation Testing (Megger)",
        "System Continuity Checks"
      ]
    },
    {
      id: 4,
      icon: <Cpu className="w-10 h-10 text-blue-600 dark:text-electric-blue" />,
      title: "Electrical Setup & Troubleshooting",
      items: [
        "System Installation & Commissioning",
        "Advanced Troubleshooting",
        "Overall Engineering Repair"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="relative py-24 bg-gray-100 dark:bg-charcoal-dark border-y border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
      <ServicesCanvas theme={theme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-blue-600 dark:text-electric-blue font-bold tracking-widest uppercase text-sm mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">High-Performance Services</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We deliver state-of-the-art diagnostic and rectification services for advanced electrical structures, minimizing downtime and maximizing safety.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={itemVariants}
              className="group bg-gray-50 dark:bg-charcoal-light rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-electric-blue/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(0,162,255,0.1)] relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-electric-blue/5 rounded-full blur-2xl group-hover:bg-blue-100 dark:group-hover:bg-electric-blue/20 transition-colors"></div>
              
              <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-dark rounded-xl flex items-center justify-center mb-6 shadow-inner border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-electric-blue/30 transition-colors transform group-hover:scale-110">
                {service.icon}
              </div>
              
              <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-electric-blue transition-colors">
                {service.title}
              </h4>
              
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-electric-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
