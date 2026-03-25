
import React, { useState } from 'react';
import { Search, Filter, Database, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";

// Mock waste item data
const wasteItems = [
  {
    id: 1,
    name: "Plastic Bottle (PET)",
    type: "plastic",
    recyclable: true,
    decompositionTime: "450 years",
    recyclingMethod: "Clean, remove cap, place in recycling bin",
    impact: "Can be recycled into clothing, carpeting, and new bottles"
  },
  {
    id: 2,
    name: "Smartphone",
    type: "e-waste",
    recyclable: true,
    decompositionTime: "Indefinite",
    recyclingMethod: "Take to e-waste collection center or retailer",
    impact: "Contains valuable metals that can be recovered (gold, silver, copper)"
  },
  {
    id: 3,
    name: "Single-use Coffee Cup",
    type: "composite",
    recyclable: false,
    decompositionTime: "30 years",
    recyclingMethod: "Cannot be recycled in most facilities due to plastic lining",
    impact: "Contributes to landfill waste; consider using reusable cups"
  },
  {
    id: 4,
    name: "Aluminum Can",
    type: "metal",
    recyclable: true,
    decompositionTime: "200-500 years",
    recyclingMethod: "Rinse and place in recycling bin",
    impact: "Can be recycled infinitely with no loss of quality"
  },
  {
    id: 5,
    name: "Laptop Battery",
    type: "e-waste",
    recyclable: true,
    decompositionTime: "Indefinite",
    recyclingMethod: "Take to hazardous waste facility or electronics retailer",
    impact: "Contains toxic chemicals that can leach into soil and water if improperly disposed"
  },
  {
    id: 6,
    name: "Plastic Bag",
    type: "plastic",
    recyclable: true,
    decompositionTime: "10-20 years",
    recyclingMethod: "Return to grocery store collection points (not curbside recycling)",
    impact: "Often ends up in oceans, harming marine life"
  }
];

type WasteType = 'plastic' | 'e-waste' | 'metal' | 'composite' | 'all';

const WasteDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<WasteType>('all');
  const [selectedItem, setSelectedItem] = useState<(typeof wasteItems)[0] | null>(null);
  
  const filterTypes: {type: WasteType, label: string, color: string}[] = [
    { type: 'all', label: 'All Types', color: 'bg-gray-200 text-gray-800' },
    { type: 'plastic', label: 'Plastic', color: 'bg-blue-100 text-blue-800' },
    { type: 'e-waste', label: 'E-Waste', color: 'bg-red-100 text-red-800' },
    { type: 'metal', label: 'Metal', color: 'bg-green-100 text-green-800' },
    { type: 'composite', label: 'Composite', color: 'bg-purple-100 text-purple-800' }
  ];
  
  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'all' || item.type === activeType;
    return matchesSearch && matchesType;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleTypeFilter = (type: WasteType) => {
    setActiveType(type);
  };
  
  const handleSelectItem = (item: (typeof wasteItems)[0]) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Database className="h-5 w-5 mr-2 text-greenbin-primary" />
          Waste Database
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search waste items..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
            {filterTypes.map((filter) => (
              <Toggle
                key={filter.type}
                pressed={activeType === filter.type}
                onPressedChange={() => handleTypeFilter(filter.type)}
                className={`text-xs ${activeType === filter.type ? filter.color : ''}`}
              >
                {filter.label}
              </Toggle>
            ))}
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No waste items match your search criteria.</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <Card 
                key={item.id}
                className={`transition-all cursor-pointer ${selectedItem?.id === item.id ? 'ring-2 ring-greenbin-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => handleSelectItem(item)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge className={`
                          ${item.type === 'plastic' ? 'bg-blue-100 text-blue-800' : ''}
                          ${item.type === 'e-waste' ? 'bg-red-100 text-red-800' : ''}
                          ${item.type === 'metal' ? 'bg-green-100 text-green-800' : ''}
                          ${item.type === 'composite' ? 'bg-purple-100 text-purple-800' : ''}
                        `}>
                          {item.type}
                        </Badge>
                        <Badge className={`ml-2 ${item.recyclable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.recyclable ? 'Recyclable' : 'Not Recyclable'}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                {selectedItem?.id === item.id && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Decomposition Time</h4>
                        <p className="text-sm">{item.decompositionTime}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Recycling Method</h4>
                        <p className="text-sm">{item.recyclingMethod}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Environmental Impact</h4>
                        <p className="text-sm">{item.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteDatabase;
