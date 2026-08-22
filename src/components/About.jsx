import React from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiBook, FiTarget, FiTrendingUp, FiDownload } from 'react-icons/fi'
import profilePic from '../../images/profile.jpg'  // Adjust path based on your structure


const About = ({ onDownloadResume }) => {
  const highlights = [
    {
      icon: FiUser,
      title: 'Who I Am',
      description: 'BS Computer Science Student passionate about AI & Machine Learning, building software that solves real-world problems.'
    },
    {
      icon: FiBook,
      title: 'Education',
      description: 'Currently pursuing BS in Computer Science with focus on AI, ML, and Software Engineering.'
    },
    {
      icon: FiTarget,
      title: 'Focus Areas',
      description: 'Machine Learning, Deep Learning, NLP, Generative AI, and Full-Stack Development.'
    },
    {
      icon: FiTrendingUp,
      title: 'Current Goal',
      description: 'Building impactful AI-powered applications and becoming a strong AI/ML Engineer.'
    }
  ]

  return (
    <section id="about" className="relative py-24 px-4 bg-[#0A0A0B]/40 backdrop-blur-sm">
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
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full" />
        </motion.div>

        {/* Profile Picture and Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Profile Picture Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-20 blur-xl animate-pulse" />
              
              {/* Profile Picture */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-emerald-400/50 bg-gradient-to-br from-gray-800 to-gray-900">
                <img 
                  src={profilePic}
                  alt="Haider Khan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    const fallback = e.target.nextElementSibling
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                {/* Fallback HK Monogram */}
                <div 
                  className="w-full h-full items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-8xl font-bold text-emerald-400 mb-2">HK</div>
                    <div className="text-gray-400 text-sm">Haider Khan</div>
                  </div>
                </div>
              </div>

              {/* Floating badge - AI/ML */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 px-4 py-2 bg-emerald-400 text-white rounded-full text-sm font-semibold shadow-lg"
              >
                AI/ML
              </motion.div>

              {/* Floating badge - Developer */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold shadow-lg"
              >
                Developer
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Profile Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Turning Ideas into{' '}
              <span className="text-emerald-400">Intelligent Solutions</span>
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm a Computer Science student with a deep passion for Artificial Intelligence 
              and Machine Learning. My journey in tech started with Python and C++, and has 
              evolved into building AI-powered systems that solve real-world problems.
            </p>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Currently, I'm working on the Smart Lecture Intelligence System - an AI-powered 
              classroom analysis system that uses speech recognition, NLP, and Machine Learning 
              to understand and analyze complete classroom lectures.
            </p>

            {/* Download Resume Button */}
            <motion.button
              onClick={onDownloadResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              <FiDownload />
              Download Resume
            </motion.button>
          </motion.div>
        </div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)",
                  borderColor: "rgba(5, 150, 105, 0.5)"
                }}
                className="p-6 bg-white/5 rounded-lg border-2 border-white/10 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-3 bg-emerald-400/10 rounded-lg inline-block mb-4 group-hover:bg-emerald-400/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Currently Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white/5 rounded-lg border border-white/10 p-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Currently <span className="text-emerald-400">Learning</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Advanced Machine Learning',
              'Deep Learning',
              'NLP & Large Language Models',
              'Retrieval-Augmented Generation (RAG)',
              'Generative AI',
              'Advanced Python',
              'Full-Stack Development',
              'AI Application Development'
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(5, 150, 105, 0.2)",
                  borderColor: "rgba(5, 150, 105, 0.5)"
                }}
                className="px-4 py-2 bg-emerald-400/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-400/20 cursor-pointer transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About