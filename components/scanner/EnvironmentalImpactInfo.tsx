
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart2, Clock, Droplets, Flame } from 'lucide-react';

interface WasteType {
  name: string;
  inOceans: string;
  decomposeTime: string;
  co2Emissions: string;
}

const wasteData: Record<string, WasteType> = {
  "Plastic Bottle (PET)": {
    name: "Plastic Bottle (PET)",
    inOceans: "8 million tons of plastic bottles enter oceans annually",
    decomposeTime: "450+ years to decompose",
    co2Emissions: "82g CO₂ per bottle if incinerated"
  },
  "Plastic Bag (LDPE)": {
    name: "Plastic Bag (LDPE)",
    inOceans: "Contributes to 100,000 marine animal deaths annually",
    decomposeTime: "20+ years to decompose",
    co2Emissions: "6g CO₂ per bag if incinerated"
  },
  "Smartphone": {
    name: "Smartphone",
    inOceans: "Contains toxic materials that can leak into water systems",
    decomposeTime: "Indefinite - electronics don't biodegrade naturally",
    co2Emissions: "60kg CO₂ equivalent over lifecycle"
  },
  "Aluminum Can": {
    name: "Aluminum Can",
    inOceans: "Can trap marine life and cause injuries",
    decomposeTime: "200+ years to decompose",
    co2Emissions: "14g CO₂ if not recycled"
  },
  "Circuit Board": {
    name: "Circuit Board",
    inOceans: "Leaches heavy metals and toxins into water",
    decomposeTime: "Indefinite - electronics don't biodegrade naturally",
    co2Emissions: "2kg CO₂ equivalent if improperly disposed"
  }
};

interface EnvironmentalImpactInfoProps {
  itemName?: string;
}

const EnvironmentalImpactInfo = ({ itemName }: EnvironmentalImpactInfoProps) => {
  const wasteInfo = itemName && wasteData[itemName] ? wasteData[itemName] : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-8">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Environmental Impact Reference
        </h2>
      </div>

      <div className="p-6">
        {wasteInfo ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {wasteInfo.name} Environmental Impact
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                  <h4 className="font-medium">Ocean Impact</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{wasteInfo.inOceans}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-amber-500" />
                  <h4 className="font-medium">Decomposition</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{wasteInfo.decomposeTime}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Flame className="h-5 w-5 mr-2 text-red-500" />
                  <h4 className="font-medium">CO₂ Emissions</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{wasteInfo.co2Emissions}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn about the environmental impact of different types of waste
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-medium">
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                    How Waste Affects Oceans
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 8 million tons of plastic waste enter oceans annually</li>
                    <li>• 100,000+ marine animals die from plastic entanglement yearly</li>
                    <li>• Microplastics are found in 94% of tap water samples globally</li>
                    <li>• E-waste leaches toxic chemicals that contaminate water systems</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-medium">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-amber-500" />
                    Decomposition Timeline
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Plastic bottles: 450+ years</li>
                    <li>• Plastic bags: 10-20 years</li>
                    <li>• Aluminum cans: 200+ years</li>
                    <li>• Smartphones & electronics: Indefinite (don't biodegrade)</li>
                    <li>• Paper products: 2-6 weeks (if not laminated)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-medium">
                  <div className="flex items-center">
                    <Flame className="h-5 w-5 mr-2 text-red-500" />
                    Carbon Footprint of Waste
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Smartphone: 60-70kg CO₂ equivalent over lifecycle</li>
                    <li>• Plastic bottle: 82g CO₂ if incinerated</li>
                    <li>• Laptop: 300kg CO₂ equivalent in manufacturing</li>
                    <li>• Aluminum can: 14g CO₂ if not recycled</li>
                    <li>• Recycling reduces carbon footprint by 30-70% for most items</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-medium">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-green-500" />
                    Recycling Impact Statistics
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Recycling 1 ton of plastic saves 5,774 kWh of energy</li>
                    <li>• Recycling 1 million cell phones recovers 35,000+ lbs of copper</li>
                    <li>• Aluminum recycling uses 95% less energy than production</li>
                    <li>• E-waste contains 40-50x more precious metals than ore mining</li>
                    <li>• Only 20% of e-waste is formally recycled worldwide</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalImpactInfo;
