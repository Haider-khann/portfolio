import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import OpeningAnimation from './components/OpeningAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import LoadingBar from './components/LoadingBar'
import ResumeModal from './components/ResumeModal'
import ThreeBackground from './components/ThreeBackground'
import ScrollEffect from './components/ScrollEffect'

function App() {
  const [loading, setLoading] = useState(true)
  const [showResume, setShowResume] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#0A0A0B]">
      <AnimatePresence>
        {loading && (
          <OpeningAnimation onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      
      {!loading && (
        <>
          <LoadingBar />
          <CustomCursor />
          <ThreeBackground />
          <ScrollEffect />
          <Navbar />
          <main className="relative z-10">
            <Hero onDownloadResume={() => setShowResume(true)} />
            <About onDownloadResume={() => setShowResume(true)} />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
          <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
        </>
      )}
    </div>
  )
}

export default App