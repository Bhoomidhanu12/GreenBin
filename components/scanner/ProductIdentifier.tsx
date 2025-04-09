
import { AlertTriangle, CheckCircle, BadgeInfo } from 'lucide-react';

interface DetectedItem {
  id: number;
  name: string;
  recyclable: boolean;
  confidenceScore: number;
  impact: string;
  carbonFootprint: string;
  materialComposition?: string;
}

interface ProductIdentifierProps {
  items: DetectedItem[];
}

const ProductIdentifier = ({ items }: ProductIdentifierProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <BadgeInfo className="h-5 w-5 mr-2 text-greenbin-info" />
          AI Detection Results
        </h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
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
              
              <div className="mt-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between items-center mb-1">
                    <span>AI Confidence:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round(item.confidenceScore * 100)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full ${
                        item.confidenceScore > 0.9 
                          ? 'bg-green-500' 
                          : item.confidenceScore > 0.7 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${item.confidenceScore * 100}%` }}
                    ></div>
                  </div>
                  
                  {item.materialComposition && (
                    <div className="flex justify-between items-center mb-1">
                      <span>Material:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.materialComposition}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-1">
                    <span>Environmental Impact:</span>
                    <span 
                      className={`font-medium ${
                        item.impact === 'Low' 
                          ? 'text-green-600 dark:text-green-400' 
                          : item.impact === 'Medium' 
                            ? 'text-yellow-600 dark:text-yellow-400' 
                            : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {item.impact}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Carbon Footprint:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.carbonFootprint}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                {item.recyclable ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Ready for recycling</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span>Special disposal required</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductIdentifier;
