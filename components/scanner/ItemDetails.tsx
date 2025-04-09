import { Button } from "@/components/ui/button";
import { AlertTriangle, BarChart2, Check, Clock, Info, Map, Recycle, Video } from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner";
import RecyclingCentersMap from './recyclingMap/RecyclingCentersMap';

interface DetectedItem {
  id: number;
  name: string;
  recyclable: boolean;
  confidenceScore: number;
  impact: string;
  carbonFootprint: string;
  materialComposition?: string;
  disposalSteps?: string[];
  decompositionTime?: string;
  videoUrl?: string;
}

interface ItemDetailsProps {
  item: DetectedItem;
}

const ItemDetails = ({ item }: ItemDetailsProps) => {
  const [showRecyclingMap, setShowRecyclingMap] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  const openRecyclingMap = () => {
    setShowRecyclingMap(true);
  };
  
  const playDemoVideo = () => {
    setShowVideo(true);
    toast.info("Loading demonstration video", {
      description: "This would show a real video in a production environment"
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {item.name} Details
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Info className="h-5 w-5 mr-2 text-greenbin-info" />
                Recycling Information
              </h3>
              <div className="mt-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start mb-3">
                  <Check className={`h-5 w-5 mr-2 ${item.recyclable ? 'text-green-500' : 'text-red-500'}`} />
                  <div>
                    <span className="font-medium">{item.recyclable ? 'Recyclable' : 'Not Recyclable'}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.recyclable 
                        ? 'This item can be recycled at most recycling centers.' 
                        : 'This item requires special disposal procedures.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <BarChart2 className="h-5 w-5 mr-2 text-greenbin-secondary" />
                  <div>
                    <span className="font-medium">Environmental Impact: {item.impact}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.impact === 'High' || item.impact === 'Very High'
                        ? 'Improper disposal can cause significant environmental damage.'
                        : 'Proper recycling helps reduce environmental impact.'}
                    </p>
                  </div>
                </div>
                
                {item.decompositionTime && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-amber-500" />
                    <div>
                      <span className="font-medium">Decomposition Time</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.decompositionTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Info className="h-5 w-5 mr-2 text-greenbin-warning" />
                Carbon Footprint
              </h3>
              <div className="mt-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-greenbin-warning">
                    {item.carbonFootprint}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Estimated CO₂ equivalent emissions if not properly recycled
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Comparison</h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                      <div className="font-medium text-red-700 dark:text-red-400">If Dumped</div>
                      <div className="mt-1">{item.carbonFootprint}</div>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
                      <div className="font-medium text-amber-700 dark:text-amber-400">If Burned</div>
                      <div className="mt-1">{parseInt(item.carbonFootprint) * 1.2 + "g CO₂"}</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                      <div className="font-medium text-green-700 dark:text-green-400">If Recycled</div>
                      <div className="mt-1">{parseInt(item.carbonFootprint) * 0.3 + "g CO₂"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {item.videoUrl && (
  <div className="mt-6">
    <Button 
      className="w-full bg-greenbin-primary hover:bg-greenbin-secondary text-white"
      onClick={playDemoVideo}
    >
      <Video className="mr-2 h-5 w-5" />
      Watch Decomposition Video
    </Button>

    {showVideo && (
      <div className="mt-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
        <video
          controls
          className="w-full h-full rounded-lg"
          src="/vedio"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )}
  </div>
)}

          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Recycle className="h-5 w-5 mr-2 text-greenbin-primary" />
              Disposal Guidelines
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white">How to dispose of {item.name}</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                {item.disposalSteps ? (
                  item.disposalSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`mr-2 ${item.recyclable ? 'text-greenbin-primary' : 'text-red-500'}`}>
                        {index + 1}.
                      </span>
                      {step}
                    </li>
                  ))
                ) : (
                  item.recyclable ? (
                    <>
                      <li className="flex items-start">
                        <span className="text-greenbin-primary mr-2">•</span>
                        {item.name.includes('Plastic') ? 'Empty and rinse the container before recycling' : 'Remove batteries or hazardous components'}
                      </li>
                      <li className="flex items-start">
                        <span className="text-greenbin-primary mr-2">•</span>
                        Check with your local recycling center for specific guidelines
                      </li>
                      <li className="flex items-start">
                        <span className="text-greenbin-primary mr-2">•</span>
                        {item.name.includes('Plastic') ? 'Remove labels and caps if required by your recycling program' : 'Take to an e-waste collection point'}
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        This item cannot be recycled through regular programs
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Consider alternatives like biodegradable options
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Check for specialized take-back programs
                      </li>
                    </>
                  )
                )}
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Important Notes
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                {item.name.toLowerCase().includes('plastic') ? (
                  <>
                    <li>• Not all plastic types are accepted by all recycling facilities</li>
                    <li>• Clean containers increase recycling efficiency</li>
                    <li>• Consider reducing plastic usage with reusable alternatives</li>
                  </>
                ) : item.name.toLowerCase().includes('phone') || item.name.toLowerCase().includes('circuit') ? (
                  <>
                    <li>• Never dispose of e-waste in regular trash</li>
                    <li>• E-waste contains hazardous materials that can leach into soil and water</li>
                    <li>• Consider donating working electronics for reuse</li>
                  </>
                ) : (
                  <>
                    <li>• Check local regulations for specific disposal guidelines</li>
                    <li>• Some materials require special handling</li>
                    <li>• Consider the full lifecycle impact when purchasing new items</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                className="w-full bg-greenbin-primary hover:bg-greenbin-secondary text-white"
                onClick={openRecyclingMap}
              >
                <Map className="mr-2 h-5 w-5" />
                Find Recycling Centers
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-greenbin-primary text-greenbin-primary hover:bg-greenbin-light dark:hover:bg-gray-700"
                onClick={() => {
                  toast.success("Recycling information saved", {
                    description: "Details added to your personal recycling guide."
                  });
                }}
              >
                Save Information
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recycling Centers Map Modal */}
      <RecyclingCentersMap 
        isOpen={showRecyclingMap} 
        onClose={() => setShowRecyclingMap(false)} 
        itemType={item.name}
      />
    </div>
  );
};

export default ItemDetails;
