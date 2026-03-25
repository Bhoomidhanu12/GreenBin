
import { useEffect } from 'react';
import { DetectedItem, useScannerLogic } from '@/hooks/useScannerLogic';
import CameraView from './CameraView';
import DetectedItemsList from './DetectedItemsList';
import ItemDetails from './ItemDetails';
import SearchFeature from './SearchFeature';
import EnvironmentalImpactInfo from './EnvironmentalImpactInfo';
import RecyclingCentersMap from './recyclingMap/RecyclingCentersMap';
import WasteTrends from './wasteTrends/WasteTrends';
import ProductIdentifier from './ProductIdentifier';
import ScanMethodSelector from './ScanMethodSelector';
import AIModelStatus from './AIModelStatus';
import ScannerHeader from './ScannerHeader';
import RecyclingMapButton from './RecyclingMapButton';

const ScannerView = () => {
  const {
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
    startCamera
  } = useScannerLogic();

  // Initialize camera when the component mounts or scan mode changes
  useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    }
  }, [scanMode, startCamera]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <ScannerHeader isVoiceEnabled={isVoiceEnabled} toggleVoice={toggleVoice} />
      
      {/* Scan Method Selection */}
      <ScanMethodSelector 
        scanMode={scanMode}
        setScanMode={setScanMode}
        triggerFileUpload={triggerFileUpload}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
      />
      
      {/* AI Model Status */}
      <AIModelStatus isAIModelLoaded={isAIModelLoaded} isModelLoading={isModelLoading} />
      
      {/* Camera Scanner Component */}
      <CameraView 
        isScanning={isScanning}
        scanProgress={scanProgress}
        startScan={startScan}
        cancelScan={cancelScan}
        videoRef={videoRef}
        canvasRef={canvasRef}
        detectedItems={detectedItems}
        scanMode={scanMode}
        cameraFacing={cameraFacing}
        switchCamera={switchCamera}
        voiceToTextEnabled={voiceToTextEnabled}
        onVoiceInputToggle={toggleVoiceToText}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        isCameraLoading={isCameraLoading}
        hasCameraError={hasCameraError}
      />
      
      {/* AI Detection Component */}
      {detectedItems.length > 0 && (
        <div className="mb-6">
          <ProductIdentifier items={detectedItems} />
        </div>
      )}
      
      {/* Search Feature */}
      <SearchFeature onSearch={handleSearch} />
      
      {/* Find Recycling Centers Button (Global) */}
      {!selectedItem && <RecyclingMapButton openRecyclingMap={openRecyclingMap} />}
      
      {/* Results Section */}
      {detectedItems.length > 0 && (
        <>
          <DetectedItemsList 
            items={detectedItems} 
            selectedItem={selectedItem} 
            onSelectItem={setSelectedItem} 
          />
          
          {selectedItem && (
            <>
              <ItemDetails item={selectedItem} />
              <EnvironmentalImpactInfo itemName={selectedItem.name} />
            </>
          )}
        </>
      )}
      
      {/* Real-time Waste Trends Section */}
      <WasteTrends />
      
      {/* Global Recycling Centers Map Modal */}
      <RecyclingCentersMap 
        isOpen={showRecyclingMap} 
        onClose={() => setShowRecyclingMap(false)} 
        itemType={selectedItem?.name}
      />
    </div>
  );
};

export default ScannerView;
