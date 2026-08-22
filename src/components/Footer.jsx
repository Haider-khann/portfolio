import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <footer className="relative py-12 px-4 bg-[#0A0A0B]/80 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <motion.button
              onClick={scrollToTop}
              className="text-2xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              HK<span className="text-emerald-400">.</span>
            </motion.button>
            <p className="text-gray-400 text-sm leading-relaxed">
              Computer Science Student | AI & ML Enthusiast | Python & C++ Developer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/Haider-Khann"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/haiderkhan-rk/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:rkhaiderali4@gmail.com"
                whileHover={{ scale: 1.2, y: -3 }}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <FiMail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © 2024 Haider Khan. Built with 
            <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
            using React & Three.js
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
          >
            <FiArrowUp className="w-4 h-4" />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer