'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface Skill {
  name: string
  color: string
  category: string
}

const SKILLS: Skill[] = [
  { name: 'Java', color: '#f89820', category: 'Programming' },
  { name: 'Python', color: '#3776AB', category: 'Programming' },
  { name: 'C', color: '#A8B9CC', category: 'Programming' },
  { name: 'HTML5', color: '#E34F26', category: 'Frontend' },
  { name: 'CSS3', color: '#1572B6', category: 'Frontend' },
  { name: 'JavaScript', color: '#F7DF1E', category: 'Frontend' },
  { name: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { name: 'React', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', color: '#ffffff', category: 'Frontend' },
  { name: 'Node.js', color: '#339933', category: 'Backend' },
  { name: 'Express', color: '#aaaaaa', category: 'Backend' },
  { name: 'Spring Boot', color: '#6DB33F', category: 'Backend' },
  { name: 'SQL', color: '#4479A1', category: 'Database' },
  { name: 'MongoDB', color: '#47A248', category: 'Database' },
  { name: 'Elasticsearch', color: '#FEC514', category: 'Database' },
  { name: 'Git', color: '#F05032', category: 'Tools' },
  { name: 'GitHub', color: '#ffffff', category: 'Tools' },
  { name: 'Docker', color: '#2496ED', category: 'Tools' },
  { name: 'Postman', color: '#FF6C37', category: 'Tools' },
  { name: 'Figma', color: '#F24E1E', category: 'Tools' },
  { name: 'Apps Script', color: '#4285F4', category: 'Tools' },
]

interface SkillNodeProps {
  position: [number, number, number]
  name: string
  color: string
  baseScale?: number
}

function SkillNode({ position, name, color, baseScale = 1 }: SkillNodeProps) {
  const ref = useRef<THREE.Mesh>(null)
  // Text from @react-three/drei is an instance of THREE.Mesh under the hood
  const textRef = useRef<THREE.Mesh>(null) 
  const [hovered, setHovered] = useState<boolean>(false)

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime()
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.05
      const target = hovered ? 1.6 : 1
      ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1)
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.18 * baseScale, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.6}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.32 * baseScale, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.25 : 0.08} />
      </mesh>
      {/* @ts-ignore - Drei Text components sometimes clash with modern internal fiber intrinsic types */}
      <Text
        ref={textRef}
        position={[0, 0.5, 0]}
        fontSize={0.18}
        color={hovered ? '#00D4FF' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

function Galaxy() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  const positions = useMemo<[number, number, number][]>(() => {
    return SKILLS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length)
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi
      const r = 3
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]
    })
  }, [])

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={positions[i]}
          name={skill.name}
          color={skill.color}
        />
      ))}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.04} />
      </mesh>
    </group>
  )
}

export default function SkillsGalaxy() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00D4FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#7C3AED" />
      <Galaxy />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  )
}
