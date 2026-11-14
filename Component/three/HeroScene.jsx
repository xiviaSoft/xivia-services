"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function GlassForm({
  geometry,
  position,
  scale = 1,
  color = "#8ecad6",
  speed = 0.2,
}) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.7;
    ref.current.rotation.y = t * speed;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale} castShadow>
        {geometry}
        <meshPhysicalMaterial
          color={color}
          roughness={0.12}
          metalness={0.05}
          transmission={0.72}
          thickness={1.4}
          ior={1.4}
          transparent
          opacity={0.95}
          clearcoat={1}
          clearcoatRoughness={0.12}
          attenuationColor={color}
          attenuationDistance={2.5}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.current.x * 0.35,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.y * 0.18,
      0.05
    );
  });

  const shapes = useMemo(
    () => [
      {
        key: "ico",
        geometry: <icosahedronGeometry args={[1.15, 0]} />,
        position: [0.15, 0.1, 0],
        scale: 1.15,
        color: "#7fc4d4",
        speed: 0.18,
      },
      {
        key: "torus",
        geometry: <torusGeometry args={[0.72, 0.22, 32, 64]} />,
        position: [-1.35, 0.55, -0.4],
        scale: 0.85,
        color: "#a8d8c8",
        speed: 0.28,
      },
      {
        key: "sphere",
        geometry: <sphereGeometry args={[0.55, 48, 48]} />,
        position: [1.25, -0.35, 0.35],
        scale: 1,
        color: "#b7d3e8",
        speed: 0.22,
      },
      {
        key: "octa",
        geometry: <octahedronGeometry args={[0.45, 0]} />,
        position: [-0.7, -0.85, 0.6],
        scale: 0.9,
        color: "#9ad0c2",
        speed: 0.32,
      },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 3]} intensity={1.25} />
      <pointLight position={[-3, 1, 2]} intensity={0.55} color="#a8d4e8" />
      <group ref={group}>
        {shapes.map(({ key, ...props }) => (
          <GlassForm key={key} {...props} />
        ))}
      </group>
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.28}
        scale={8}
        blur={2.8}
        far={3}
      />
      <Environment preset="city" />
    </>
  );
}

function FallbackOrb() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(127,196,212,0.55) 42%, rgba(168,212,232,0.2) 70%, transparent 75%)",
        filter: "blur(2px)",
      }}
      aria-hidden
    />
  );
}

export default function HeroScene() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduced) {
    return <FallbackOrb />;
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
