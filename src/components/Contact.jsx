import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiCopy, FiMessageCircle, FiUser, FiAtSign } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [hoveredField, setHoveredField] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xaewkken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.subject}`,
        }),
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert('Failed to send message. Please try again or email me directly at rkhaiderali4@gmail.com')
      }
    } catch (error) {
      alert('Network error. Please try again or email me directly at rkhaiderali4@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('rkhaiderali4@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'rkhaiderali4@gmail.com',
      action: copyEmail,
      copied: copied,
      color: '#059669'
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'Haider-Khann',
      link: 'https://github.com/Haider-Khann',
      color: '#3B82F6'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'haiderkhan-rk',
      link: 'https://www.linkedin.com/in/haiderkhan-rk/',
      color: '#8B5CF6'
    }
  ]

  return (
    <section id="contact" className="relative py-24 px-4 bg-[#0A0A0B]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-emerald-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h3>
            
            <p className="text-gray-400 leading-relaxed">
              I'm always interested in hearing about new opportunities, 
              collaborations, or just having a chat about technology and AI.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.03,
                      x: 10,
                      boxShadow: `0 20px 40px ${item.color}30`
                    }}
                    className="relative flex items-center gap-4 p-5 rounded-xl border cursor-pointer backdrop-blur-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)`,
                      borderColor: `${item.color}30`
                    }}
                  >
                    <div 
                      className="p-3 rounded-lg transition-transform duration-300"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-emerald-400 transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <button
                          onClick={item.action}
                          className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2 font-medium"
                        >
                          {item.value}
                          {item.copied ? (
                            <FiCheck className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <FiCopy className="w-4 h-4 text-gray-400 hover:text-white" />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 p-5 rounded-xl border backdrop-blur-sm"
              style={{ 
                background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(5,150,105,0.05))',
                borderColor: 'rgba(5,150,105,0.3)'
              }}
            >
              <motion.span 
                className="w-3 h-3 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-emerald-400 font-medium">
                Currently available for opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-xl p-8 border backdrop-blur-sm"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <FiMessageCircle className="w-6 h-6 text-emerald-400" />
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div 
                onMouseEnter={() => setHoveredField('name')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  animate={hoveredField === 'name' ? { scale: 1.02, x: 5 } : { scale: 1, x: 0 }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div 
                onMouseEnter={() => setHoveredField('email')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FiAtSign className="w-4 h-4" />
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  animate={hoveredField === 'email' ? { scale: 1.02, x: 5 } : { scale: 1, x: 0 }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  placeholder="Your email"
                />
              </div>

              <div 
                onMouseEnter={() => setHoveredField('subject')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  animate={hoveredField === 'subject' ? { scale: 1.02, x: 5 } : { scale: 1, x: 0 }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  placeholder="Subject"
                />
              </div>

              <div 
                onMouseEnter={() => setHoveredField('message')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  animate={hoveredField === 'message' ? { scale: 1.02, x: 5 } : { scale: 1, x: 0 }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.03, y: submitting ? 0 : -2 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-colors shadow-lg ${
                  submitted 
                    ? 'bg-green-600 text-white shadow-green-600/30' 
                    : submitting 
                      ? 'bg-gray-500 text-white cursor-not-allowed' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30'
                }`}
              >
                {submitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <FiSend className="w-5 h-5" />
                    </motion.span>
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <FiCheck className="w-5 h-5" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact