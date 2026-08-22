import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCpu, FiCode, FiDatabase, FiGlobe, FiTool, FiTrendingUp, FiChevronRight, FiAward, FiStar, FiZap, FiArrowUpRight } from 'react-icons/fi'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [flippedCard, setFlippedCard] = useState(null)

  const categories = [
    { id: 'all', label: 'All Skills', icon: FiTrendingUp, count: 17 },
    { id: 'languages', label: 'Languages', icon: FiCode, count: 4 },
    { id: 'ai-ml', label: 'AI & ML', icon: FiCpu, count: 5 },
    { id: 'web', label: 'Web Dev', icon: FiGlobe, count: 4 },
    { id: 'database', label: 'Databases', icon: FiDatabase, count: 2 },
    { id: 'tools', label: 'Tools', icon: FiTool, count: 2 },
  ]

  const skills = [
    {
      name: 'Python',
      category: 'languages',
      color: '#3776AB',
      icon: '🐍',
      fullName: 'Python Programming Language',
      description: 'High-level, interpreted language known for simplicity and readability.',
      useCases: ['AI/ML', 'Data Analysis', 'Automation', 'Backend'],
      experience: 'Primary language for AI/ML projects',
      projects: ['Smart Lecture System', 'Jarvis AI', 'Performance Predictor'],
      proficiency: 'Expert',
      yearsOfUse: '3+ years'
    },
    {
      name: 'C++',
      category: 'languages',
      color: '#00599C',
      icon: '⚡',
      fullName: 'C++ Programming Language',
      description: 'Powerful compiled language for performance-critical applications.',
      useCases: ['System Programming', 'Game Dev', 'DSA', 'Algorithms'],
      experience: 'Used for DSA and system-level projects',
      projects: ['Car Rental System', 'Snake Game'],
      proficiency: 'Advanced',
      yearsOfUse: '2+ years'
    },
    {
      name: 'JavaScript',
      category: 'languages',
      color: '#F7DF1E',
      icon: '📜',
      fullName: 'JavaScript',
      description: 'Dynamic language essential for web development.',
      useCases: ['Frontend', 'Backend', 'Web Apps', 'APIs'],
      experience: 'Full-stack web development',
      projects: ['Safar-e-Pak', 'Portfolio'],
      proficiency: 'Advanced',
      yearsOfUse: '2+ years'
    },
    {
      name: 'SQL',
      category: 'languages',
      color: '#4479A1',
      icon: '🗄️',
      fullName: 'Structured Query Language',
      description: 'Standard language for managing relational databases.',
      useCases: ['Database Management', 'Queries', 'Data Analysis'],
      experience: 'Database design and management',
      projects: ['Car Rental System', 'Safar-e-Pak'],
      proficiency: 'Advanced',
      yearsOfUse: '2+ years'
    },
    {
      name: 'Machine Learning',
      category: 'ai-ml',
      color: '#FF6F00',
      icon: '🤖',
      fullName: 'Machine Learning',
      description: 'AI field enabling systems to learn from experience.',
      useCases: ['Predictive Modeling', 'Classification', 'Regression'],
      experience: 'Building ML models for real-world problems',
      projects: ['Performance Predictor', 'Lecture System'],
      proficiency: 'Advanced',
      yearsOfUse: '2+ years'
    },
    {
      name: 'Deep Learning',
      category: 'ai-ml',
      color: '#FF3E00',
      icon: '🧠',
      fullName: 'Deep Learning',
      description: 'Advanced ML using multi-layer neural networks.',
      useCases: ['Neural Networks', 'Computer Vision', 'NLP'],
      experience: 'Implementing neural networks with PyTorch',
      projects: ['Smart Lecture System'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'NLP',
      category: 'ai-ml',
      color: '#00B4D8',
      icon: '💬',
      fullName: 'Natural Language Processing',
      description: 'AI field for processing human language.',
      useCases: ['Text Analysis', 'Speech Recognition', 'Chatbots'],
      experience: 'Building NLP solutions',
      projects: ['Smart Lecture System', 'Jarvis AI'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'PyTorch',
      category: 'ai-ml',
      color: '#EE4C2C',
      icon: '🔥',
      fullName: 'PyTorch',
      description: 'ML framework for building neural networks.',
      useCases: ['Deep Learning', 'Model Training', 'Research'],
      experience: 'Deep learning model development',
      projects: ['Smart Lecture System'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'Generative AI',
      category: 'ai-ml',
      color: '#8B5CF6',
      icon: '✨',
      fullName: 'Generative AI',
      description: 'AI systems creating new content.',
      useCases: ['Text Generation', 'LLM Apps', 'Content Creation'],
      experience: 'Building AI-powered applications',
      projects: ['Jarvis AI', 'Lecture System'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'HTML5',
      category: 'web',
      color: '#E34F26',
      icon: '🌐',
      fullName: 'HyperText Markup Language',
      description: 'Standard markup language for web pages.',
      useCases: ['Web Structure', 'Semantic Markup', 'SEO'],
      experience: 'Building responsive web interfaces',
      projects: ['Portfolio', 'Safar-e-Pak'],
      proficiency: 'Expert',
      yearsOfUse: '3+ years'
    },
    {
      name: 'CSS3',
      category: 'web',
      color: '#1572B6',
      icon: '🎨',
      fullName: 'Cascading Style Sheets',
      description: 'Style sheet language for web presentation.',
      useCases: ['Styling', 'Responsive Design', 'Animations'],
      experience: 'Creating modern designs',
      projects: ['Portfolio', 'Safar-e-Pak'],
      proficiency: 'Advanced',
      yearsOfUse: '3+ years'
    },
    {
      name: 'React',
      category: 'web',
      color: '#61DAFB',
      icon: '⚛️',
      fullName: 'React.js',
      description: 'JavaScript library for building UIs.',
      useCases: ['SPAs', 'Component UI', 'State Management'],
      experience: 'Building modern web apps',
      projects: ['Safar-e-Pak', 'Portfolio'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'Node.js',
      category: 'web',
      color: '#339933',
      icon: '🚀',
      fullName: 'Node.js',
      description: 'JavaScript runtime for server-side apps.',
      useCases: ['Backend APIs', 'Server Logic', 'Real-time Apps'],
      experience: 'Building REST APIs',
      projects: ['Safar-e-Pak'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'MySQL',
      category: 'database',
      color: '#4479A1',
      icon: '🗃️',
      fullName: 'MySQL Database',
      description: 'Popular relational database system.',
      useCases: ['Data Storage', 'Queries', 'Transactions'],
      experience: 'Database design and management',
      projects: ['Car Rental System'],
      proficiency: 'Advanced',
      yearsOfUse: '2+ years'
    },
    {
      name: 'MongoDB',
      category: 'database',
      color: '#47A248',
      icon: '🍃',
      fullName: 'MongoDB',
      description: 'NoSQL document database.',
      useCases: ['Document Storage', 'NoSQL', 'Scalable Apps'],
      experience: 'NoSQL for web applications',
      projects: ['Safar-e-Pak'],
      proficiency: 'Intermediate',
      yearsOfUse: '1+ years'
    },
    {
      name: 'Git',
      category: 'tools',
      color: '#F05032',
      icon: '📦',
      fullName: 'Git Version Control',
      description: 'Distributed version control system.',
      useCases: ['Version Control', 'Collaboration', 'Branching'],
      experience: 'Essential for all projects',
      projects: ['All Projects'],
      proficiency: 'Advanced',
      yearsOfUse: '3+ years'
    },
    {
      name: 'VS Code',
      category: 'tools',
      color: '#007ACC',
      icon: '💻',
      fullName: 'Visual Studio Code',
      description: 'Popular code editor with extensions.',
      useCases: ['Code Editing', 'Debugging', 'Git Integration'],
      experience: 'Primary development environment',
      projects: ['All Projects'],
      proficiency: 'Expert',
      yearsOfUse: '3+ years'
    }
  ]

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  const getCategoryLabel = (category) => {
    const labels = {
      languages: 'Languages',
      'ai-ml': 'AI & ML',
      web: 'Web Dev',
      database: 'Databases',
      tools: 'Tools'
    }
    return labels[category] || category
  }

  const getProficiencyColor = (proficiency) => {
    const colors = {
      'Expert': '#10B981',
      'Advanced': '#3B82F6',
      'Intermediate': '#F59E0B',
      'Beginner': '#EF4444'
    }
    return colors[proficiency] || '#10B981'
  }

  return (
    <section id="skills" className="relative py-24 px-4 bg-[#0A0A0B]/40 backdrop-blur-sm">
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
            Technical <span className="text-emerald-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            Hover over cards to explore my technical expertise
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setFlippedCard(null)
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Skills Grid - 3D Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="relative h-80"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setFlippedCard(skill.name)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div 
                  className="relative w-full h-full transition-transform duration-700"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === skill.name ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 transition-opacity duration-500" 
                      style={{ 
                        background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
                        opacity: flippedCard === skill.name ? 1 : 0
                      }} 
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
                      <div 
                        className="text-5xl mb-4"
                        style={{ filter: `drop-shadow(0 0 15px ${skill.color}60)` }}
                      >
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white text-center mb-2">
                        {skill.name}
                      </h3>
                      <div 
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${getProficiencyColor(skill.proficiency)}20`,
                          color: getProficiencyColor(skill.proficiency),
                          border: `1px solid ${getProficiencyColor(skill.proficiency)}40`
                        }}
                      >
                        <FiAward className="w-3 h-3" />
                        {skill.proficiency}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {getCategoryLabel(skill.category)}
                      </p>
                    </div>
                  </div>

                  {/* Back of Card with WORKING Scroll */}
                  <div 
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
                      border: `2px solid ${skill.color}30`,
                      boxShadow: `0 10px 30px ${skill.color}20`
                    }}
                  >
                    <div 
                      className="h-full overflow-y-auto p-5"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${skill.color} rgba(255,255,255,0.1)`,
                        overscrollBehavior: 'contain'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FiZap className="w-4 h-4 flex-shrink-0" style={{ color: skill.color }} />
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {skill.fullName}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-gray-300 mb-2 leading-relaxed">
                        {skill.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <FiStar className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                        <span className="text-xs text-gray-300 font-medium">
                          {skill.yearsOfUse}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 mb-1 font-semibold">Use Cases:</p>
                        <div className="flex flex-wrap gap-1">
                          {skill.useCases.map((useCase, i) => (
                            <span 
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-full border"
                              style={{ 
                                backgroundColor: `${skill.color}15`,
                                borderColor: `${skill.color}40`,
                                color: skill.color,
                              }}
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 mb-1 font-semibold">Experience:</p>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {skill.experience}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1 font-semibold">Featured Projects:</p>
                        <div className="space-y-1">
                          {skill.projects.map((project, i) => (
                            <div 
                              key={i} 
                              className="flex items-start gap-1.5 text-xs text-gray-300"
                            >
                              <FiChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="leading-tight">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '17+', label: 'Technologies', color: '#10B981' },
            { value: '5', label: 'Categories', color: '#3B82F6' },
            { value: '3+', label: 'Years Experience', color: '#8B5CF6' },
            { value: '8+', label: 'Projects Built', color: '#F59E0B' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default"
            >
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}50`
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills


