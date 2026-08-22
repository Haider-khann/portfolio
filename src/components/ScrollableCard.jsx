import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronRight, FiStar, FiZap } from 'react-icons/fi'

const ScrollableCard = ({ skill }) => {
  const scrollContainerRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current
      if (container) {
        const hasOverflow = container.scrollHeight > container.clientHeight
        setCanScroll(hasOverflow)
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [skill])

  const handleScroll = (e) => {
    const container = e.target
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight - container.clientHeight
    const progress = (scrollTop / scrollHeight) * 100
    setScrollProgress(progress)
    setIsScrolled(scrollTop > 0)
    
    // Stop propagation to prevent page scroll
    e.stopPropagation()
  }

  const handleWheel = (e) => {
    const container = scrollContainerRef.current
    if (container && canScroll) {
      e.stopPropagation()
      // Allow natural scroll within container
      container.scrollTop += e.deltaY
      // Prevent page scroll
      e.preventDefault()
    }
  }

  return (
    <div className="absolute inset-0 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
         style={{ 
           background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
           border: `2px solid ${skill.color}30`,
           boxShadow: `0 10px 30px ${skill.color}20`
         }}>
      <div className="relative z-10 flex flex-col h-full">
        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          className="flex-1 overflow-y-auto p-5 custom-scrollbar"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: canScroll ? `${skill.color}60 transparent` : 'transparent transparent',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FiZap className="w-4 h-4 flex-shrink-0" style={{ color: skill.color }} />
            <h3 className="text-lg font-bold text-white leading-tight">
              {skill.fullName}
            </h3>
          </div>
          
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            {skill.description}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <FiStar className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span className="text-xs text-gray-300 font-medium">
              {skill.yearsOfUse}
            </span>
          </div>
          
          {/* Use Cases */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-2 font-semibold">Use Cases:</p>
            <div className="flex flex-wrap gap-1.5">
              {skill.useCases.map((useCase, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-full border transition-all duration-300 hover:scale-110 cursor-default"
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
          
          {/* Experience */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1 font-semibold">Experience:</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              {skill.experience}
            </p>
          </div>
          
          {/* Featured Projects */}
          <div>
            <p className="text-xs text-gray-400 mb-2 font-semibold">Featured Projects:</p>
            <div className="space-y-1.5">
              {skill.projects.map((project, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2 text-xs text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  <FiChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{project}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Only shows if content overflows */}
        {canScroll && (
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 h-16 w-1 bg-white/5 rounded-full overflow-hidden pointer-events-none">
            <motion.div
              className="w-full rounded-full"
              style={{
                height: isScrolled ? '40%' : '30%',
                backgroundColor: `${skill.color}60`,
                y: scrollProgress * 0.6
              }}
              animate={{ y: scrollProgress * 0.6 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        )}

        {/* Bottom scroll hint */}
        {canScroll && !isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2.5 rounded-full bg-gray-500/50"
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ScrollableCard