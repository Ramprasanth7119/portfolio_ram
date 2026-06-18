'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function GlobeMesh() {
  const ref = useRef<THREE.Mesh>(null)
  const dotsRef = useRef<THREE.Points>(null)

  const dotPositions = useMemo(() => {
    const count = 1500
    const arr = new Float32Array(count * 3)
    const r = 2
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      arr[i * 3] = r * Math.cos(theta) * Math.sin(phi)
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#001a2e" emissiveIntensity={0.5} metalness={0.8} roughness={0.4} />
      </mesh>
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dotPositions.length / 3}
            array={dotPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#00D4FF" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <mesh>
        <sphereGeometry args={[2.1, 48, 48]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

export default function Earth() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1} color="#00D4FF" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#7C3AED" />
      <GlobeMesh />
    </Canvas>
  )
}
