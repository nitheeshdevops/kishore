import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WeddingRingsProps {
  scale?: number;
  position?: [number, number, number];
  interactive?: boolean;
}

export const WeddingRings: React.FC<WeddingRingsProps> = ({
  scale = 1,
  position = [0, 0, 0],
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const diamondRef = useRef<THREE.Mesh>(null);
  const particleTrailRef = useRef<THREE.Points>(null);

  // Generate romantic heart-shaped particle curve points
  const heartPoints = useMemo(() => {
    const pts: number[] = [];
    const count = 180;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Parametric heart curve
      const x = 16 * Math.pow(Math.sin(t), 3) * 0.08;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.08 + 0.3;
      const z = Math.sin(t * 3) * 0.15;
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating levitation
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;

      if (interactive) {
        // Subtle mouse tracking tilt
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          t * 0.35 + state.pointer.x * 0.35,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          Math.sin(t * 0.7) * 0.08 - state.pointer.y * 0.25,
          0.05
        );
      } else {
        groupRef.current.rotation.y = t * 0.35;
      }
    }

    if (ring1Ref.current && ring2Ref.current) {
      // Harmonic intertwining motion
      ring1Ref.current.rotation.z = Math.PI / 4 + Math.sin(t * 0.8) * 0.05;
      ring2Ref.current.rotation.z = -Math.PI / 4 + Math.cos(t * 0.8) * 0.05;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      ring2Ref.current.rotation.x = -Math.sin(t * 0.5) * 0.1;
    }

    if (particleTrailRef.current) {
      particleTrailRef.current.rotation.z = t * 0.15;
      particleTrailRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Ring 1 - Kishore's Polished Gold Band */}
      <mesh ref={ring1Ref} position={[-0.32, 0, 0]} rotation={[0.4, 0.3, Math.PI / 4]} castShadow receiveShadow>
        <torusGeometry args={[0.75, 0.11, 32, 64]} />
        <meshStandardMaterial
          color="#F2D794"
          metalness={0.96}
          roughness={0.16}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Ring 2 - The Bride's Elegant Diamond Solitaire Band */}
      <group position={[0.32, 0.12, 0]}>
        <mesh ref={ring2Ref} rotation={[-0.4, -0.3, -Math.PI / 4]} castShadow receiveShadow>
          <torusGeometry args={[0.72, 0.095, 32, 64]} />
          <meshStandardMaterial
            color="#EED38A"
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Diamond Setting Crown */}
        <mesh position={[0, 0.76, 0.15]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#F7E6BE" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Brilliant Solitaire Gemstone */}
        <mesh ref={diamondRef} position={[0, 0.84, 0.15]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[0.13, 1]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.92}
            opacity={1}
            transparent
            roughness={0.04}
            ior={2.42}
            thickness={0.5}
            reflectivity={0.98}
            attenuationColor="#FBE9B9"
            attenuationDistance={1}
          />
        </mesh>
      </group>

      {/* Radiant Glow Point Light at the heart of the rings */}
      <pointLight position={[0, 0.2, 0.2]} intensity={2.8} distance={3.5} color="#FCE8B3" />

      {/* Glowing Gold Heart Particle Trail */}
      <points ref={particleTrailRef} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[heartPoints, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#FCE7B0"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
