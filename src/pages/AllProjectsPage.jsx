import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Cable, Zap, Activity, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import allProjectsData from '../data/allProjectsData';

const categoryIcons = {
  Underground: <Cable className="w-5 h-5 text-blue-500" />,
  Overhead: <Zap className="w-5 h-5 text-yellow-500" />,
  Testing: <Activity className="w-5 h-5 text-green-500" />,
  All: <Layers className="w-5 h-5 text-gray-500" />
};

const AllProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure the page scrolls to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = allProjectsData.filter(project => 
    project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Engineering Portfolio | Cable Fault Scanning Sri Lanka</title>
        <meta name="description" content="View our complete history of high-voltage cable testing, path tracing, and electrical fault finding projects across Sri Lanka, including major works at Port Hambantota and Kelanithissa." />
        <meta name="keywords" content="Ultra Engineering portfolio, cable tracing projects Sri Lanka, electrical fault finding history, high voltage testing log, Ceylon Petroleum scanning, Hambantota Port cable faults" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-100 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-200 pt-24 pb-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Back Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-electric-blue hover:text-blue-800 dark:hover:text-blue-400 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                All Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 dark:from-electric-blue dark:to-blue-400">Projects</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                A comprehensive log of our precision fault finding, path scanning, and high-voltage electrical rectifications carried out across commercial and industrial sectors.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by location or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-electric-blue/50 text-gray-900 dark:text-white transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto text-xs sm:text-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <th className="px-6 py-5 w-32">Date</th>
                    <th className="px-6 py-5">Location / Client</th>
                    <th className="px-6 py-5">Service Category</th>
                    <th className="px-6 py-5 min-w-[300px]">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="hover:bg-gray-50 dark:hover:bg-[#161616] transition-colors group"
                    >
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
                        {project.date === "Ongoing" ? (
                          <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-100 text-blue-800 dark:bg-electric-blue/20 dark:text-electric-blue">
                            <span className="w-2 h-2 mr-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            Ongoing
                          </span>
                        ) : project.date === "Completed" ? (
                          <span className="text-green-600 dark:text-green-400 font-bold px-2 py-1 bg-green-100 dark:bg-green-500/10 rounded-md">
                            Completed
                          </span>
                        ) : (
                          project.date
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                          {project.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:block p-2 rounded-lg bg-gray-100 dark:bg-gray-800/80">
                            {categoryIcons[project.category] || categoryIcons.All}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{project.service}</p>
                            <p className="text-[10px] sm:text-xs text-blue-600 dark:text-electric-blue font-semibold uppercase tracking-wider mt-0.5">{project.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.description}
                      </td>
                    </tr>
                  ))) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 font-medium">
                        No projects found matching your search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AllProjectsPage;
