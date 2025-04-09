
export interface DetectedItem {
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
