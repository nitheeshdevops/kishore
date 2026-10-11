import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { WeddingRings } from './WeddingRings';
import { FloralArch } from './FloralArch';
import { FloatingPetals } from './FloatingPetals';
import { GoldenParticles } from './GoldenParticles';
import { HangingLanterns } from './HangingLanterns';
import { ReflectiveFloor } from './ReflectiveFloor';
import { WebGLFallback } from './WebGLFallback';

interface CinematicCanvasProps {
  interactive?: boolean;
  ringsScale?: number;
  ringsPosition?: [number, number, number];
  showArch?: boolean;
  petalCount?: number;
  particleCount?: number;
  className?: string;
}

// Error Boundary for WebGL context
class WebGLBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Context Warning/Error in CinematicCanvas:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  interactive = true,
  ringsScale = 1.1,
  ringsPosition = [0, 0.2, 0],
  showArch = true,
  petalCount = 45,
  particleCount = 160,
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!webglSupported) {
    return <WebGLFallback />;
  }

  const effectiveRingScale = isMobile ? ringsScale * 0.8 : ringsScale;
  const effectivePetalCount = isMobile ? Math.floor(petalCount * 0.6) : petalCount;
  const effectiveParticleCount = isMobile ? Math.floor(particleCount * 0.5) : particleCount;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <WebGLBoundary fallback={<WebGLFallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 0.4, 5.2], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]} // Balanced DPR for performance
        >
          <Suspense fallback={null}>
            {/* Ambient Base Light with Romantic Wine Tone */}
            <ambientLight intensity={0.7} color="#641B2B" />

            {/* Main Key Light - Warm Champagne Sunlight */}
            <directionalLight
              position={[4, 6, 5]}
              intensity={1.8}
              color="#FFF1D0"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />

            {/* Soft Fill Light - Blush Rose Rim */}
            <directionalLight
              position={[-4, 3, 2]}
              intensity={0.9}
              color="#EBC3C5"
            />

            {/* Back Rim Light for Volumetric Contours */}
            <directionalLight
              position={[0, 4, -5]}
              intensity={1.4}
              color="#D8B779"
            />

            {/* 3D Elements */}
            {showArch && (
              <FloralArch
                position={[0, 0, -1.8]}
                scale={isMobile ? 0.78 : 1}
              />
            )}

            <Float
              speed={1.6}
              rotationIntensity={0.2}
              floatIntensity={0.3}
              floatingRange={[-0.08, 0.08]}
            >
              <WeddingRings
                scale={effectiveRingScale}
                position={ringsPosition}
                interactive={interactive}
              />
            </Float>

            <FloatingPetals count={effectivePetalCount} />
            <GoldenParticles count={effectiveParticleCount} />
            <HangingLanterns />
            <ReflectiveFloor />

            {/* Controlled Orbit Interaction if enabled */}
            {interactive && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2 + 0.05}
                minPolarAngle={Math.PI / 3}
                maxAzimuthAngle={Math.PI / 5}
                minAzimuthAngle={-Math.PI / 5}
                rotateSpeed={0.5}
                dampingFactor={0.05}
              />
            )}
          </Suspense>
        </Canvas>
      </WebGLBoundary>

      {/* Subtle vignette layer overlay */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
    </div>
  );
};
