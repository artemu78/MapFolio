import { useState } from 'react';

interface TechMapProps {
  technologies: string[];
}

const techConfig = {
  'TypeScript': { color: '#3178c6', position: { x: 20, y: 60 } },
  'JavaScript': { color: '#f7df1e', position: { x: 10, y: 40 } },
  'AWS': { color: '#FF9900', position: { x: 70, y: 70 } },
  'React Router': { color: '#CA4245', position: { x: 50, y: 30 } },
  'Zustand': { color: '#9a7f39', position: { x: 30, y: 20 } },
  'Firebase': { color: '#FFCA28', position: { x: 80, y: 45 } },
  'Material UI': { color: '#0081CB', position: { x: 85, y: 60 } },
  'Chrome Extensions': { color: '#e0e0e0', position: { x: 45, y: 80 } }
};

function TechLabel({ tech, config }: { tech: string, config: { color: string, position: { x: number, y: number } } }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
      style={{ 
        left: `${config.position.x}%`, 
        top: `${config.position.y}%`,
        transform: `translate(-50%, -50%) scale(${hovered ? 1.1 : 1})`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`tech-label-${tech.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div
        className="px-4 py-2 rounded-lg font-bold text-white shadow-lg border-2 border-opacity-50"
        style={{
          backgroundColor: config.color,
          borderColor: config.color,
          boxShadow: `0 0 ${hovered ? '20px' : '10px'} ${config.color}40`,
          fontFamily: 'Orbitron, monospace'
        }}
      >
        {tech}
      </div>
    </div>
  );
}

export function FallbackTechMap({ technologies }: TechMapProps) {
  return (
    <div 
      className="w-screen h-screen relative overflow-hidden"
      style={{ background: '#050217' }}
      data-testid="tech-map-container"
    >
      {/* Control Panel */}
      <div 
        className="fixed top-5 left-5 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white text-sm"
        style={{ fontFamily: 'Orbitron, monospace' }}
        data-testid="control-panel"
      >
        <div className="font-semibold mb-2">Tech Portfolio Map</div>
        <div className="text-xs opacity-80">
          Mode: 2D Fallback<br />
          <span data-testid="tech-count">{technologies.length}</span> Technologies Loaded
        </div>
      </div>
      
      {/* Instructions */}
      <div 
        className="fixed bottom-5 left-5 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white text-xs max-w-xs"
        style={{ fontFamily: 'Orbitron, monospace' }}
        data-testid="instructions"
      >
        <div className="font-semibold mb-2">Controls</div>
        <div>
          🖱️ <strong>Hover:</strong> Enhanced glow<br />
          💡 Tech labels positioned in mystical space<br />
          🔧 Fallback mode - 3D loading...
        </div>
      </div>
      
      {/* Tech Labels */}
      {technologies.map((tech) => {
        const config = techConfig[tech as keyof typeof techConfig];
        if (!config) return null;
        
        return (
          <TechLabel
            key={tech}
            tech={tech}
            config={config}
          />
        );
      })}
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}