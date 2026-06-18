'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const count = 2000
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        color="#ffffff" 
        transparent 
        opacity={0.7} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  )
}

export default function Starfield() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 75], fov: 75 }} 
        dpr={[1, 1.5]} 
        gl={{ alpha: true, antialias: false }}
      >
        <Stars />
      </Canvas>
    </div>
  )
}
