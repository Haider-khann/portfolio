import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiX, FiCode, FiCpu, FiDatabase, FiFolder, FiBox, FiExternalLink } from 'react-icons/fi'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Smart Lecture Intelligence System',
      description: 'AI-powered classroom lecture analysis using speech recognition, speaker diarization, NLP and Machine Learning.',
      longDescription: 'An AI-powered system that converts classroom audio to text, identifies speakers, generates notes, summaries, and quizzes. Uses Whisper for speech recognition, Pyannote for speaker diarization, and custom NLP models for content analysis.',
      tech: ['Python', 'Whisper', 'Pyannote', 'NLP', 'Machine Learning'],
      icon: 'FiCpu',
      color: '#059669',
      status: 'In Development',
      link: 'https://github.com/Haider-Khann'
    },
    {
      id: 2,
      title: 'Jarvis — AI Assistant',
      description: 'AI-powered intelligent assistant that can control the environment, interact through voice commands, and automate tasks.',
      longDescription: 'A smart AI assistant capable of voice recognition, task automation, and environmental control. Built with Python and various AI libraries for natural language processing and command execution.',
      tech: ['Python', 'Speech Recognition', 'NLP', 'Automation'],
      icon: 'FiCode',
      color: '#3B82F6',
      status: 'Completed',
      link: 'https://github.com/Haider-Khann'
    },
    {
      id: 3,
      title: 'AI Student Performance Predictor',
      description: 'Machine Learning system that predicts student performance based on study habits and academic attributes.',
      longDescription: 'ML model that analyzes factors like study hours, attendance, and previous marks to predict academic performance. Implemented with scikit-learn and various regression/classification algorithms.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'ML Algorithms'],
      icon: 'FiDatabase',
      color: '#8B5CF6',
      status: 'Completed',
      link: 'https://github.com/Haider-Khann'
    },
    {
      id: 4,
      title: 'Safar-e-Pak',
      description: 'Travel management web application built with MERN stack for exploring Pakistan\'s tourist destinations.',
      longDescription: 'Full-stack travel platform featuring destination listings, booking management, and user reviews. Built with React frontend, Node.js/Express backend, and MongoDB database.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      icon: 'FiFolder',
      color: '#F59E0B',
      status: 'Completed',
      link: 'https://github.com/Haider-Khann'
    },
    {
      id: 5,
      title: 'Car Rental System',
      description: 'Console-based C++ project implementing Data Structures and Algorithms for managing vehicle rentals.',
      longDescription: 'Implemented a complete car rental management system with advanced data structures like linked lists, trees, and hash maps for efficient vehicle tracking and customer management.',
      tech: ['C++', 'DSA', 'OOP'],
      icon: 'FiCode',
      color: '#EF4444',
      status: 'Completed',
      link: 'https://github.com/Haider-Khann'
    },
    {
      id: 6,
      title: 'Space Shooter Game',
      description: '2D arcade-style shooting game developed using Python and Pygame.',
      longDescription: 'A complete 2D game with enemy AI, collision detection, scoring system, and multiple levels. Features smooth animations and responsive controls.',
      tech: ['Python', 'Pygame', 'Game Dev'],
      icon: 'FiBox',
      color: '#EC4899',
      status: 'Completed',
      link: 'https://github.com/Haider-Khann'
    }
  ]

  const getIcon = (iconName) => {
    const icons = {
      FiCpu: FiCpu,
      FiCode: FiCode,
      FiDatabase: FiDatabase,
      FiFolder: FiFolder,
      FiBox: FiBox
    }
    return icons[iconName] || FiCode
  }

  return (
    <section id="projects" className="relative py-24 px-4 bg-[#0A0A0B]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            A selection of projects that showcase my skills and passion for building
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = getIcon(project.icon)
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -15,
                  rotateX: 10,
                  rotateY: -10,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(5, 150, 105, 0.2)"
                }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 hover:border-emerald-400/50 cursor-pointer transition-all duration-500 backdrop-blur-sm"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  perspective: '1000px',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ 
                       background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)`,
                       boxShadow: `0 0 40px ${project.color}40`
                     }} 
                />

                {/* Project Icon */}
                <div 
                  className="inline-flex p-4 rounded-lg mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                  style={{ backgroundColor: project.color + '20' }}
                >
                  <Icon className="w-8 h-8" style={{ color: project.color }} />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'In Development' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-xs border border-white/10 group-hover:border-emerald-400/30 group-hover:text-emerald-400 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Details */}
                <div className="flex items-center gap-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Click to view details</span>
                  <FiExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/Haider-Khann"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-lg font-medium border border-white/10 hover:bg-white/10 transition-colors"
          >
            <FiGithub className="w-6 h-6" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-2xl w-full bg-[#1a1a1a] rounded-xl p-8 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Project Icon */}
              <div 
                className="inline-flex p-4 rounded-lg mb-4 shadow-lg"
                style={{ backgroundColor: selectedProject.color + '20' }}
              >
                {(() => {
                  const ModalIcon = getIcon(selectedProject.icon)
                  return <ModalIcon className="w-8 h-8" style={{ color: selectedProject.color }} />
                })()}
              </div>

              {/* Project Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedProject.title}
              </h3>

              {/* Status */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedProject.status === 'In Development' 
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {selectedProject.status}
                </span>
              </div>

              {/* Long Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                  View Code
                </motion.a>
                
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/5 text-white rounded-lg font-medium border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects