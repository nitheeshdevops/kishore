import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingPetalsProps {
  count?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ count = 55 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize petals data with varied positions, speeds, flutter phases
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: Math.random() * 10 - 2,
      z: (Math.random() - 0.5) * 8 + 1,
      speedY: 0.008 + Math.random() * 0.015,
      speedX: (Math.random() - 0.5) * 0.006,
      rotSpeedX: 0.01 + Math.random() * 0.02,
      rotSpeedY: 0.008 + Math.random() * 0.025,
      rotSpeedZ: 0.015 + Math.random() * 0.02,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      scale: 0.08 + Math.random() * 0.12,
      flutterFreq: 1 + Math.random() * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    petals.forEach((p, i) => {
      // Gentle downward floating with sinusoidal flutter
      p.y -= p.speedY;
      p.x += Math.sin(t * p.flutterFreq + i) * 0.004 + p.speedX;
      p.z += Math.cos(t * p.flutterFreq * 0.5 + i) * 0.002;

      // Wrap around smoothly
      if (p.y < -4) {
        p.y = 6;
        p.x = (Math.random() - 0.5) * 12;
      }

      // Continuous natural tumbling rotation
      p.rotX += p.rotSpeedX;
      p.rotY += p.rotSpeedY;
      p.rotZ += p.rotSpeedZ;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.set(p.scale, p.scale * 1.3, p.scale * 0.3);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Curved petal geometry using a deformed plane or sphere slice
  const petalGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 12, 12, 0, Math.PI, 0, Math.PI / 1.8);
    return geo;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeo, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <meshStandardMaterial
        color="#E8B7BD"
        roughness={0.65}
        metalness={0.06}
        side={THREE.DoubleSide}
        transparent
        opacity={0.88}
      />
    </instancedMesh>
  );
};
