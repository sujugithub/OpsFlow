"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

/* ── Background plane — the JPG the glass orb refracts ─────────── */
function BackgroundPlane() {
  const texture = useTexture("/hero-bg.jpg");
  const { viewport } = useThree();

  // Replicate CSS object-fit: cover — scale texture to fill without distortion
  const imgAspect = 4000 / 2250; // hero-bg.jpg native aspect ratio
  const viewAspect = viewport.width / viewport.height;
  if (imgAspect > viewAspect) {
    texture.repeat.set(viewAspect / imgAspect, 1);
  } else {
    texture.repeat.set(1, imgAspect / viewAspect);
  }
  texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);

  // Camera is at z=5, plane is at z=-3 → distance ratio = 8/5 = 1.6
  const scale = (5 + 3) / 5;

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[viewport.width * scale, viewport.height * scale]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

/* ── Apple liquid-glass sphere that follows the mouse ───────────── */
function GlassOrb({
  mouseRef,
  orbRef,
}: {
  mouseRef: MouseRef;
  orbRef: React.MutableRefObject<THREE.Mesh | null>;
}) {
  const { viewport, size } = useThree();
  const r = Math.min(viewport.height, viewport.width) * 0.19;

  useFrame(() => {
    if (!orbRef.current) return;
    const tx = ((mouseRef.current.x / size.width) - 0.5) * viewport.width;
    const ty = -((mouseRef.current.y / size.height) - 0.5) * viewport.height;
    orbRef.current.position.x += (tx - orbRef.current.position.x) * 0.1;
    orbRef.current.position.y += (ty - orbRef.current.position.y) * 0.1;
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[r, 128, 128]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={2.0}
        roughness={0}
        ior={1.5}
        samples={16}
        resolution={640}
        chromaticAberration={0.18}
        dispersion={6}
        backside
        backsideThickness={0.6}
        distortion={0.10}
        distortionScale={0.3}
        temporalDistortion={0.12}
        color="#ffffff"
      />
    </mesh>
  );
}

/* ── Full scene ─────────────────────────────────────────────────── */
function Scene({ mouseRef }: { mouseRef: MouseRef }) {
  const orbRef = useRef<THREE.Mesh | null>(null);
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[-w * 0.5, h * 0.8, 4]} intensity={2.0} color="#ffffff" />
      {/* Subtle coloured lights for rim highlights on the glass */}
      <pointLight position={[-w * 0.4, h * 0.3, 3]} intensity={40} color="#aaccff" decay={2} />
      <pointLight position={[w * 0.45, -h * 0.1, 3]} intensity={30} color="#ffffff" decay={2} />

      <BackgroundPlane />
      <GlassOrb mouseRef={mouseRef} orbRef={orbRef} />
    </>
  );
}

/* ── Canvas overlay ─────────────────────────────────────────────── */
export default function LiquidGlassOrb({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20 }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <Scene mouseRef={mouseRef} />
    </Canvas>
  );
}
