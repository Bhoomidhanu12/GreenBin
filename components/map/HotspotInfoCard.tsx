
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash, AlertTriangle, MapPin } from 'lucide-react';

interface HotspotInfo {
  id: number;
  name: string;
  type: 'plastic' | 'ewaste' | 'recycling';
  description: string;
  severity?: 'high' | 'medium' | 'low';
  location: { lat: number; lng: number };
}

interface HotspotInfoCardProps {
  hotspot: HotspotInfo;
  onClose: () => void;
}

const HotspotInfoCard: React.FC<HotspotInfoCardProps> = ({ hotspot, onClose }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-10">
      <Card className="p-4 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {hotspot.type === 'plastic' && (
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900 text-red-500 rounded-full flex items-center justify-center mr-3">
                <Trash className="h-4 w-4" />
              </div>
            )}
            {hotspot.type === 'ewaste' && (
              <div className="h-8 w-8 bg-amber-100 dark:bg-amber-900 text-amber-500 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="h-4 w-4" />
              </div>
            )}
            {hotspot.type === 'recycling' && (
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{hotspot.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {hotspot.type === 'plastic' 
                  ? 'Plastic Pollution Hotspot' 
                  : hotspot.type === 'ewaste' 
                    ? 'E-Waste Disposal Site' 
                    : 'Recycling Facility'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {hotspot.description}
        </p>
        
        {(hotspot.type === 'plastic' || hotspot.type === 'ewaste') && hotspot.severity && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pollution Severity</p>
            <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  hotspot.severity === 'high' 
                    ? 'bg-red-500 w-4/5' 
                    : hotspot.severity === 'medium' 
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
              window.alert(`Learn more about ${hotspot.name}`);
            }}
          >
            Learn More
          </Button>
          {hotspot.type === 'recycling' && (
            <Button 
              variant="outline" 
              className="w-full text-xs border-greenbin-primary text-greenbin-primary"
              onClick={() => {
                // In a real implementation, this would navigate to directions
                window.alert(`Get directions to ${hotspot.name}`);
              }}
            >
              Get Directions
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HotspotInfoCard;
