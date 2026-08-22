import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLoader, FiCheck } from 'react-icons/fi'

const LoadingBar = () => {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let currentProgress = 0
    const interval = setInterval(() => {
      const increment = Math.random() * 15 + 5
      currentProgress += increment
      
      if (currentProgress >= 90) {
        currentProgress = 90
        clearInterval(interval)
      }
      
      setProgress(Math.floor(currentProgress))
    }, 200)

    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }

    window.addEventListener('load', handleLoad)
    
    if (document.readyState === 'complete') {
      handleLoad()
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none"
        >
          {/* Main Loading Container */}
          <div className="bg-[#0A0A0B]/90 backdrop-blur-sm border-b border-white/10">
            {/* Progress Bar */}
            <div className="relative h-1.5 bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.7), 0 0 30px rgba(59, 130, 246, 0.5)',
                }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-white/30"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ filter: 'blur(10px)' }}
              />
            </div>

            {/* Loading Info */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FiLoader className="w-4 h-4 text-emerald-400" />
                </motion.div>
                <span className="text-sm text-gray-300 font-medium">
                  Loading Portfolio
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-400">
                  {progress}%
                </span>
                {progress === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full"
                  >
                    <FiCheck className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingBar