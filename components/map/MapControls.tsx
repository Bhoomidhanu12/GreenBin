
import React from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Trash, AlertTriangle, MapPin } from 'lucide-react';

interface MapControlsProps {
  filter: 'all' | 'plastic' | 'ewaste' | 'recycling';
  setFilter: (filter: 'all' | 'plastic' | 'ewaste' | 'recycling') => void;
  onResetView: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ filter, setFilter, onResetView }) => {
  return (
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
          onClick={onResetView}
        >
          <Camera className="h-3 w-3 mr-1" />
          Reset View
        </Button>
      </div>
    </div>
  );
};

export default MapControls;
