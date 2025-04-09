
// Enhanced mock data with additional details
export const enhancedMockData = [
  {
    id: 1,
    name: 'Plastic Bottle (PET)',
    recyclable: true,
    confidenceScore: 0.93,
    impact: 'High',
    carbonFootprint: '82g CO₂',
    materialComposition: '100% Polyethylene Terephthalate (PET)',
    disposalSteps: [
      'Empty and rinse the bottle',
      'Remove the cap and label if required by your local recycling program',
      'Place in designated recycling bin'
    ],
    decompositionTime: '450+ years',
    videoUrl: 'https://example.com/plastic-decomposition'
  },
  {
    id: 2,
    name: 'Smartphone',
    recyclable: true,
    confidenceScore: 0.89,
    impact: 'Very High',
    carbonFootprint: '60kg CO₂',
    materialComposition: 'Mixed (Lithium-Ion Battery, Aluminum, Glass, Plastic, Rare Earth Metals)',
    disposalSteps: [
      'Back up and reset the device to factory settings',
      'Remove SIM card and external storage',
      'Take to an authorized e-waste recycling center'
    ],
    decompositionTime: 'Indefinite (never fully decomposes)',
    videoUrl: 'https://example.com/ewaste-impact'
  },
  {
    id: 3,
    name: 'Plastic Bag (LDPE)',
    recyclable: false,
    confidenceScore: 0.96,
    impact: 'Medium',
    carbonFootprint: '6g CO₂',
    materialComposition: 'Low-Density Polyethylene (LDPE)',
    disposalSteps: [
      'Check if your local recycling program accepts plastic bags',
      'If not, reuse if possible or place in general waste'
    ],
    decompositionTime: '20+ years',
    videoUrl: 'https://example.com/plastic-bag-environment'
  },
  {
    id: 4,
    name: 'Aluminum Can',
    recyclable: true,
    confidenceScore: 0.98,
    impact: 'Medium',
    carbonFootprint: '14g CO₂',
    materialComposition: '100% Aluminum',
    disposalSteps: [
      'Rinse the can to remove residue',
      'Crush (optional, to save space)',
      'Place in metal recycling bin'
    ],
    decompositionTime: '200+ years',
    videoUrl: 'https://example.com/aluminum-recycling'
  },
  {
    id: 5,
    name: 'Circuit Board',
    recyclable: true,
    confidenceScore: 0.91,
    impact: 'High',
    carbonFootprint: '2kg CO₂',
    materialComposition: 'Mixed (Fiberglass, Copper, Tin, Lead, Nickel, Gold)',
    disposalSteps: [
      'Never dispose of in general waste',
      'Take to specialized e-waste recycling center',
      'Consider mail-in recycling programs if no local options'
    ],
    decompositionTime: 'Indefinite (never fully decomposes)',
    videoUrl: 'https://example.com/circuit-board-recycling'
  },
];

// Mock data for search results
export const mockSearchDatabase = [
  ...enhancedMockData,
  { id: 6, name: 'Glass Bottle', recyclable: true, confidenceScore: 1, impact: 'Medium', carbonFootprint: '20g CO₂' },
  { id: 7, name: 'Paper Cup', recyclable: false, confidenceScore: 1, impact: 'Low', carbonFootprint: '4g CO₂' },
  { id: 8, name: 'Battery (AA)', recyclable: true, confidenceScore: 1, impact: 'Very High', carbonFootprint: '120g CO₂' },
  { id: 9, name: 'Light Bulb (LED)', recyclable: true, confidenceScore: 1, impact: 'Medium', carbonFootprint: '40g CO₂' },
  { id: 10, name: 'Cardboard Box', recyclable: true, confidenceScore: 1, impact: 'Low', carbonFootprint: '12g CO₂' },
];
