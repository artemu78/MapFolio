import { useState, useEffect } from 'react';

interface TechMapProps {
  technologies: string[];
}

interface TechZone {
  name: string;
  gradient: string;
  description: string;
}

// Define landscape zones with mystical gradients
const landscapeZones: TechZone[] = [
  { 
    name: 'Frontend Nebula', 
    gradient: 'radial-gradient(ellipse at 20% 30%, rgba(49, 120, 198, 0.4) 0%, rgba(202, 66, 69, 0.3) 40%, transparent 70%)',
    description: 'Frontend technologies reside in the blue-red nebula'
  },
  { 
    name: 'Cloud Dimension', 
    gradient: 'radial-gradient(ellipse at 75% 60%, rgba(255, 153, 0, 0.4) 0%, rgba(255, 202, 40, 0.3) 35%, transparent 65%)',
    description: 'Cloud services float in golden energy fields'
  },
  { 
    name: 'Backend Void', 
    gradient: 'radial-gradient(ellipse at 30% 80%, rgba(154, 127, 57, 0.4) 0%, rgba(0, 129, 203, 0.3) 45%, transparent 75%)',
    description: 'Backend tools exist in bronze-blue void'
  },
  { 
    name: 'Extension Realm', 
    gradient: 'radial-gradient(ellipse at 50% 85%, rgba(224, 224, 224, 0.3) 0%, rgba(154, 127, 57, 0.2) 50%, transparent 80%)',
    description: 'Extensions dwell in silver-bronze realm'
  }
];

const techConfig = {
  'TypeScript': { 
    color: '#3178c6', 
    position: { x: 20, y: 30 }, 
    zone: 'Frontend Nebula',
    terrain: 'Crystal Mountains'
  },
  'JavaScript': { 
    color: '#f7df1e', 
    position: { x: 25, y: 35 }, 
    zone: 'Frontend Nebula',
    terrain: 'Golden Plains'
  },
  'AWS': { 
    color: '#FF9900', 
    position: { x: 75, y: 60 }, 
    zone: 'Cloud Dimension',
    terrain: 'Energy Storms'
  },
  'React Router': { 
    color: '#CA4245', 
    position: { x: 15, y: 25 }, 
    zone: 'Frontend Nebula',
    terrain: 'Crimson Valleys'
  },
  'Zustand': { 
    color: '#9a7f39', 
    position: { x: 30, y: 80 }, 
    zone: 'Backend Void',
    terrain: 'Bronze Depths'
  },
  'Firebase': { 
    color: '#FFCA28', 
    position: { x: 70, y: 55 }, 
    zone: 'Cloud Dimension',
    terrain: 'Flame Rivers'
  },
  'Material UI': { 
    color: '#0081CB', 
    position: { x: 35, y: 85 }, 
    zone: 'Backend Void',
    terrain: 'Azure Caverns'
  },
  'Chrome Extensions': { 
    color: '#e0e0e0', 
    position: { x: 50, y: 85 }, 
    zone: 'Extension Realm',
    terrain: 'Silver Wastes'
  }
};

