
import { useRef } from 'react';
import { useCamera } from './scanner/useCamera';
import { useVoiceFeatures } from './scanner/useVoiceFeatures';
import { useAIModel } from './scanner/useAIModel';
import { useItemDetection } from './scanner/useItemDetection';
import { DetectedItem } from './scanner/types';

export { type DetectedItem } from './scanner/types';

export function useScannerLogic() {
  // Initialize all the necessary hooks
  const {
    videoRef,
    cameraFacing,
    isCameraLoading,
    hasCameraError,
    cameraPermissionGranted,
    stopCameraStream,
    switchCamera: switchCameraDirection,
    startCamera
  } = useCamera();
  
  const {
    isVoiceEnabled,
    voiceToTextEnabled,
    productDescription,
    setProductDescription,
    toggleVoiceToText,
    speakDetectionResults,
    toggleVoice
  } = useVoiceFeatures();
  
  const { isAIModelLoaded, isModelLoading } = useAIModel();
  
  const {
    canvasRef,
    fileInputRef,
    isScanning,
    scanProgress,
    detectedItems,
    selectedItem,
    showRecyclingMap,
    scanMode,
    startScan: initiateScan,
    cancelScan,
    handleFileUpload,
    triggerFileUpload,
    handleSearch,
    openRecyclingMap,
    setSelectedItem,
    setScanMode,
    setShowRecyclingMap,
    completeScanning
  } = useItemDetection(speakDetectionResults, isVoiceEnabled);

  // Start scan wrapper that handles camera setup
  const startScan = async () => {
    if (scanMode === 'camera') {
      const cameraStarted = await startCamera();
      if (!cameraStarted) return;
    }

    initiateScan();
  };
  
  // Enhanced camera switching that updates the scan mode
  const switchCamera = async () => {
    await switchCameraDirection();
  };

  return {
    videoRef,
    canvasRef,
    fileInputRef,
    isScanning,
    isVoiceEnabled,
    scanProgress,
    detectedItems,
    selectedItem,
    showRecyclingMap,
    scanMode,
    isAIModelLoaded,
    isModelLoading,
    cameraFacing,
    isCameraLoading,
    hasCameraError,
    cameraPermissionGranted,
    switchCamera,
    voiceToTextEnabled,
    toggleVoiceToText,
    productDescription,
    setProductDescription,
    startScan,
    cancelScan,
    handleFileUpload,
    triggerFileUpload,
    toggleVoice,
    handleSearch,
    openRecyclingMap,
    setSelectedItem,
    setScanMode,
    setShowRecyclingMap,
    stopCameraStream,
    startCamera,
  };
}
