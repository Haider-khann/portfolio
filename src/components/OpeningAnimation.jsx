import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei'

// 3D Cube Component
const TransformingCube = ({ phase }) => {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation based on phase
      if (phase < 2) {
        meshRef.current.rotation.x += delta * 0.5
        meshRef.current.rotation.y += delta * 0.8
      } else {
        // Smooth transition to final position
        meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.1
        meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.1
      }
      
      // Scale transition when transforming
      if (phase === 3) {
        meshRef.current.scale.x += (2.5 - meshRef.current.scale.x) * 0.05
        meshRef.current.scale.y += (0.1 - meshRef.current.scale.y) * 0.05
        meshRef.current.scale.z += (0.1 - meshRef.current.scale.z) * 0.05
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshDistortMaterial
        color="#059669"  // Dark green
        metalness={0.9}
        roughness={0.1}
        distort={phase === 3 ? 0.5 : 0}
        speed={2}
        emissive="#064e3b"  // Slight green glow
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// Heart Rate Wave Component
const HeartRateWaves = ({ phase }) => {
  return (
    <motion.div 
      className="absolute inset-0 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase >= 1 ? 0.2 : 0 }}
      transition={{ duration: 1 }}
    >
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[0, 10, 20, 30, 40, 50].map((offset, index) => (
          <motion.path
            key={index}
            d="M 0,50 Q 5,50 10,50 T 20,50 T 30,50 T 40,50 T 50,50 T 60,50 T 70,50 T 80,50 T 90,50 T 100,50"
            fill="none"
            stroke="#722F37"  // Wine red
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
              y: [offset, -20 - index * 5, offset]
            }}
            transition={{ 
              duration: 3,
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated ECG line */}
        <motion.path
          d="M 0,50 L 20,50 L 25,50 L 30,30 L 35,70 L 40,50 L 45,50 L 50,50 L 55,50 L 60,20 L 65,80 L 70,50 L 75,50 L 80,50 L 85,50 L 90,50 L 100,50"
          fill="none"
          stroke="#8B2635"  // Wine red
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: phase >= 1 ? [0, 1] : 0,
            opacity: phase >= 1 ? [0, 1, 0.7] : 0
          }}
          transition={{ 
            duration: 2,
            delay: 1.5,
            repeat: phase >= 1 ? Infinity : 0,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  )
}

// Shining Particles Component
const ShiningParticles = ({ phase }) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 1 || phase === 2 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: `radial-gradient(circle, #10b981, #059669, transparent)`,
            boxShadow: '0 0 10px #10b981, 0 0 20px #059669, 0 0 40px #047857',
          }}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 2.5,
            delay: Math.random() * 1,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}

// Main Opening Animation Component
const OpeningAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState(0)
  
  useEffect(() => {
    const timers = [
      // Phase 0: Cube appears and starts rotating (0-1.5s)
      setTimeout(() => setPhase(1), 1500),
      // Phase 1: Cube continues rotating with particles (1.5-3s)
      setTimeout(() => setPhase(2), 3000),
      // Phase 2: Name and details appear (3-5s) - Extended for reading
      setTimeout(() => setPhase(3), 5000),
      // Phase 3: Cube transforms (5-6.5s)
      setTimeout(() => onComplete(), 6500),
    ]
    
    return () => timers.forEach(t => clearTimeout(t))
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0A0A0B] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#059669" />
          <TransformingCube phase={phase} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Canvas>
      </div>

      {/* Heart Rate Waves Background */}
      <HeartRateWaves phase={phase} />

      {/* Shining Particles */}
      <ShiningParticles phase={phase} />

      {/* Text Overlay */}
      <div className="relative z-10 text-center">
        {/* "Haider Khan" Text */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ 
            opacity: phase >= 2 ? 1 : 0,
            letterSpacing: phase >= 2 ? "0.1em" : "0.5em",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Haider Khan
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: phase >= 2 ? 1 : 0,
            y: phase >= 2 ? 0 : 20 
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          AI/ML Engineer & Developer
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          className="mt-8 h-0.5 bg-gradient-to-r from-red-800 to-rose-700 mx-auto"
          initial={{ width: 0 }}
          animate={{ 
            width: phase === 0 ? '0%' : 
                   phase === 1 ? '30%' : 
                   phase === 2 ? '70%' : 
                   phase === 3 ? '100%' : '0%'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ maxWidth: '300px' }}
        />
      </div>
    </motion.div>
  )
}

export default OpeningAnimation




