import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ScrollEffect = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const absoluteTop = rect.top + window.scrollY
          const absoluteBottom = absoluteTop + rect.height

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Different overlay effects for each section
  const sectionEffects = {
    home: {
      overlay: 'radial-gradient(circle at center, transparent 0%, rgba(10,10,11,0.3) 100%)',
      tint: 'rgba(5, 150, 105, 0.05)'
    },
    about: {
      overlay: 'radial-gradient(circle at 30% 50%, transparent 0%, rgba(10,10,11,0.5) 100%)',
      tint: 'rgba(59, 130, 246, 0.05)'
    },
    projects: {
      overlay: 'radial-gradient(circle at 70% 50%, transparent 0%, rgba(10,10,11,0.5) 100%)',
      tint: 'rgba(139, 92, 246, 0.05)'
    },
    skills: {
      overlay: 'radial-gradient(circle at center, transparent 0%, rgba(10,10,11,0.4) 100%)',
      tint: 'rgba(5, 150, 105, 0.05)'
    },
    contact: {
      overlay: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10,10,11,0.5) 100%)',
      tint: 'rgba(59, 130, 246, 0.05)'
    }
  }

  const currentEffect = sectionEffects[activeSection] || sectionEffects.home

  return (
    <motion.div
      className="fixed inset-0 z-[1] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: currentEffect.overlay
      }}
    >
      {/* Subtle color tint for each section */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: currentEffect.tint }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export default ScrollEffect