function TechLabel({ tech, config, zoom }: { 
  tech: string, 
  config: { 
    color: string, 
    position: { x: number, y: number },
    zone: string,
    terrain: string
  },
  zoom: number
}) {
  const [hovered, setHovered] = useState(false);
  
  const labelSize = Math.max(0.8, Math.min(1.4, zoom));
  const glowIntensity = hovered ? 25 * zoom : 12 * zoom;
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500"
      style={{ 
        left: `${config.position.x}%`, 
        top: `${config.position.y}%`,
        transform: `translate(-50%, -50%) scale(${(hovered ? 1.15 : 1) * labelSize})`,
        zIndex: hovered ? 100 : 10
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`tech-label-${tech.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative">
        <div
          className="px-4 py-2 rounded-lg font-bold text-white shadow-lg border-2 border-opacity-70 backdrop-blur-sm"
          style={{
            backgroundColor: `${config.color}${hovered ? 'CC' : '99'}`,
            borderColor: config.color,
            boxShadow: `
              0 0 ${glowIntensity}px ${config.color}60,
              0 0 ${glowIntensity * 2}px ${config.color}30,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
            fontFamily: 'Orbitron, monospace',
            fontSize: `${0.8 + (zoom - 1) * 0.1}rem`
          }}
        >
          {tech}
        </div>
        
        {/* Terrain tooltip on hover */}
        {hovered && (
          <div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-md text-xs whitespace-nowrap pointer-events-none"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: `1px solid ${config.color}`,
              color: config.color,
              fontFamily: 'Orbitron, monospace',
              boxShadow: `0 0 10px ${config.color}40`
            }}
          >
            <div className="font-semibold">{config.terrain}</div>
            <div className="opacity-80 text-xs">{config.zone}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FallbackTechMap({ technologies }: TechMapProps) {
  const [zoom, setZoom] = useState(0.8); // Start zoomed out to show more of the map
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Handle mouse wheel for zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(0.2, Math.min(4, prev * zoomDelta))); // Allow zoom from 20% to 400%
    };

    const container = document.getElementById('tech-map-container');
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle mouse drag for pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // Allow panning from any point on the map, except tech labels
    const target = e.target as HTMLElement;
    if (!target.closest('[data-testid^="tech-label"]')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Also handle global mouse events for better dragging experience
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPanOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  // Touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPanOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Reset to default view
  const resetView = () => {
    setZoom(0.8);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      id="tech-map-container"
      className={`w-screen h-screen relative overflow-hidden select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ background: '#050217' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-testid="tech-map-container"
    >
      {/* Mystical Landscape Gradients */}
      <div className="absolute inset-0" style={{
        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
        transformOrigin: 'center center'
      }}>
        {/* Base space nebula */}
        <div 
          className="absolute inset-0" 
          style={{
            background: `
              radial-gradient(ellipse at 10% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 80%, rgba(25, 25, 112, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 50%, rgba(72, 61, 139, 0.1) 0%, transparent 70%)
            `
          }} 
        />
        
        {/* Zone-specific gradients */}
        {landscapeZones.map((zone, index) => (
          <div
            key={zone.name}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: zone.gradient,
              opacity: selectedZone === zone.name ? 0.8 : 0.6
            }}
            onMouseEnter={() => setSelectedZone(zone.name)}
            onMouseLeave={() => setSelectedZone(null)}
          />
        ))}
        
        {/* Floating energy particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: ['#3178c6', '#f7df1e', '#FF9900', '#CA4245'][Math.floor(Math.random() * 4)] + '40',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
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
              zoom={zoom}
            />
          );
        })}
      </div>
      
      {/* Enhanced Control Panel */}
      <div 
        className="fixed top-5 left-5 z-50 bg-black/30 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 text-white text-sm"
        style={{ fontFamily: 'Orbitron, monospace' }}
        data-testid="control-panel"
      >
        <div className="font-semibold mb-2 text-cyan-400">Mystical Tech Dimension</div>
        <div className="text-xs opacity-80 space-y-1">
          <div>Mode: Landscape Explorer</div>
          <div>Zoom: {(zoom * 100).toFixed(0)}% (20%-400%)</div>
          <div>Pan: ({panOffset.x.toFixed(0)}, {panOffset.y.toFixed(0)})</div>
          <div><span data-testid="tech-count">{technologies.length}</span> Technologies Mapped</div>
          <div className="h-4">
            {selectedZone && <div className="text-yellow-400">Zone: {selectedZone}</div>}
          </div>
          <div className="h-4">
            {isDragging ? (
              <div className="text-green-400">⭐ Panning Active</div>
            ) : (
              <div className="text-gray-500">Click & drag to pan</div>
            )}
          </div>
        </div>
        <button
          onClick={resetView}
          className="mt-3 px-3 py-1 bg-cyan-600/20 border border-cyan-500/50 rounded-md text-xs text-cyan-300 hover:bg-cyan-600/30 transition-colors"
          data-testid="reset-view-button"
        >
          Reset View
        </button>
      </div>
      
      {/* Zone Legend */}
      <div 
        className="fixed top-5 right-5 z-50 bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 text-white text-xs max-w-xs"
        style={{ fontFamily: 'Orbitron, monospace' }}
        data-testid="zone-legend"
      >
        <div className="font-semibold mb-2 text-purple-400">Dimensional Zones</div>
        {landscapeZones.map((zone) => (
          <div 
            key={zone.name}
            className={`mb-2 p-2 rounded border transition-all ${
              selectedZone === zone.name ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-600/50'
            }`}
          >
            <div className="font-semibold text-xs">{zone.name}</div>
            <div className="text-xs opacity-70">{zone.description}</div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Instructions */}
      <div 
        className="fixed bottom-5 left-5 z-50 bg-black/30 backdrop-blur-md border border-green-500/30 rounded-xl p-4 text-white text-xs max-w-xs"
        style={{ fontFamily: 'Orbitron, monospace' }}
        data-testid="instructions"
      >
        <div className="font-semibold mb-2 text-green-400">Navigation</div>
        <div className="space-y-1">
          <div>🖱️ <strong>Drag:</strong> Pan across dimensions</div>
          <div>🔄 <strong>Scroll:</strong> Zoom in/out (50%-300%)</div>
          <div>🎯 <strong>Hover:</strong> Reveal terrain info</div>
          <div>🌌 <strong>Zones:</strong> Different gradient realms</div>
        </div>
      </div>
      
      {/* Animated Stars Background (stationary) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-20 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}