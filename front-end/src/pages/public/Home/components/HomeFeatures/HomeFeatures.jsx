import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Container } from "../../../../../components/layout";
import { SectionHeading } from "../../../../../components/ui";
import { homeFeaturesContent } from "../../../../../Scripts/Contents/Home";

import styles from "./HomeFeatures.module.css";

const iconThemes = [
  ["#2563eb", "#22c55e"],
  ["#7c3aed", "#06b6d4"],
  ["#0891b2", "#f59e0b"],
  ["#4f46e5", "#ec4899"],
  ["#16a34a", "#2563eb"],
  ["#0f172a", "#38bdf8"],
];

function HomeFeatures() {
  return (
    <section
      id="features"
      className={styles.section}
      aria-labelledby="home-features-title"
    >
      <Container>
        <SectionHeading
          eyebrow={homeFeaturesContent.eyebrow}
          title={homeFeaturesContent.title}
          titleId="home-features-title"
          description={homeFeaturesContent.description}
          className={styles.sectionHeader}
        />

        <div className={styles.featuresShowcase}>
          <div className={styles.orbitStage} aria-hidden="true">
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={1.4} />
              <pointLight position={[3, 3, 4]} intensity={2} />
              <FeatureConstellation />
            </Canvas>
          </div>

          <div className={styles.featuresList}>
            {homeFeaturesContent.features.map((feature, index) => (
              <article
                key={feature.id}
                className={styles.featureItem}
                style={{ "--item-delay": `${index * 85}ms` }}
              >
                <span className={styles.featureIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.featureIcon} aria-hidden="true">
                  <Canvas
                    camera={{ position: [0, 0, 4], fov: 48 }}
                    dpr={[1, 1.5]}
                  >
                    <ambientLight intensity={1.2} />
                    <pointLight position={[2, 2, 3]} intensity={1.8} />
                    <FeatureIconShape
                      index={index}
                      colors={iconThemes[index % iconThemes.length]}
                    />
                  </Canvas>
                </div>

                <div className={styles.featureCopy}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>

                <ArrowUpRight
                  className={styles.arrowIcon}
                  size={21}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureConstellation() {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef} rotation={[0.2, -0.2, 0]}>
      {/* Main floating note page */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[2.5, 3.2, 0.05]} receiveShadow castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Smaller floating note overlapping */}
      <mesh position={[0.8, -0.5, 0.4]} rotation={[0, 0, 0.1]} scale={[1.8, 2.4, 0.05]} receiveShadow castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Pencil/Stylus */}
      <group position={[0.4, 0.5, 0.8]} rotation={[0.4, -0.2, 0.5]}>
        <mesh position={[0, 0, 0]} scale={[0.12, 1.8, 0.12]} castShadow>
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, -1, 0]} scale={[0.12, 0.3, 0.12]} castShadow>
          <cylinderGeometry args={[1, 0.1, 1, 16]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.8} />
        </mesh>
        <mesh position={[0, -1.2, 0]} scale={[0.04, 0.1, 0.04]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Small floating UI blocks (representing tasks/folders) */}
      <mesh position={[-1.2, 1.2, 0.3]} rotation={[0.1, 0.1, -0.1]} scale={[0.8, 0.3, 0.1]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[-1.0, 0.7, 0.5]} rotation={[0.2, 0.1, -0.15]} scale={[0.6, 0.3, 0.1]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Decorative spheres / nodes */}
      <mesh position={[1.5, 1.5, -0.5]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.5, -1.2, 0.2]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function FeatureIconShape({ index, colors }) {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
  });

  const type = index % 3;

  return (
    <group ref={groupRef}>
      {type === 0 && (
        <group>
          {/* Folded Document Icon */}
          <mesh position={[0, 0, 0]} scale={[1, 1.3, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[0]} roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0.25, 0.4, 0.06]} scale={[0.3, 0.3, 0.05]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[1]} roughness={0.2} />
          </mesh>
        </group>
      )}
      
      {type === 1 && (
        <group>
          {/* Stacked Cards/Tasks */}
          <mesh position={[0, -0.2, 0.1]} rotation={[0, 0, -0.1]} scale={[1.2, 0.8, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[0]} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.2, -0.1]} rotation={[0, 0, 0.1]} scale={[1.2, 0.8, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[1]} roughness={0.3} />
          </mesh>
        </group>
      )}

      {type === 2 && (
        <group>
          {/* Checkmark or Checkbox style */}
          <mesh position={[0, 0, 0]} scale={[1.1, 1.1, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[0]} roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0.1, 0, 0.1]} scale={[0.4, 0.4, 0.1]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[1]} emissive={colors[1]} emissiveIntensity={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default HomeFeatures;
