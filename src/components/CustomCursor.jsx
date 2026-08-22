import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { FiSettings, FiX, FiCircle, FiSquare, FiTriangle, FiHexagon } from 'react-icons/fi'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorShape, setCursorShape] = useState('circle')
  const [showSettings, setShowSettings] = useState(false)
  const [cursorColor, setCursorColor] = useState('#10B981')
  const [hoverText, setHoverText] = useState('')
  const [isInResumeModal, setIsInResumeModal] = useState(false)
  
  const cursorSize = 24
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.3 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailX = useSpring(cursorX, { damping: 50, stiffness: 150, mass: 0.6 })
  const trailY = useSpring(cursorY, { damping: 50, stiffness: 150, mass: 0.6 })

  const rafRef = useRef()
  const lastMoveRef = useRef(Date.now())

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    if (!isDesktop) return

    setIsVisible(true)

    const moveCursor = (e) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      lastMoveRef.current = Date.now()
      
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX - cursorSize / 2)
        cursorY.set(e.clientY - cursorSize / 2)
      })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      
      // Check if we're inside the resume modal
      const isInResumeModal = target.closest('.resume-modal')
      
      if (isInResumeModal) {
        setIsInResumeModal(true)
        setIsVisible(false)
        document.body.style.cursor = 'auto'
        setIsHovering(false)
        setHoverText('')
        return
      }
      
      setIsInResumeModal(false)
      document.body.style.cursor = 'none'
      
      // Check for interactive elements
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')

      setIsHovering(isInteractive)

      // Get hover text if available
      if (isInteractive) {
        const text = target.getAttribute('data-cursor-text') || 
                     target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') ||
                     target.textContent?.trim().slice(0, 20) || ''
        setHoverText(text)
      } else {
        setHoverText('')
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => {
      setIsVisible(false)
      document.body.style.cursor = 'auto'
    }
    const handleMouseEnter = () => {
      if (!isInResumeModal) {
        setIsVisible(true)
        document.body.style.cursor = 'none'
      }
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.body.style.cursor = 'auto'
    }
  }, [cursorX, cursorY])

  // Check for resume modal periodically
  useEffect(() => {
    const checkForResumeModal = () => {
      const resumeModal = document.querySelector('.resume-modal')
      if (resumeModal) {
        setIsInResumeModal(true)
        setIsVisible(false)
        document.body.style.cursor = 'auto'
      } else if (!resumeModal && isInResumeModal) {
        setIsInResumeModal(false)
        setIsVisible(true)
        document.body.style.cursor = 'none'
      }
    }

    const observer = new MutationObserver(checkForResumeModal)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [isInResumeModal])

  useEffect(() => {
    const savedShape = localStorage.getItem('cursorShape')
    const savedColor = localStorage.getItem('cursorColor')
    
    if (savedShape) setCursorShape(savedShape)
    if (savedColor) setCursorColor(savedColor)
  }, [])

  const changeShape = (shape) => {
    setCursorShape(shape)
    localStorage.setItem('cursorShape', shape)
  }

  const changeColor = (color) => {
    setCursorColor(color)
    localStorage.setItem('cursorColor', color)
  }

  // Render cursor shape with enhanced visibility
  const renderCursorShape = () => {
    const baseSize = cursorSize
    const hoverScale = isHovering ? 1.5 : 1
    const clickScale = isClicking ? 0.7 : 1
    const finalScale = hoverScale * clickScale

    const shapeStyle = {
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: `scale(${finalScale})`,
    }

    switch (cursorShape) {
      case 'square':
        return (
          <div
            style={{
              ...shapeStyle,
              width: baseSize,
              height: baseSize,
              backgroundColor: `${cursorColor}${isHovering ? '80' : 'FF'}`,
              border: '2px solid white',
              borderRadius: '6px',
              boxShadow: `0 0 15px ${cursorColor}, 0 0 30px ${cursorColor}40, inset 0 0 10px rgba(255,255,255,0.3)`,
            }}
          />
        )
      case 'triangle':
        return (
          <div
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              borderLeft: `${baseSize/2}px solid transparent`,
              borderRight: `${baseSize/2}px solid transparent`,
              borderBottom: `${baseSize}px solid ${cursorColor}`,
              filter: `drop-shadow(0 0 10px ${cursorColor}) drop-shadow(0 0 20px ${cursorColor}60)`,
            }}
          />
        )
      case 'hexagon':
        return (
          <div
            style={{
              ...shapeStyle,
              width: baseSize,
              height: baseSize * 0.866,
              backgroundColor: `${cursorColor}${isHovering ? '80' : 'FF'}`,
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              boxShadow: `0 0 15px ${cursorColor}, 0 0 30px ${cursorColor}40`,
            }}
          />
        )
      default: // circle
        return (
          <div
            style={{
              ...shapeStyle,
              width: baseSize,
              height: baseSize,
              backgroundColor: `${cursorColor}${isHovering ? '80' : 'FF'}`,
              border: '2px solid white',
              borderRadius: '50%',
              boxShadow: `0 0 15px ${cursorColor}, 0 0 30px ${cursorColor}40, inset 0 0 10px rgba(255,255,255,0.3)`,
            }}
          />
        )
    }
  }

  return (
    <>
      {/* Trail Effect - Hidden in resume modal */}
      {!isInResumeModal && (
        <motion.div
          className="fixed top-0 left-0 z-[99] pointer-events-none"
          style={{
            x: trailX,
            y: trailY,
            opacity: isVisible ? 0.15 : 0,
          }}
        >
          <motion.div
            animate={{
              scale: isClicking ? 1.2 : isHovering ? 2 : 1,
              opacity: isHovering ? 0.3 : 0.15,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              mass: 0.5
            }}
            className="rounded-full"
            style={{
              width: cursorSize * 2,
              height: cursorSize * 2,
              marginLeft: -cursorSize,
              marginTop: -cursorSize,
              backgroundColor: cursorColor,
              filter: 'blur(8px)',
              transition: 'all 0.5s ease',
            }}
          />
        </motion.div>
      )}

      {/* Main Cursor - Hidden in resume modal */}
      {!isInResumeModal && (
        <motion.div
          className="fixed top-0 left-0 z-[100] pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            opacity: isVisible ? 1 : 0,
          }}
        >
          <motion.div
            animate={{
              scale: isClicking ? 0.7 : 1,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 250, 
              damping: 15,
              mass: 0.3
            }}
          >
            {renderCursorShape()}
          </motion.div>

          {/* Hover Text Tooltip */}
          <AnimatePresence>
            {isHovering && hoverText && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 20, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute whitespace-nowrap px-3 py-1 rounded-md text-xs text-white border shadow-xl"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '100%',
                  marginTop: '8px',
                  background: 'rgba(26, 26, 26, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {hoverText}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Cursor Settings Toggle - Hidden in resume modal */}
      {!isInResumeModal && (
        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          className="fixed bottom-4 right-4 z-[100] p-3 rounded-full text-white transition-colors"
          style={{ 
            cursor: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Cursor Settings"
        >
          <FiSettings className="w-5 h-5" />
        </motion.button>
      )}

      {/* Cursor Settings Panel - Transparent with blur */}
      <AnimatePresence>
        {showSettings && !isInResumeModal && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 z-[100] rounded-xl p-5 border shadow-2xl"
            style={{
              background: 'rgba(26, 26, 26, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Cursor Settings</h3>
              <motion.button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Shape Selection */}
            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">Shape</p>
              <div className="flex gap-2">
                {[
                  { id: 'circle', icon: FiCircle, label: 'Circle' },
                  { id: 'square', icon: FiSquare, label: 'Square' },
                  { id: 'triangle', icon: FiTriangle, label: 'Triangle' },
                  { id: 'hexagon', icon: FiHexagon, label: 'Hexagon' },
                ].map((shape) => {
                  const Icon = shape.icon
                  return (
                    <motion.button
                      key={shape.id}
                      onClick={() => changeShape(shape.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-lg transition-colors ${
                        cursorShape === shape.id 
                          ? 'bg-emerald-500/80 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                      title={shape.label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <p className="text-gray-300 text-sm mb-2">Color</p>
              <div className="flex gap-2">
                {['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'].map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => changeColor(color)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-full transition-all ${
                      cursorColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide default cursor */}
      <style>{`
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
          body {
            cursor: none !important;
          }
          button, a, input, textarea, select {
            cursor: none !important;
          }
          .resume-modal,
          .resume-modal * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor