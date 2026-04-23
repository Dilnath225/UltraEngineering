import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Cable, Activity, Layers } from "lucide-react";
import projectsData from "../data/projectsData";
import ProjectsCanvas from "./ProjectsCanvas";

const categoryIcons = {
  All: <Layers className="w-4 h-4" />,
  Underground: <Cable className="w-4 h-4" />,
  Overhead: <Zap className="w-4 h-4" />,
  Testing: <Activity className="w-4 h-4" />,
};

const categories = ["All", "Underground", "Overhead", "Testing"];

const Projects = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-24 bg-gray-100 dark:bg-charcoal-dark border-y border-gray-200 dark:border-gray-800 transition-colors overflow-hidden"
    >
      <ProjectsCanvas theme={theme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-blue-600 dark:text-electric-blue font-bold tracking-widest uppercase text-sm mb-2">
            Our Portfolio
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Featured Projects
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Real-world fault finding, cable tracing, and diagnostic projects
            completed across Sri Lanka with precision and speed.
          </p>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-blue-600 dark:bg-electric-blue text-white border-blue-600 dark:border-electric-blue shadow-lg shadow-blue-500/25 dark:shadow-electric-blue/25"
                  : "bg-gray-50 dark:bg-charcoal-light text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-electric-blue/50 hover:text-blue-600 dark:hover:text-electric-blue"
              }`}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-gray-50 dark:bg-charcoal-light rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-300 dark:hover:border-electric-blue/50 hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,162,255,0.12)] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/90 dark:bg-electric-blue/90 text-white backdrop-blur-sm">
                    {categoryIcons[project.category]}
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-electric-blue transition-colors leading-snug">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
