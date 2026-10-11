import React, { useMemo } from 'react';

interface FloralArchProps {
  position?: [number, number, number];
  scale?: number;
}

// Procedural Rose Mesh
const RoseFlower: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
}> = ({ position, rotation, scale, color }) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Central rose core */}
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
      </mesh>
      {/* Petal layer 1 */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={`petal1-${i}`}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.08,
            0.02,
            Math.sin((i * Math.PI) / 2) * 0.08,
          ]}
          rotation={[0.3, (i * Math.PI) / 2, 0.4]}
        >
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial
            color={color}
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>
      ))}
      {/* Outer petal layer 2 */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={`petal2-${i}`}
          position={[
            Math.cos((i * Math.PI) / 3) * 0.15,
            -0.03,
            Math.sin((i * Math.PI) / 3) * 0.15,
          ]}
          rotation={[0.5, (i * Math.PI) / 3, 0.6]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={color}
            roughness={0.6}
            metalness={0.04}
          />
        </mesh>
      ))}
      {/* Golden Calyx / Leaf Accent */}
      <mesh position={[0, -0.08, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.12, 0.08, 5]} />
        <meshStandardMaterial color="#B39255" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const FloralArch: React.FC<FloralArchProps> = ({
  position = [0, 0, -2],
  scale = 1,
}) => {
  // Generate flowers along the graceful arch curve
  const flowerData = useMemo(() => {
    const flowers: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      scale: number;
      color: string;
    }> = [];

    const colors = [
      '#FFF8EF', // Warm Ivory
      '#EBC3C5', // Blush Rose
      '#B66B78', // Antique Rose
      '#F4D8DA', // Soft Petal
      '#D8B779', // Champagne Gold
    ];

    const count = 38;
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI; // 0 to PI
      const radiusX = 2.4;
      const radiusY = 2.6;
      const x = Math.cos(t) * radiusX;
      const y = Math.sin(t) * radiusY - 0.2;
      const z = (Math.random() - 0.5) * 0.35;

      const rotZ = t - Math.PI / 2;
      const rotY = (Math.random() - 0.5) * 0.6;
      const rotX = (Math.random() - 0.5) * 0.6;

      flowers.push({
        position: [x, y, z],
        rotation: [rotX, rotY, rotZ],
        scale: 0.65 + Math.random() * 0.45,
        color: colors[i % colors.length],
      });

      // Add foliage or smaller cluster flowers
      if (i % 2 === 0) {
        flowers.push({
          position: [x + (Math.random() - 0.5) * 0.25, y + (Math.random() - 0.5) * 0.2, z + 0.12],
          rotation: [rotX + 0.2, rotY + 0.2, rotZ],
          scale: 0.45 + Math.random() * 0.3,
          color: colors[(i + 1) % colors.length],
        });
      }
    }

    return flowers;
  }, []);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main Arch Frame - Torus Segment with Gold Finish */}
      <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.4, 0.05, 16, 64, Math.PI]} />
        <meshStandardMaterial
          color="#D8B779"
          metalness={0.92}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Secondary Arch Ribbon Wire for Depth */}
      <mesh position={[0, -0.2, 0.12]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.3, 0.03, 12, 64, Math.PI]} />
        <meshStandardMaterial
          color="#B38A48"
          metalness={0.88}
          roughness={0.25}
        />
      </mesh>

      {/* Floral Blooms Clustered Along Arch */}
      {flowerData.map((f, idx) => (
        <RoseFlower
          key={`rose-${idx}`}
          position={f.position}
          rotation={f.rotation}
          scale={f.scale}
          color={f.color}
        />
      ))}

      {/* Soft Ambient Warm Rim Light on Arch */}
      <pointLight position={[0, 2.5, 0.5]} intensity={1.8} distance={5} color="#FFE6B3" />
      <pointLight position={[-2, 1, 0.5]} intensity={1.2} distance={4} color="#FCE0E3" />
      <pointLight position={[2, 1, 0.5]} intensity={1.2} distance={4} color="#FCE0E3" />
    </group>
  );
};
