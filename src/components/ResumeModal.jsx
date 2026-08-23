import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiMail, FiGithub, FiLinkedin, FiFile, FiFileText, FiUser, FiCode, FiCpu, FiDatabase, FiGlobe, FiTool, FiBook, FiPhone, FiMapPin } from 'react-icons/fi'
import profilePic from '../../images/profile.jpg'

const ResumeModal = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const resumeRef = useRef(null)

  const handleDownload = (format) => {
    setSelectedFormat(format)
    setDownloading(true)
    
    setTimeout(() => {
      if (format === 'pdf') {
        downloadAsPDF()
      } else if (format === 'docx') {
        downloadAsDOCX()
      } else if (format === 'txt') {
        downloadAsTXT()
      }
      
      setTimeout(() => {
        setDownloading(false)
        setSelectedFormat(null)
      }, 2000)
    }, 500)
  }

  const downloadAsPDF = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Haider Khan - Resume</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1a1a1a; border-bottom: 3px solid #10B981; padding-bottom: 10px; }
            h2 { color: #10B981; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            .contact { display: flex; gap: 20px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .project { margin-bottom: 10px; }
            .project-title { font-weight: bold; }
            .profile-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
          </style>
        </head>
        <body>
          ${generateResumeHTML()}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const downloadAsDOCX = () => {
    const content = generateResumeHTML()
    const blob = new Blob([content], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Haider-Khan-Resume.doc'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadAsTXT = () => {
    const content = generateResumeText()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Haider-Khan-Resume.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const generateResumeHTML = () => {
    return `
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
        <img src="${profilePic}" alt="Haider Khan" class="profile-img" onerror="this.style.display='none'" />
        <div>
          <h1>HAIDER KHAN</h1>
          <p style="font-size: 18px; color: #10B981; margin: 5px 0;">AI/ML Engineer & Developer</p>
        </div>
      </div>
      <div class="contact">
        <span>📧 rkhaiderali4@gmail.com</span>
        <span>📍 Pakistan</span>
      </div>
      <div class="contact">
        <span>🔗 github.com/Haider-Khann</span>
        <span>💼 linkedin.com/in/haiderkhan-rk</span>
      </div>

      <div class="section">
        <h2>PROFESSIONAL SUMMARY</h2>
        <p>Computer Science Student passionate about Artificial Intelligence and Machine Learning. Building software and AI-powered solutions that turn ideas into practical, real-world applications. Experienced in Python, C++, and full-stack development with focus on ML, NLP, and Generative AI.</p>
      </div>

      <div class="section">
        <h2>EDUCATION</h2>
        <p><strong>Bachelor's in Computer Science</strong> - University of Gujrat</p>
        <p>Currently in University</p>
        <p><strong>Intermediate in ICS</strong> - Punjab College</p>
        <p>Marks: A</p>
        <p><strong>Matriculation</strong> - A+ School System</p>
        <p>Marks: A+</p>
      </div>

      <div class="section">
        <h2>EXPERIENCE</h2>
        <p><strong>Freelance Web Developer</strong> - Built ecomerce websites for clients</p>
        <p><strong>Game Developer</strong> - Built games like Snake Game, Tic Tac Toe, space shooters etc..</p>
        <p><strong>AI/ML Developer</strong> - Student performance predictor, SLIS:smart classroom intelligence system etc..</p>
      </div>

      <div class="section">
        <h2>TECHNICAL SKILLS</h2>
        <p><strong>Programming Languages:</strong> Python, C++, C, JavaScript, Flutter and Dart, SQL, Visual Basic</p>
        <p><strong>AI & Machine Learning:</strong> Machine Learning, NLP, Scikit-learn, PyTorch, Whisper, Pyannote, Generative AI, learning LLMs/Deep Learning</p>
        <p><strong>Web Development:</strong> HTML5, CSS3, JavaScript, Node.js, Express.js, React, REST APIs</p>
        <p><strong>Databases:</strong> SQL, MySQL, MongoDB</p>
        <p><strong>Tools:</strong> Git, GitHub, VS Code, Google Colab, Jupyter Notebook</p>
      </div>

      <div class="section">
        <h2>FEATURED PROJECTS</h2>
        <div class="project">
          <p class="project-title">Smart Lecture Intelligence System</p>
          <p>AI-powered classroom lecture analysis using speech recognition, speaker diarization, NLP and Machine Learning.</p>
        </div>
        <div class="project">
          <p class="project-title">Jarvis — AI Assistant</p>
          <p>AI-powered intelligent assistant for voice commands and task automation.</p>
        </div>
        <div class="project">
          <p class="project-title">AI Student Performance Predictor</p>
          <p>ML system predicting student performance based on academic attributes.</p>
        </div>
        <div class="project">
          <p class="project-title">Safar-e-Pak</p>
          <p>Travel management web application built with MERN stack.</p>
        </div>
        <div class="project">
          <p class="project-title">Car Rental System</p>
          <p>Console-based C++ project implementing Data Structures and Algorithms.</p>
        </div>
        <div class="project">
          <p class="project-title">Space Shooter Game</p>
          <p>2D arcade-style game developed using Python and Pygame.</p>
        </div>
        <div class="project">
          <p class="project-title">Snake Game</p>
          <p>Classic Snake game developed using C/C++.</p>
        </div>
        <div class="project">
          <p class="project-title">Tic Tac Toe</p>
          <p>Two-player game developed using Assembly Language.</p>
        </div>
      </div>

      <div class="section">
        <h2>HOBBIES</h2>
        <p><strong>Sports:</strong> Badminton, Cricket, Chess</p>
        <p><strong>Others:</strong> Coding, Acting, Gaming</p>
      </div>

      <div class="section">
        <h2>GOALS</h2>
        <p>Build impactful AI-powered applications | Become a strong AI/ML Engineer | Work on real-world problems | Contribute to open-source</p>
      </div>
    `
  }

  const generateResumeText = () => {
    return `
========================================
           HAIDER KHAN
    AI/ML Engineer & Developer
========================================

CONTACT
-------
Email: rkhaiderali4@gmail.com
GitHub: https://github.com/Haider-Khann
LinkedIn: https://www.linkedin.com/in/haiderkhan-rk/
Location: Pakistan

PROFESSIONAL SUMMARY
-------------------
Computer Science Student passionate about AI and ML.
Building software and AI-powered solutions.

EDUCATION
---------
Bachelor's in Computer Science
University of Gujrat
Currently in University

Intermediate in ICS
Punjab College
Grade: A

Matriculation
A+ School System
Grade: A+

EXPERIENCE
----------
Freelance Web Developer
Built Ecomerce websites for clients

Game Developer
Built games like Snake Game, Tic Tac Toe, Space Shooter Game, and more..

AI/ML Developer
Built AI-powered applications like Student Performance Predictor, 
Smart Lecture Intelligence System, and more..

TECHNICAL SKILLS
----------------
Languages: Python, C++, C, JavaScript, Flutter and Dart, SQL, Visual Basic
AI & ML: ML, Deep Learning, NLP, PyTorch, Generative AI
Web: HTML5, CSS3, Node.js, Express, React
Databases: SQL, MySQL, MongoDB
Tools: Git, GitHub, VS Code, Colab

FEATURED PROJECTS
-----------------
1. Smart Lecture Intelligence System
2. Jarvis — AI Assistant
3. AI Student Performance Predictor
4. Safar-e-Pak
5. Car Rental System
6. Space Shooter Game
7. Snake Game
8. Tic Tac Toe

HOBBIES
-------
Sports: Badminton, Cricket, Chess
Others: Coding, Acting, Gaming

========================================
    "Building today, learning every day,
     and creating the future with technology."
========================================
    `
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm resume-modal"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">Resume Preview</h2>
                <p className="text-sm text-gray-400 mt-1">Choose format to download</p>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Download Format Selection */}
            <div className="sticky top-[80px] z-10 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10 p-4">
              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={() => handleDownload('pdf')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedFormat === 'pdf'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <FiFile className="w-5 h-5" />
                  PDF
                </motion.button>

                <motion.button
                  onClick={() => handleDownload('docx')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedFormat === 'docx'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <FiFileText className="w-5 h-5" />
                  DOCX
                </motion.button>

                <motion.button
                  onClick={() => handleDownload('txt')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedFormat === 'txt'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <FiDownload className="w-5 h-5" />
                  TXT
                </motion.button>
              </div>
            </div>

            {/* Resume Preview */}
            <div ref={resumeRef} className="overflow-y-auto p-8 custom-scrollbar" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              <div className="bg-white rounded-lg p-8 shadow-2xl" style={{ color: '#1a1a1a' }}>
                {/* Resume Header */}
                <div className="border-b-4 border-emerald-500 pb-4 mb-6">
                  <div className="flex items-center gap-6 mb-4">
                    {/* Profile Picture */}
                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center border-2 border-emerald-500 overflow-hidden flex-shrink-0">
                      <img 
                        src={profilePic}
                        alt="Haider Khan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <FiUser className="w-12 h-12 text-gray-400" />
                    </div>
                    
                    <div>
                      <h1 className="text-4xl font-bold mb-1" style={{ color: '#1a1a1a' }}>HAIDER KHAN</h1>
                      <p className="text-xl mb-2" style={{ color: '#10B981' }}>AI/ML Engineer & Developer</p>
                      <p className="text-sm text-gray-600">
                        Computer Science Student passionate about AI & Machine Learning
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiMail className="w-4 h-4 text-emerald-500" />
                      rkhaiderali4@gmail.com
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGithub className="w-4 h-4 text-emerald-500" />
                      github.com/Haider-Khann
                    </span>
                    <span className="flex items-center gap-1">
                      <FiLinkedin className="w-4 h-4 text-emerald-500" />
                      linkedin.com/in/haiderkhan-rk
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4 text-emerald-500" />
                      Pakistan
                    </span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-2" style={{ color: '#10B981' }}>
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Computer Science Student passionate about Artificial Intelligence and Machine Learning. 
                    Building software and AI-powered solutions that turn ideas into practical, real-world applications. 
                    Experienced in Python, C++, and full-stack development with focus on ML, NLP, and Generative AI.
                  </p>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-3" style={{ color: '#10B981' }}>
                    EDUCATION
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Bachelor's in Computer Science</p>
                      <p className="text-sm text-gray-600">University of Gujrat</p>
                      <p className="text-sm text-gray-600">Currently in University</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Intermediate in ICS</p>
                      <p className="text-sm text-gray-600">Punjab College</p>
                      <p className="text-sm text-gray-600">Grade: A</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Matriculation</p>
                      <p className="text-sm text-gray-600">A+ School System</p>
                      <p className="text-sm text-gray-600">Grade: A+</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-3" style={{ color: '#10B981' }}>
                    EXPERIENCE
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Freelance Web Developer</p>
                      <p className="text-sm text-gray-600">Built ecomerce websites for clients</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Game Developer</p>
                      <p className="text-sm text-gray-600">Built games like Snake Game, Tic Tac Toe, space shooters etc..</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">AI/ML Developer</p>
                      <p className="text-sm text-gray-600">Student performance predictor, SLIS:smart classroom intelligence system etc..</p>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-3" style={{ color: '#10B981' }}>
                    TECHNICAL SKILLS
                  </h2>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-800">Programming Languages:</p>
                      <p className="text-gray-600">Python, C++, C, JavaScript, Flutter and Dart, SQL, Visual Basic</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">AI & Machine Learning:</p>
                      <p className="text-gray-600">ML, NLP, PyTorch, Generative AI, LLMs/Deep Learning</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Web Development:</p>
                      <p className="text-gray-600">HTML5, CSS3, Node.js, Express, React</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Databases & Tools:</p>
                      <p className="text-gray-600">SQL, MySQL, MongoDB, Git, VS Code</p>
                    </div>
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-3" style={{ color: '#10B981' }}>
                    FEATURED PROJECTS
                  </h2>
                  <div className="space-y-3">
                    {[
                      { title: 'Smart Lecture Intelligence System', desc: 'AI-powered classroom analysis with speech recognition and NLP' },
                      { title: 'Jarvis — AI Assistant', desc: 'Voice-controlled AI assistant for automation' },
                      { title: 'AI Student Performance Predictor', desc: 'ML system for predicting academic performance' },
                      { title: 'Safar-e-Pak', desc: 'Travel management web application (MERN stack)' },
                      { title: 'Car Rental System', desc: 'C++ project implementing Data Structures' },
                      { title: 'Space Shooter Game', desc: '2D arcade game with Python and Pygame' },
                      { title: 'Snake Game', desc: 'Classic Snake game developed using C/C++' },
                      { title: 'Tic Tac Toe', desc: 'Two-player game using Assembly Language' },
                    ].map((project, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-semibold text-gray-800">{project.title}</p>
                        <p className="text-gray-600">{project.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <h2 className="text-lg font-bold mb-3" style={{ color: '#10B981' }}>
                    HOBBIES
                  </h2>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-800">Sports:</p>
                      <p className="text-gray-600">Badminton, Cricket, Chess</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Others:</p>
                      <p className="text-gray-600">Coding, Acting, Gaming</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal