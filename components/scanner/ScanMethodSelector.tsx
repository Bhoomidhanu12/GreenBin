
import { Button } from "@/components/ui/button";
import { Camera, Upload } from 'lucide-react';

interface ScanMethodSelectorProps {
  scanMode: 'camera' | 'upload';
  setScanMode: (mode: 'camera' | 'upload') => void;
  triggerFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScanMethodSelector = ({
  scanMode,
  setScanMode,
  triggerFileUpload,
  fileInputRef,
  handleFileUpload
}: ScanMethodSelectorProps) => {
  return (
    <div className="mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Choose Scan Method
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setScanMode('camera')}
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              className={scanMode === 'camera' ? 'bg-greenbin-primary text-white' : ''}
            >
              <Camera className="mr-2 h-5 w-5" />
              Live Camera
            </Button>
            <Button
              onClick={() => setScanMode('upload')}
              variant={scanMode === 'upload' ? 'default' : 'outline'}
              className={scanMode === 'upload' ? 'bg-greenbin-primary text-white' : ''}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Image
            </Button>
          </div>
          {scanMode === 'upload' && (
            <div className="mt-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={triggerFileUpload}
                className="w-full bg-greenbin-primary hover:bg-greenbin-secondary text-white"
              >
                <Upload className="mr-2 h-5 w-5" />
                Select Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanMethodSelector;
