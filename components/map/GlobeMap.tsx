
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Camera, MapPin, RefreshCw, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface HotspotInfo {
  id: number;
  name: string;
  type: 'plastic' | 'ewaste' | 'recycling';
  description: string;
  severity?: 'high' | 'medium' | 'low';
  location: { lat: number; lng: number };
}

// Mock data for waste hotspots and recycling centers
const mockHotspots: HotspotInfo[] = [
  {
    id: 1,
    name: 'Pacific Garbage Patch',
    type: 'plastic',
    description: 'A large collection of marine debris in the North Pacific Ocean.',
    severity: 'high',
    location: { lat: 28.4, lng: -145.6 },
  },
  {
    id: 2,
    name: 'Agbogbloshie E-Waste Site',
    type: 'ewaste',
    description: 'One of the largest e-waste dumping sites in the world.',
    severity: 'high',
    location: { lat: 5.55, lng: -0.225 },
  },
  {
    id: 3,
    name: 'Manila Bay Pollution',
    type: 'plastic',
    description: 'Severe plastic pollution affecting marine life.',
    severity: 'medium',
    location: { lat: 14.5, lng: 120.8 },
  },
  {
    id: 4,
    name: 'San Francisco Recycling Center',
    type: 'recycling',
    description: 'Advanced recycling facility processing various waste types.',
    location: { lat: 37.77, lng: -122.42 },
  },
  {
    id: 5,
    name: 'Amsterdam Circular Hub',
    type: 'recycling',
    description: 'Innovation center focused on circular economy solutions.',
    location: { lat: 52.37, lng: 4.9 },
  },
  {
    id: 6,
    name: 'Yangtze River Pollution',
    type: 'plastic',
    description: 'One of the most polluted rivers contributing to ocean plastic.',
    severity: 'high',
    location: { lat: 30.8, lng: 116.5 },
  },
  {
    id: 7,
    name: 'Lagos E-Waste Dump',
    type: 'ewaste',
    description: 'Significant electronic waste disposal site.',
    severity: 'medium',
    location: { lat: 6.5, lng: 3.4 },
  },
  {
    id: 8,
    name: 'Tokyo Recycling Innovation Center',
    type: 'recycling',
    description: 'State-of-the-art facility for processing various waste streams.',
    location: { lat: 35.69, lng: 139.7 },
  },
];

const GlobeMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const globeInterval = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo | null>(null);
  const [filter, setFilter] = useState<'all' | 'plastic' | 'ewaste' | 'recycling'>('all');
  
  useEffect(() => {
    // Simulate globe loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Start globe rotation
    if (!isLoading && mapRef.current) {
      startGlobeRotation();
    }
    
    return () => {
      clearTimeout(timer);
      if (globeInterval.current) {
        clearInterval(globeInterval.current);
      }
    };
  }, [isLoading]);
  
  // Simulate starting the globe rotation
  const startGlobeRotation = () => {
    if (globeInterval.current) {
      clearInterval(globeInterval.current);
    }
    
    let rotation = 0;
    globeInterval.current = setInterval(() => {
      rotation += 0.5;
      if (rotation >= 360) rotation = 0;
      
      if (mapRef.current) {
        mapRef.current.style.backgroundPosition = `${rotation}% 50%`;
      }
    }, 100);
  };
  
  // Simulate clicking on a hotspot
  const handleHotspotClick = (hotspot: HotspotInfo) => {
    setSelectedHotspot(hotspot);
  };
  
  // Filter hotspots based on selected type
  const filteredHotspots = filter === 'all' 
    ? mockHotspots 
    : mockHotspots.filter(hotspot => hotspot.type === filter);
  
  return (
    <div className="h-full relative">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
          <RefreshCw className="h-12 w-12 text-greenbin-primary animate-spin-slow" />
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Loading Global Waste Map...</p>
        </div>
      ) : (
        <>
          {/* Globe Background - In a real implementation this would be a 3D globe */}
          <div 
            ref={mapRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80)',
              transition: 'background-position 0.1s linear'
            }}
          >
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3">
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  className={`text-xs ${filter === 'all' ? 'bg-greenbin-primary text-white' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button 
                  size="sm" 
                  variant={filter === 'plastic' ? 'default' : 'outline'} 
                  className={`text-xs ${filter === 'plastic' ? 'bg-red-500 text-white' : 'text-red-500 border-red-500'}`}
                  onClick={() => setFilter('plastic')}
                >
                  <Trash className="h-3 w-3 mr-1" />
                  Plastic
                </Button>
                <Button 
                  size="sm" 
                  variant={filter === 'ewaste' ? 'default' : 'outline'} 
                  className={`text-xs ${filter === 'ewaste' ? 'bg-amber-500 text-white' : 'text-amber-500 border-amber-500'}`}
                  onClick={() => setFilter('ewaste')}
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  E-Waste
                </Button>
                <Button 
                  size="sm" 
                  variant={filter === 'recycling' ? 'default' : 'outline'} 
                  className={`text-xs ${filter === 'recycling' ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'}`}
                  onClick={() => setFilter('recycling')}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  Recycling
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3">
              <Button
                size="sm"
                variant="ghost"
                className="text-xs flex items-center"
                onClick={() => {
                  // In a real implementation, this would reset the camera position
                  if (globeInterval.current) {
                    clearInterval(globeInterval.current);
                  }
                  startGlobeRotation();
                }}
              >
                <Camera className="h-3 w-3 mr-1" />
                Reset View
              </Button>
            </div>
          </div>
          
          {/* Hotspot Markers - In a real implementation these would be positioned on the 3D globe */}
          <div className="absolute inset-0 pointer-events-none">
            {filteredHotspots.map((hotspot) => {
              // Convert lat/lng to approximate position within the container
              // This is a simplified approach - a real globe would use proper 3D positioning
              const percentX = ((hotspot.location.lng + 180) / 360) * 100;
              const percentY = ((90 - hotspot.location.lat) / 180) * 100;
              
              return (
                <div
                  key={hotspot.id}
                  className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
                  style={{ left: `${percentX}%`, top: `${percentY}%` }}
                  onClick={() => handleHotspotClick(hotspot)}
                >
                  <div 
                    className={`relative rounded-full animate-pulse ${
                      hotspot.type === 'plastic' 
                        ? 'bg-red-500' 
                        : hotspot.type === 'ewaste' 
                          ? 'bg-amber-500' 
                          : 'bg-green-500'
                    }`}
                    style={{ 
                      width: hotspot.severity === 'high' ? '24px' : hotspot.severity === 'medium' ? '20px' : '16px',
                      height: hotspot.severity === 'high' ? '24px' : hotspot.severity === 'medium' ? '20px' : '16px',
                      opacity: 0.8,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ 
                        backgroundColor: hotspot.type === 'plastic' 
                          ? 'rgba(239, 68, 68, 0.5)' 
                          : hotspot.type === 'ewaste' 
                            ? 'rgba(245, 158, 11, 0.5)' 
                            : 'rgba(34, 197, 94, 0.5)',
                        animationDuration: '1.5s',
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Selected Hotspot Information */}
          {selectedHotspot && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-10">
              <Card className="p-4 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {selectedHotspot.type === 'plastic' && (
                      <div className="h-8 w-8 bg-red-100 dark:bg-red-900 text-red-500 rounded-full flex items-center justify-center mr-3">
                        <Trash className="h-4 w-4" />
                      </div>
                    )}
                    {selectedHotspot.type === 'ewaste' && (
                      <div className="h-8 w-8 bg-amber-100 dark:bg-amber-900 text-amber-500 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    )}
                    {selectedHotspot.type === 'recycling' && (
                      <div className="h-8 w-8 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mr-3">
                        <MapPin className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{selectedHotspot.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedHotspot.type === 'plastic' 
                          ? 'Plastic Pollution Hotspot' 
                          : selectedHotspot.type === 'ewaste' 
                            ? 'E-Waste Disposal Site' 
                            : 'Recycling Facility'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => setSelectedHotspot(null)}
                  >
                    ✕
                  </Button>
                </div>
                
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  {selectedHotspot.description}
                </p>
                
                {(selectedHotspot.type === 'plastic' || selectedHotspot.type === 'ewaste') && selectedHotspot.severity && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pollution Severity</p>
                    <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          selectedHotspot.severity === 'high' 
                            ? 'bg-red-500 w-4/5' 
                            : selectedHotspot.severity === 'medium' 
                              ? 'bg-amber-500 w-3/5' 
                              : 'bg-yellow-500 w-2/5'
                        }`}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex space-x-2">
                  <Button 
                    className="w-full text-xs bg-greenbin-primary hover:bg-greenbin-secondary"
                    onClick={() => {
                      // In a real implementation, this would navigate to more details
                      window.alert(`Learn more about ${selectedHotspot.name}`);
                    }}
                  >
                    Learn More
                  </Button>
                  {selectedHotspot.type === 'recycling' && (
                    <Button 
                      variant="outline" 
                      className="w-full text-xs border-greenbin-primary text-greenbin-primary"
                      onClick={() => {
                        // In a real implementation, this would navigate to directions
                        window.alert(`Get directions to ${selectedHotspot.name}`);
                      }}
                    >
                      Get Directions
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GlobeMap;
