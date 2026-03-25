
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, X } from 'lucide-react';
import { useRecyclingCenters } from '@/hooks/useRecyclingCenters';
import RecyclingCentersList from './RecyclingCentersList';
import MapView from './MapView';

interface RecyclingCentersMapProps {
  isOpen: boolean;
  onClose: () => void;
  itemType?: string;
}

const RecyclingCentersMap = ({ isOpen, onClose, itemType }: RecyclingCentersMapProps) => {
  const {
    userLocation,
    isLoading,
    centers,
    selectedCenter,
    setSelectedCenter,
    getUserLocation,
    getDirections
  } = useRecyclingCenters(itemType);
  
  // Load centers when component mounts or itemType changes
  useEffect(() => {
    if (isOpen) {
      getUserLocation();
    }
  }, [isOpen, itemType]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-greenbin-primary" />
            Nearby Recycling Centers
            {itemType && <span className="ml-2 text-sm font-normal text-gray-500">for {itemType}</span>}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Centers list */}
          <RecyclingCentersList 
            centers={centers}
            selectedCenter={selectedCenter}
            isLoading={isLoading}
            onSelectCenter={setSelectedCenter}
            onRefreshLocation={getUserLocation}
          />
          
          {/* Map view */}
          <MapView 
            selectedCenter={selectedCenter}
            onGetDirections={getDirections}
          />
        </div>
      </div>
    </div>
  );
};

export default RecyclingCentersMap;
