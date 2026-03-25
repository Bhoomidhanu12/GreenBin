
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import GlobeMap from '@/components/map/GlobeMap';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

const Map = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={`flex-grow ${!isFullscreen && 'container py-8'}`}>
        {!isFullscreen && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-greenbin-dark dark:text-white">Global Waste Map</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Explore waste pollution hotspots and recycling centers around the world.
            </p>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="border-greenbin-primary text-greenbin-primary hover:bg-greenbin-light dark:hover:bg-gray-700"
                onClick={toggleFullscreen}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Enter Full Screen Mode
              </Button>
            </div>
          </div>
        )}
        
        <div className={`relative rounded-lg overflow-hidden shadow-lg ${
          isFullscreen 
            ? 'fixed inset-0 z-50 rounded-none' 
            : 'h-[600px]'
        }`}>
          <GlobeMap />
          
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50">
              <Button 
                variant="outline" 
                className="bg-white/80 hover:bg-white border-gray-300 text-gray-900"
                onClick={toggleFullscreen}
              >
                Exit Full Screen
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {!isFullscreen && <Footer />}
    </div>
  );
};

export default Map;
