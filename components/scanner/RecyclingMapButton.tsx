
import { Button } from "@/components/ui/button";
import { Map } from 'lucide-react';

interface RecyclingMapButtonProps {
  openRecyclingMap: () => void;
}

const RecyclingMapButton = ({ openRecyclingMap }: RecyclingMapButtonProps) => {
  return (
    <div className="mb-6">
      <button
        onClick={openRecyclingMap}
        className="w-full bg-white dark:bg-gray-800 border border-greenbin-primary text-greenbin-primary hover:bg-greenbin-light dark:hover:bg-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center"
      >
        <Map className="mr-2 h-5 w-5" />
        Find Nearby Recycling Centers
      </button>
    </div>
  );
};

export default RecyclingMapButton;
