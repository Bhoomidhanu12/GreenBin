
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from 'lucide-react';

interface AIModelStatusProps {
  isAIModelLoaded: boolean;
  isModelLoading: boolean;
}

const AIModelStatus = ({ isAIModelLoaded, isModelLoading }: AIModelStatusProps) => {
  return (
    <div className="mb-6">
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${isAIModelLoaded ? 'bg-green-500' : isModelLoading ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              {isModelLoading 
                ? 'Loading AI detection model...' 
                : isAIModelLoaded 
                  ? 'AI detection model ready' 
                  : 'AI detection model not loaded'}
            </span>
            {isModelLoading && <RefreshCw className="ml-2 h-3 w-3 animate-spin" />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelStatus;
