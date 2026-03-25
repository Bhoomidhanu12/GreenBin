
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <>
      <div 
        className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-10"
        style={{ animation: "fadeOut 1s forwards 1s" }}
      >
        <RefreshCw className="h-12 w-12 text-greenbin-primary animate-spin-slow" />
        <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Loading Global Waste Map...</p>
      </div>
      
      {/* Add the keyframes animation using a style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; visibility: hidden; }
          }
        `
      }} />
    </>
  );
};

export default LoadingOverlay;
