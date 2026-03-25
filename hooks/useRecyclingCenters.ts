
import { useState } from 'react';
import { toast } from "sonner";

// Mock data for recycling centers
const mockRecyclingCenters = [
  { id: 1, name: "Green Earth Recycling", address: "123 Eco Street", lat: 40.7128, lng: -74.006, types: ["plastic", "ewaste", "paper"] },
  { id: 2, name: "E-Cycle Solutions", address: "456 Tech Avenue", lat: 40.7138, lng: -74.013, types: ["ewaste", "batteries"] },
  { id: 3, name: "Plastic Recovery Center", address: "789 Bottle Boulevard", lat: 40.7118, lng: -74.009, types: ["plastic", "glass"] },
  { id: 4, name: "Municipal Recycling Facility", address: "101 City Plaza", lat: 40.7148, lng: -74.003, types: ["plastic", "paper", "metal", "glass"] },
  { id: 5, name: "Electronic Waste Depot", address: "202 Circuit Road", lat: 40.7158, lng: -74.011, types: ["ewaste", "batteries", "appliances"] }
];

export interface RecyclingCenter {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  types: string[];
  distance?: number;
}

export const useRecyclingCenters = (itemType?: string) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);

  // Get user location
  const getUserLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Filter and sort centers based on distance
          const centersWithDistance = mockRecyclingCenters
            .filter(center => {
              // If itemType is provided, filter centers that accept that type
              if (itemType) {
                const type = itemType.toLowerCase();
                if (type.includes('plastic')) return center.types.includes('plastic');
                if (type.includes('phone') || type.includes('battery') || type.includes('electronic') || type.includes('circuit')) {
                  return center.types.includes('ewaste');
                }
              }
              return true;
            })
            .map(center => {
              // Calculate approximate distance (this is simplified)
              const distance = calculateDistance(
                userCoords.lat, userCoords.lng,
                center.lat, center.lng
              );
              return { ...center, distance };
            })
            .sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          setCenters(centersWithDistance);
          if (centersWithDistance.length > 0) {
            setSelectedCenter(centersWithDistance[0]);
          }
          
          toast.success("Found recycling centers near you");
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location");
          // Use mock data without distance
          setCenters(mockRecyclingCenters);
          setIsLoading(false);
        },
        { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setCenters(mockRecyclingCenters);
      setIsLoading(false);
    }
  };

  // Get directions to selected center
  const getDirections = (center: RecyclingCenter) => {
    if (!userLocation) return;
    
    // In a real app, this would open directions in a maps service
    // For now, we'll just simulate this with a toast
    toast.success(`Getting directions to ${center.name}`, {
      description: `${center.address} (${center.distance}km away)`
    });
    
    // Open Google Maps directions in a new tab
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  return {
    userLocation,
    isLoading,
    centers,
    selectedCenter,
    setSelectedCenter,
    getUserLocation,
    getDirections
  };
};

// Helper functions for distance calculation
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};
