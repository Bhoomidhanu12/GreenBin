
import { HotspotInfo } from './types';

// Mock data for waste hotspots and recycling centers
export const mockHotspots: HotspotInfo[] = [
  {
    id: 1,
    name: 'Pacific Garbage Patch',
    type: 'plastic',
    description: 'A large collection of marine debris in the North Pacific Ocean.',
    severity: 'high',
    location: { lat: 28.4, lng: -145.6 },
  },
  {
    id: 2,
    name: 'Agbogbloshie E-Waste Site',
    type: 'ewaste',
    description: 'One of the largest e-waste dumping sites in the world, located in Ghana. Known for processing significant amounts of electronic waste from Europe and North America.',
    severity: 'high',
    location: { lat: 5.55, lng: -0.225 },
  },
  {
    id: 3,
    name: 'Manila Bay Pollution',
    type: 'plastic',
    description: 'Severe plastic pollution affecting marine life and coastal communities in the Philippines.',
    severity: 'medium',
    location: { lat: 14.5, lng: 120.8 },
  },
  {
    id: 4,
    name: 'San Francisco Recycling Center',
    type: 'recycling',
    description: 'Advanced recycling facility processing various waste types with high efficiency rates.',
    location: { lat: 37.77, lng: -122.42 },
  },
  {
    id: 5,
    name: 'Amsterdam Circular Hub',
    type: 'recycling',
    description: 'Innovation center focused on circular economy solutions and sustainable recycling practices.',
    location: { lat: 52.37, lng: 4.9 },
  },
  {
    id: 6,
    name: 'Yangtze River Pollution',
    type: 'plastic',
    description: 'One of the most polluted rivers contributing to ocean plastic pollution in Asia.',
    severity: 'high',
    location: { lat: 30.8, lng: 116.5 },
  },
  {
    id: 7,
    name: 'Lagos E-Waste Dump',
    type: 'ewaste',
    description: 'Significant electronic waste disposal site with growing environmental concerns.',
    severity: 'medium',
    location: { lat: 6.5, lng: 3.4 },
  },
  {
    id: 8,
    name: 'Tokyo Recycling Innovation Center',
    type: 'recycling',
    description: 'State-of-the-art facility for processing various waste streams with advanced sorting technology.',
    location: { lat: 35.69, lng: 139.7 },
  },
  {
    id: 9, 
    name: 'Guiyu E-Waste Processing Center',
    type: 'ewaste',
    description: 'Once the largest e-waste site in the world, this area in China processes tons of electronic waste with significant health implications.',
    severity: 'high',
    location: { lat: 23.3, lng: 116.3 },
  },
  {
    id: 10,
    name: 'Delhi NCR E-Waste Market',
    type: 'ewaste',
    description: 'Major informal e-waste recycling hub in India with environmental and health challenges.',
    severity: 'medium',
    location: { lat: 28.7, lng: 77.1 },
  },
  {
    id: 11,
    name: 'Stockholm Sustainable Recycling Hub',
    type: 'recycling',
    description: 'Award-winning recycling facility implementing cutting-edge circular economy principles.',
    location: { lat: 59.3, lng: 18.1 },
  },
  {
    id: 12,
    name: 'Great Atlantic Garbage Patch',
    type: 'plastic',
    description: 'Growing collection of marine debris in the North Atlantic Ocean.',
    severity: 'medium',
    location: { lat: 38, lng: -44 },
  }
];
