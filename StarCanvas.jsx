"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
    return positions.filter((value) => !isNaN(value)); 
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = ({ children }) => (
  <div
    style={{
      width: "100%",
      height: "100vh",
      position: "fixed",
      inset: "0",
      zIndex: -1, 
      background: "black", 
      overflow: "hidden",
    }}
  >
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
    {/* Overlay children */}
    <div
      style={{
        position: "relative",
        zIndex: 1, 
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </div>
  </div>
);

export default StarsCanvas;
