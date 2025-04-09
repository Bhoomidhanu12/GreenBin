
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, RefreshCw, Upload, Mic, FlipHorizontal, Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface CameraViewProps {
  isScanning: boolean;
  scanProgress: number;
  startScan: () => Promise<void>;
  cancelScan: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  detectedItems: any[];
  scanMode: 'camera' | 'upload';
  cameraFacing: 'environment' | 'user';
  switchCamera: () => void;
  voiceToTextEnabled?: boolean;
  onVoiceInputToggle?: () => void;
  productDescription: string;
  setProductDescription: (description: string) => void;
  isCameraLoading?: boolean;
  hasCameraError?: boolean;
}

const CameraView = ({
  isScanning,
  scanProgress,
  startScan,
  cancelScan,
  videoRef,
  canvasRef,
  detectedItems,
  scanMode,
  cameraFacing,
  switchCamera,
  voiceToTextEnabled = false,
  onVoiceInputToggle,
  productDescription,
  setProductDescription,
  isCameraLoading = false,
  hasCameraError = false
}: CameraViewProps) => {
  const handleStartVoiceInput = () => {
    if (onVoiceInputToggle) {
      onVoiceInputToggle();
    } else {
      toast.info("Voice input is not available in this browser");
    }
  };

  // Initialize camera when component mounts and scanMode is camera
  useEffect(() => {
    // We'll initialize the camera in ScannerView when the component loads
  }, []);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="relative bg-black aspect-video flex items-center justify-center">
        {/* Camera Controls */}
        {scanMode === 'camera' && (
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="secondary"
              size="sm"
              className="w-10 h-10 p-0 rounded-full bg-white/80 hover:bg-white/100 dark:bg-gray-800/80 dark:hover:bg-gray-700/100"
              onClick={switchCamera}
              disabled={isScanning || isCameraLoading}
            >
              <FlipHorizontal className="h-4 w-4" />
              <span className="sr-only">Switch Camera</span>
            </Button>
          </div>
        )}

        {/* Camera Loading State */}
        {isCameraLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-20">
            <Loader2 className="h-12 w-12 animate-spin" />
            <p className="text-lg mt-4">Camera loading...</p>
          </div>
        )}

        {/* Camera Error State */}
        {hasCameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-20">
            <Camera className="h-12 w-12 text-red-500" />
            <p className="text-lg mt-4 text-red-300">Camera access error</p>
            <p className="text-sm mt-2 max-w-xs text-center">
              Please check your camera permissions and try again
            </p>
          </div>
        )}

        {isScanning ? (
          <>
            {scanMode === 'camera' && (
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                playsInline 
                autoPlay
                muted
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
              <RefreshCw className="h-12 w-12 animate-spin-slow" />
              <p className="text-lg mt-4">
                {scanMode === 'camera' 
                  ? 'Scanning for waste items...' 
                  : 'Analyzing image...'}
              </p>
              <div className="w-2/3 mt-4">
                <Progress value={scanProgress} className="h-2" />
              </div>
            </div>
          </>
        ) : detectedItems.length > 0 ? (
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Show video feed when not scanning */}
            {scanMode === 'camera' && (
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                playsInline 
                autoPlay
                muted
              />
            )}
            
            {/* Placeholder text for camera or upload */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${scanMode === 'camera' && !hasCameraError ? 'bg-transparent' : 'bg-black'}`}>
              <div className="text-center text-white p-8">
                {scanMode === 'camera' ? (
                  <>
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-medium">{cameraFacing === 'user' ? 'Front Camera Ready' : 'Back Camera Ready'}</p>
                    <p className="mt-2 opacity-70">Position {cameraFacing === 'user' ? 'yourself' : 'waste item'} in frame and tap Scan</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-medium">Image upload</p>
                    <p className="mt-2 opacity-70">Upload an image to analyze waste items</p>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Product Description Input */}
      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Describe the product or add notes (optional)"
            className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-greenbin-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            disabled={isScanning}
          />
          <button 
            onClick={handleStartVoiceInput}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full ${voiceToTextEnabled ? 'bg-greenbin-primary text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
            disabled={isScanning}
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">Voice Input</span>
          </button>
        </div>

        {isScanning ? (
          <Button 
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={cancelScan}
          >
            Cancel Scan
          </Button>
        ) : (
          scanMode === 'camera' && (
            <Button 
              className="w-full bg-greenbin-primary hover:bg-greenbin-secondary text-white"
              onClick={startScan}
              disabled={hasCameraError || isCameraLoading}
            >
              {isCameraLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing Camera...
                </>
              ) : (
                'Scan Now'
              )}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default CameraView;
