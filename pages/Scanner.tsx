
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScannerView from '@/components/scanner/ScannerView';
import { useScannerLogic } from '@/hooks/useScannerLogic';

const Scanner = () => {
  const { startCamera, scanMode } = useScannerLogic();

  // Initialize camera when component mounts
  useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    }
  }, [scanMode, startCamera]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow">
        <ScannerView />
      </div>
      <Footer />
    </div>
  );
};

export default Scanner;
