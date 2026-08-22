import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi'

const Hero = ({ onDownloadResume }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 bg-transparent">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-emerald-400">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Haider Khan
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-3xl text-gray-400 mb-6"
        >
          AI/ML Engineer & Developer
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 px-4"
        >
          Building software and AI-powered solutions that turn ideas into practical, 
          real-world applications. Specializing in Machine Learning, NLP, and Generative AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 px-4"
        >
          {/* Primary Button - View Projects */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const projectsSection = document.getElementById('projects')
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors text-sm sm:text-base"
          >
            View Projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Secondary Button - Download Resume */}
          <motion.button
            onClick={onDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 text-white rounded-lg font-medium border border-white/10 hover:bg-white/10 transition-colors text-sm sm:text-base"
          >
            <FiDownload />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex items-center justify-center gap-6"
        >
          <motion.a
            href="https://github.com/Haider-Khann"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiGithub className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/haiderkhan-rk/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiLinkedin className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero


