
export interface HotspotInfo {
  id: number;
  name: string;
  type: 'plastic' | 'ewaste' | 'recycling';
  description: string;
  severity?: 'high' | 'medium' | 'low';
  location: { lat: number; lng: number };
}

export type FilterType = 'all' | 'plastic' | 'ewaste' | 'recycling';
