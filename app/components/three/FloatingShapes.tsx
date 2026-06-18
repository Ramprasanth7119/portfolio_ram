'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface ShapeProps {
  position: [number, number, number]
  geometry: React.ReactNode
  color: string
  speed?: number
  scale?: number
}

function Shape({ position, geometry, color, speed = 1, scale = 1 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3 * speed
      ref.current.rotation.y += delta * 0.2 * speed
      const t = state.clock.getElapsedTime()
      ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.4
    }
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={0.85}
        wireframe={false}
      />
    </mesh>
  )
}

type GeometryKind = 'dodecahedron' | 'icosahedron' | 'octahedron' | 'torus'

interface ShapeConfig {
  position: [number, number, number]
  geo: GeometryKind
  color: string
  scale: number
  speed: number
}

function ShapesGroup() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04
    }
  })

  const shapes = useMemo<ShapeConfig[]>(() => {
    const arr: ShapeConfig[] = []
    const colors = ['#00D4FF', '#7C3AED', '#06B6D4']
    const geometries: GeometryKind[] = ['dodecahedron', 'icosahedron', 'octahedron', 'torus']
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 4 + Math.random() * 2
      arr.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius - 2,
        ],
        geo: geometries[i % geometries.length],
        color: colors[i % colors.length],
        scale: 0.4 + Math.random() * 0.5,
        speed: 0.5 + Math.random() * 0.8,
      })
    }
    return arr
  }, [])

  const geomFor = (kind: GeometryKind): React.ReactNode => {
    if (kind === 'dodecahedron') return <dodecahedronGeometry args={[1, 0]} />
    if (kind === 'icosahedron') return <icosahedronGeometry args={[1, 0]} />
    if (kind === 'octahedron') return <octahedronGeometry args={[1, 0]} />
    return <torusGeometry args={[0.7, 0.25, 16, 50]} />
  }

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <Shape
          key={i}
          position={s.position}
          geometry={geomFor(s.geo)}
          color={s.color}
          scale={s.scale}
          speed={s.speed}
        />
      ))}
    </group>
  )
}

export default function FloatingShapes() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#7C3AED" />
      <ShapesGroup />
    </Canvas>
  )
}
