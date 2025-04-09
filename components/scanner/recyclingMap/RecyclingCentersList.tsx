
import { Button } from "@/components/ui/button";
import { RecyclingCenter } from "@/hooks/useRecyclingCenters";
import { Loader2, Navigation } from "lucide-react";

interface RecyclingCentersListProps {
  centers: RecyclingCenter[];
  selectedCenter: RecyclingCenter | null;
  isLoading: boolean;
  onSelectCenter: (center: RecyclingCenter) => void;
  onRefreshLocation: () => void;
}

const RecyclingCentersList = ({
  centers,
  selectedCenter,
  isLoading,
  onSelectCenter,
  onRefreshLocation
}: RecyclingCentersListProps) => {
  return (
    <div className="w-full md:w-1/3 p-4 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
      <div className="mb-4 flex">
        <Button 
          onClick={onRefreshLocation} 
          className="w-full bg-greenbin-primary hover:bg-greenbin-secondary text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Locating...
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Find My Location
            </>
          )}
        </Button>
      </div>
      
      {centers.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {isLoading ? 'Finding centers...' : 'No recycling centers found'}
        </div>
      ) : (
        <ul className="space-y-2">
          {centers.map(center => (
            <li 
              key={center.id}
              className={`rounded-lg p-3 cursor-pointer transition-colors ${
                selectedCenter?.id === center.id 
                  ? 'bg-greenbin-light dark:bg-gray-700' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelectCenter(center)}
            >
              <div className="font-medium">{center.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{center.address}</div>
              {center.distance && (
                <div className="text-xs text-greenbin-primary mt-1">
                  {center.distance} km away
                </div>
              )}
              <div className="mt-1 flex flex-wrap gap-1">
                {center.types.map(type => (
                  <span 
                    key={type} 
                    className="text-xs bg-gray-100 dark:bg-gray-600 rounded px-2 py-0.5"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecyclingCentersList;
