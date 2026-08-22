import React from 'react'
import { motion } from 'framer-motion'

const SectionWrapper = ({ children, id, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default SectionWrapper