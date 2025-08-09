import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';

interface TechMapProps {
  technologies: string[];
}

interface TechConfig {
  color: string;
  position: [number, number, number];
}

const techConfig: Record<string, TechConfig> = {
  'TypeScript': { color: '#3178c6', position: [-4, 4, 0] },
  'JavaScript': { color: '#f7df1e', position: [-5, 0, 0] },
  'AWS': { color: '#FF9900', position: [5, 3, -2] },
  'React Router': { color: '#CA4245', position: [0, -3, 0] },
  'Zustand': { color: '#9a7f39', position: [-2, -5, 1] },
  'Firebase': { color: '#FFCA28', position: [4, -2, -1] },
  'Material UI': { color: '#0081CB', position: [6, 0, 0] },
  'Chrome Extensions': { color: '#e0e0e0', position: [0, 5, 2] }
};

interface TechLabelProps {
  text: string;
  position: [number, number, number];
  color: string;
}

function TechLabel({ text, position, color }: TechLabelProps) {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
        data-testid={`tech-label-${text.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <boxGeometry args={[text.length * 0.3, 0.5, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ControlPanel({ techCount }: { techCount: number }) {
  return (
    <div 
      className="fixed top-5 left-5 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white text-sm"
      style={{ fontFamily: 'var(--font-orbitron)' }}
      data-testid="control-panel"
    >
      <div className="font-semibold mb-2">3D Tech Map</div>
      <div className="text-xs opacity-80">
        Camera: Perspective<br />
        Renderer: WebGL<br />
        <span data-testid="tech-count">{techCount}</span> Technologies Loaded
      </div>
    </div>
  );
}

function Instructions() {
  return (
    <div 
      className="fixed bottom-5 left-5 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white text-xs max-w-xs"
      style={{ fontFamily: 'var(--font-orbitron)' }}
      data-testid="instructions"
    >
      <div className="font-semibold mb-2">Controls</div>
      <div>
        🖱️ <strong>Drag:</strong> Pan around<br />
        🔄 <strong>Scroll:</strong> Zoom in/out<br />
        🎯 <strong>Hover:</strong> Enhance glow<br />
        📐 Rotation: Disabled
      </div>
    </div>
  );
}

export function TechMap({ technologies }: TechMapProps) {
  try {
    return (
      <div 
        className="w-screen h-screen"
        style={{ background: '#050217' }}
        data-testid="tech-map-container"
      >
        <ControlPanel techCount={technologies.length} />
        <Instructions />
        
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          data-testid="three-canvas"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {technologies.map((tech, index) => {
            const config = techConfig[tech];
            if (!config) return null;
            
            return (
              <TechLabel
                key={tech}
                text={tech}
                position={config.position}
                color={config.color}
              />
            );
          })}
          
          <OrbitControls
            enableRotate={false}
            enablePan={true}
            enableZoom={true}
            minDistance={5}
            maxDistance={30}
            panSpeed={1}
            zoomSpeed={1}
          />
        </Canvas>
      </div>
    );
  } catch (error) {
    console.error('TechMap error:', error);
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl mb-4">3D Tech Map</h1>
          <p>Loading 3D visualization...</p>
          <div className="mt-4 text-sm opacity-70">
            Technologies: {technologies.join(', ')}
          </div>
        </div>
      </div>
    );
  }
}
