
import { useState, useRef } from 'react';
import { toast } from "sonner";
import { DetectedItem } from './types';
import { enhancedMockData, mockSearchDatabase } from './mockData';

export function useItemDetection(speakDetectionResults: (items: DetectedItem[]) => void, isVoiceEnabled: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DetectedItem | null>(null);
  const [showRecyclingMap, setShowRecyclingMap] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera');
  const [productDescription, setProductDescription] = useState('');
  
  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Cancel scanning
  const cancelScan = () => {
    setIsScanning(false);
    setScanProgress(0);
  };

  // Simulate completing the scan and finding waste items
  const completeScanning = (videoRef: React.RefObject<HTMLVideoElement>) => {
    // Take snapshot from camera
    if (scanMode === 'camera' && videoRef.current && canvasRef.current && canvasRef.current.getContext('2d')) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    
    // Simulate AI detection with enhanced mock data
    const randomCount = Math.floor(Math.random() * 3) + 1; // 1-3 items
    const randomItems: DetectedItem[] = [];
    
    // Get random items without duplicates
    const usedIndexes = new Set<number>();
    while (randomItems.length < randomCount) {
      const randomIndex = Math.floor(Math.random() * enhancedMockData.length);
      if (!usedIndexes.has(randomIndex)) {
        usedIndexes.add(randomIndex);
        randomItems.push(enhancedMockData[randomIndex]);
      }
    }
    
    setDetectedItems(randomItems);
    if (randomItems.length > 0) {
      setSelectedItem(randomItems[0]);
      if (isVoiceEnabled) {
        speakDetectionResults(randomItems);
      }
    }
    
    // Update state
    setIsScanning(false);
    setScanProgress(0);
    
    // Show toast notification
    if (randomItems.length > 0) {
      toast.success(`Detected ${randomItems.length} item(s)`, {
        description: "Select an item to see detailed recycling information."
      });
      
      if (productDescription) {
        toast.info("Product note recorded", {
          description: productDescription
        });
      }
    } else {
      toast.info("No waste items detected", {
        description: "Try repositioning the camera or scanning a different object."
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Create an object URL for the image
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;
    
    image.onload = () => {
      // Draw the image on a canvas
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0);
      }
      
      // Start the scanning process
      startScan();
    };
  };

  // Handle search
  const handleSearch = (term: string, category: string) => {
    if (!term.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Filter mock database based on search term and category
    const results = mockSearchDatabase.filter(item => {
      const matchesTerm = item.name.toLowerCase().includes(term.toLowerCase());
      const matchesCategory = category === 'all' || 
        (category === 'plastic' && item.name.toLowerCase().includes('plastic')) ||
        (category === 'ewaste' && (
          item.name.toLowerCase().includes('phone') || 
          item.name.toLowerCase().includes('circuit') ||
          item.name.toLowerCase().includes('battery')
        ));
      
      return matchesTerm && matchesCategory;
    });

    if (results.length > 0) {
      setDetectedItems(results);
      setSelectedItem(results[0]);
      toast.success(`Found ${results.length} matching items`);
    } else {
      toast.info("No items found matching your search", {
        description: "Try a different term or category"
      });
    }
  };

  // Start the scanning process
  const startScan = () => {
    setIsScanning(true);
    
    // Simulate scanning progress
    let progress = 0;
    const intervalId = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      
      if (progress >= 100) {
        clearInterval(intervalId);
        completeScanning(null);
      }
    }, 100);
  };

  // Open recycling centers map
  const openRecyclingMap = () => {
    setShowRecyclingMap(true);
  };

  return {
    canvasRef,
    fileInputRef,
    isScanning,
    scanProgress,
    detectedItems,
    selectedItem,
    showRecyclingMap,
    scanMode,
    productDescription,
    setProductDescription,
    startScan,
    cancelScan,
    handleFileUpload,
    triggerFileUpload,
    handleSearch,
    openRecyclingMap,
    setSelectedItem,
    setScanMode,
    setShowRecyclingMap,
    completeScanning
  };
}
