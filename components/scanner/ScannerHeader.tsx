
import VoiceAssistant from './VoiceAssistant';

interface ScannerHeaderProps {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
}

const ScannerHeader = ({ isVoiceEnabled, toggleVoice }: ScannerHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-greenbin-dark dark:text-white">AI Waste Scanner</h1>
        <div className="flex space-x-2">
          <VoiceAssistant isVoiceEnabled={isVoiceEnabled} toggleVoice={toggleVoice} />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        Scan waste items to identify them, get recycling information, and find nearby recycling centers.
      </p>
    </div>
  );
};

export default ScannerHeader;
