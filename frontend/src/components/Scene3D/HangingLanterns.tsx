import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternProps {
  position: [number, number, number];
  scale?: number;
  swayOffset?: number;
}

const SingleLantern: React.FC<LanternProps> = ({
  position,
  scale = 1,
  swayOffset = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle romantic pendulum sway
      groupRef.current.rotation.z = Math.sin(t * 0.8 + swayOffset) * 0.05;
      groupRef.current.rotation.x = Math.cos(t * 0.6 + swayOffset) * 0.03;
    }
    if (lightRef.current) {
      // Warm candle flame micro-flicker
      lightRef.current.intensity = 1.6 + Math.sin(t * 8 + swayOffset) * 0.25 + Math.cos(t * 15) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Hanging Chain / Cord */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 2.4, 8]} />
        <meshStandardMaterial color="#B08D4B" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Top Cap */}
      <mesh position={[0, 0.45, 0]}>
        <coneGeometry args={[0.22, 0.25, 6]} />
        <meshStandardMaterial color="#D8B779" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Hexagonal Glass Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.5, 6, 1, true]} />
        <meshPhysicalMaterial
          color="#FFF2D6"
          transmission={0.85}
          opacity={0.9}
          transparent
          roughness={0.15}
          ior={1.5}
        />
      </mesh>

      {/* Inner Glowing Candle Core */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 12]} />
        <meshStandardMaterial color="#FFF9E6" emissive="#FFD580" emissiveIntensity={1.2} />
      </mesh>

      {/* Bottom Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.12, 6]} />
        <meshStandardMaterial color="#D8B779" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Warm Flickering Candlelight */}
      <pointLight
        ref={lightRef}
        position={[0, 0.1, 0]}
        color="#FFDA8A"
        intensity={1.8}
        distance={4.5}
        decay={2}
      />
    </group>
  );
};

export const HangingLanterns: React.FC = () => {
  return (
    <group>
      {/* Left Lanterns */}
      <SingleLantern position={[-3.2, 1.8, -1.2]} scale={0.75} swayOffset={0} />
      <SingleLantern position={[-2.1, 2.4, -2.5]} scale={0.6} swayOffset={1.2} />

      {/* Right Lanterns */}
      <SingleLantern position={[3.2, 1.8, -1.2]} scale={0.75} swayOffset={2.5} />
      <SingleLantern position={[2.1, 2.4, -2.5]} scale={0.6} swayOffset={3.8} />
    </group>
  );
};
