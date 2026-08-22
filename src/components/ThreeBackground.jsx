import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'

// Floating 3D Shapes with Scroll Response
const FloatingShapes = () => {
  const groupRef = useRef()
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate based on time
      groupRef.current.rotation.y += delta * 0.1
      
      // Move shapes based on scroll
      const scrollFactor = scrollY / window.innerHeight
      groupRef.current.position.y = scrollFactor * 0.5
      
      // Subtle mouse parallax
      groupRef.current.rotation.x += (mousePosition.y * 0.1 - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.z += (mousePosition.x * 0.1 - groupRef.current.rotation.z) * 0.05
      
      // Move camera based on scroll
      state.camera.position.z = 10 + Math.sin(scrollFactor * Math.PI) * 2
      state.camera.position.y = scrollFactor * 0.5
      state.camera.lookAt(0, scrollFactor * 0.5, 0)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Torus - Hero Section */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-5, 2, -2]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <MeshDistortMaterial
            color="#059669"
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
            emissive="#064e3b"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Sphere - About Section */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[5, -1, -3]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color="#3B82F6"
            metalness={0.7}
            roughness={0.3}
            distort={0.2}
            speed={1.5}
            emissive="#1e3a5f"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Icosahedron - Projects Section */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[3, 3, -4]}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.9}
            roughness={0.1}
            wireframe
            emissive="#4c1d95"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Octahedron - Skills Section */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, -2, -5]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#059669"
            metalness={0.6}
            roughness={0.4}
            emissive="#064e3b"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Additional Shapes for lower sections */}
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[4, -8, -4]}>
          <dodecahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial
            color="#3B82F6"
            metalness={0.7}
            roughness={0.3}
            distort={0.4}
            speed={1.8}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[-4, -10, -5]}>
          <torusKnotGeometry args={[0.7, 0.2, 64, 8]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Small floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0} floatIntensity={3}>
          <mesh
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 8 - 3
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#059669" : "#3B82F6"}
              metalness={0.5}
              roughness={0.5}
              emissive={Math.random() > 0.5 ? "#059669" : "#3B82F6"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#059669" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#3B82F6" />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        
        <FloatingShapes />
      </Canvas>
    </div>
  )
}

export default ThreeBackground