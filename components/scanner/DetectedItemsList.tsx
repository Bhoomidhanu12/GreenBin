
interface DetectedItem {
  id: number;
  name: string;
  recyclable: boolean;
  confidenceScore: number;
  impact: string;
  carbonFootprint: string;
}

interface DetectedItemsListProps {
  items: DetectedItem[];
  selectedItem: DetectedItem | null;
  onSelectItem: (item: DetectedItem) => void;
}

const DetectedItemsList = ({ 
  items, 
  selectedItem, 
  onSelectItem 
}: DetectedItemsListProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detected Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
              selectedItem?.id === item.id 
                ? 'border-greenbin-primary bg-greenbin-light dark:bg-gray-700' 
                : 'border-gray-200 dark:border-gray-700 hover:border-greenbin-primary/50'
            }`}
            onClick={() => onSelectItem(item)}
          >
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.recyclable 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {item.recyclable ? 'Recyclable' : 'Non-Recyclable'}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Confidence: {Math.round(item.confidenceScore * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetectedItemsList;
