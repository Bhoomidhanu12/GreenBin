
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
import { toast } from "sonner";

interface VoiceAssistantProps {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
}

const VoiceAssistant = ({ isVoiceEnabled, toggleVoice }: VoiceAssistantProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center"
      onClick={toggleVoice}
    >
      {isVoiceEnabled ? (
        <>
          <Mic className="h-4 w-4 mr-1.5 text-greenbin-primary" />
          Voice On
        </>
      ) : (
        <>
          <MicOff className="h-4 w-4 mr-1.5 text-gray-500" />
          Voice Off
        </>
      )}
    </Button>
  );
};

export default VoiceAssistant;
