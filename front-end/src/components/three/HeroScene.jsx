import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";

function FloatingShapes() {
  const group = useRef();

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    group.current.rotation.y = Math.sin(time * 0.2) * 0.2;
    group.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 1, 0]}>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
          <MeshDistortMaterial
            color="#7C3AED"
            distort={0.2}
            speed={2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-2, -1, 1]}>
          <octahedronGeometry args={[1]} />
          <MeshDistortMaterial
            color="#06B6D4"
            distort={0.1}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={2} floatIntensity={2.5}>
        <mesh position={[0, -2, -2]}>
          <sphereGeometry args={[0.9, 64, 64]} />
          <MeshDistortMaterial
            color="#2563EB"
            distort={0.3}
            speed={2}
            metalness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function HeroScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.8,
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.5}
          color="#06B6D4"
        />

        <FloatingShapes />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />
      </Canvas>
    </div>
  );
}

export default HeroScene;