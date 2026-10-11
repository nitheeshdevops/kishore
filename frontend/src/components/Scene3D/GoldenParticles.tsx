import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GoldenParticlesProps {
  count?: number;
}

export const GoldenParticles: React.FC<GoldenParticlesProps> = ({ count = 180 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, randomFactors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const factors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      factors[i * 3] = Math.random(); // Phase
      factors[i * 3 + 1] = 0.5 + Math.random() * 1.5; // Speed
      factors[i * 3 + 2] = 0.5 + Math.random() * 0.5; // Amplitude
    }

    return { positions: pos, randomFactors: factors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const phase = randomFactors[i * 3];
      const speed = randomFactors[i * 3 + 1];
      const amp = randomFactors[i * 3 + 2];

      // Gentle drift upward and shimmering sway
      pos[i * 3 + 1] += Math.sin(t * speed + phase) * 0.003;
      pos[i * 3] += Math.cos(t * speed * 0.7 + phase) * 0.002 * amp;

      // Wrap vertically
      if (pos[i * 3 + 1] > 6) {
        pos[i * 3 + 1] = -5;
      }
    }

    geo.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#FDE8B5"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
