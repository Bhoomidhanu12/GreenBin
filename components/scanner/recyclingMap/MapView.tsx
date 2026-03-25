
import { RecyclingCenter } from "@/hooks/useRecyclingCenters";
import { Button } from "@/components/ui/button";
import { Map, Navigation, RefreshCw, Globe, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface MapViewProps {
  selectedCenter: RecyclingCenter | null;
  onGetDirections: (center: RecyclingCenter) => void;
}

const MapView = ({ selectedCenter, onGetDirections }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const animationRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Initialize the 3D globe
  useEffect(() => {
    // Simulate loading the 3D globe
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start automatic rotation when loaded
      startGlobeRotation();
    }, 1500);

    return () => {
      clearTimeout(timer);
      stopGlobeRotation();
    };
  }, []);

  // Start globe rotation animation
  const startGlobeRotation = () => {
    stopGlobeRotation();
    
    animationRef.current = window.requestAnimationFrame(function animate() {
      if (!isDraggingRef.current) {
        setRotation(prev => (prev + 0.1) % 360);
      }
      animationRef.current = window.requestAnimationFrame(animate);
    });
  };

  // Stop globe rotation animation
  const stopGlobeRotation = () => {
    if (animationRef.current !== null) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  // Handle mouse events for dragging the globe
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = e.clientX - lastMousePosRef.current.x;
    setRotation(prev => (prev + deltaX * 0.2) % 360);
    
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Handle zoom controls
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  // Reset globe view
  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="w-full md:w-2/3 h-64 md:h-auto relative bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <RefreshCw className="h-10 w-10 text-greenbin-primary animate-spin-slow" />
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Loading 3D Globe...</p>
        </div>
      ) : (
        <>
          {/* 3D Globe */}
          <div 
            ref={mapRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              background: `url('/earth-texture.jpg')`, 
              backgroundSize: 'cover',
              backgroundPosition: `${rotation}% 50%`,
              transform: `scale(${zoom})`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {/* We would use a real 3D library like Three.js here */}
            <div className="flex items-center justify-center h-full opacity-0">
              <Globe className="h-16 w-16" />
            </div>
          </div>

          {/* Globe Controls */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white/100 dark:bg-gray-800/80 dark:hover:bg-gray-800/100"
              onClick={zoomIn}
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom In</span>
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white/100 dark:bg-gray-800/80 dark:hover:bg-gray-800/100"
              onClick={zoomOut}
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom Out</span>
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white/100 dark:bg-gray-800/80 dark:hover:bg-gray-800/100"
              onClick={resetView}
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Reset View</span>
            </Button>
          </div>
        </>
      )}
      
      {/* Selected Recycling Center Information */}
      {selectedCenter && (
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg">
          <div className="font-medium text-lg">{selectedCenter.name}</div>
          <div className="text-gray-500 dark:text-gray-400">{selectedCenter.address}</div>
          {selectedCenter.distance && (
            <div className="text-sm text-greenbin-primary mb-2">
              {selectedCenter.distance} km away
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCenter.types.map(type => (
              <span 
                key={type} 
                className="text-xs bg-gray-100 dark:bg-gray-600 rounded px-2 py-1"
              >
                {type}
              </span>
            ))}
          </div>
          <Button 
            onClick={() => onGetDirections(selectedCenter)} 
            className="w-full bg-greenbin-primary hover:bg-greenbin-secondary text-white"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapView;
