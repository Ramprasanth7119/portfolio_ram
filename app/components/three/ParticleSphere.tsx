'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSphereProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function ParticleSphere({ mouse }: ParticleSphereProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const innerRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const count = 3500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const c1 = new THREE.Color('#00D4FF')
    const c2 = new THREE.Color('#7C3AED')
    const c3 = new THREE.Color('#06B6D4')
    for (let i = 0; i < count; i++) {
      // distribute on sphere using Fibonacci method
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = 2.2 + (Math.random() - 0.5) * 0.15
      positions[i * 3] = r * Math.cos(theta) * Math.sin(phi)
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      const col = t < 0.45 ? c1 : t < 0.85 ? c2 : c3
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }
    return [positions, colors]
  }, [])

  const innerPositions = useMemo(() => {
    const count = 800
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1
      pointsRef.current.rotation.x += delta * 0.04
      // Mouse parallax
      const mx = mouse?.current?.x || 0
      const my = mouse?.current?.y || 0
      pointsRef.current.rotation.y += (mx * 0.5 - pointsRef.current.rotation.y * 0.001) * 0.001
      pointsRef.current.rotation.x += (my * 0.3 - pointsRef.current.rotation.x * 0.001) * 0.001
      pointsRef.current.position.x = mx * 0.3
      pointsRef.current.position.y = -my * 0.3
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.2
      innerRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={innerRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={innerPositions.length / 3}
            array={innerPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00D4FF"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}
