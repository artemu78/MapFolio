import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface TechMapProps {
  technologies: string[];
}

const techConfig = {
  'TypeScript': { color: '#3178c6', position: [-4, 4, 0] as [number, number, number] },
  'JavaScript': { color: '#f7df1e', position: [-5, 0, 0] as [number, number, number] },
  'AWS': { color: '#FF9900', position: [5, 3, -2] as [number, number, number] },
  'React Router': { color: '#CA4245', position: [0, -3, 0] as [number, number, number] },
  'Zustand': { color: '#9a7f39', position: [-2, -5, 1] as [number, number, number] },
  'Firebase': { color: '#FFCA28', position: [4, -2, -1] as [number, number, number] },
};

function RotatingBox({ position, color, text }: { position: [number, number, number], color: string, text: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 0.5, 0.2]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
}

export function SimpleTechMap({ technologies }: TechMapProps) {
  return (
    <div className="w-screen h-screen" style={{ background: '#050217' }}>
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {technologies.map((tech) => {
          const config = techConfig[tech as keyof typeof techConfig];
          if (!config) return null;
          
          return (
            <RotatingBox
              key={tech}
              position={config.position}
              color={config.color}
              text={tech}
            />
          );
        })}
      </Canvas>
    </div>
  );
}