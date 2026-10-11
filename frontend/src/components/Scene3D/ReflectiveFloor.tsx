import React from 'react';

export const ReflectiveFloor: React.FC = () => {
  return (
    <group position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Primary Reflective Deep Wine Marble Surface */}
      <mesh receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial
          color="#16050A"
          roughness={0.25}
          metalness={0.7}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Decorative Gold Inlay Ring on Floor */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[2.8, 2.84, 64]} />
        <meshStandardMaterial
          color="#D8B779"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};
