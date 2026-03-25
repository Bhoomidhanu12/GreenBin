
import { useState } from 'react';
import { toast } from "sonner";

export function useVoiceFeatures() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [voiceToTextEnabled, setVoiceToTextEnabled] = useState(false);
  const [productDescription, setProductDescription] = useState('');

  // Handle voice-to-text functionality
  const toggleVoiceToText = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice recognition is not supported in this browser");
      return;
    }
    
    setVoiceToTextEnabled(prev => !prev);
    
    // Implement speech recognition (mock implementation)
    if (!voiceToTextEnabled) {
      toast.info("Voice input started, speak now...");
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        const possiblePhrases = [
          "Plastic water bottle",
          "Aluminum can",
          "Glass container",
          "Electronic device",
          "Cardboard box"
        ];
        const randomPhrase = possiblePhrases[Math.floor(Math.random() * possiblePhrases.length)];
        
        setProductDescription(prev => prev + (prev ? ' ' : '') + randomPhrase);
        setVoiceToTextEnabled(false);
        toast.success("Voice input recorded");
      }, 3000);
    }
  };

  // Simulate voice assistant speaking detection results
  const speakDetectionResults = (items: any[]) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `Detected ${items.length} items. ${items[0].name} found with ${Math.round(items[0].confidenceScore * 100)}% confidence. This item is ${items[0].recyclable ? 'recyclable' : 'non-recyclable'} and has a ${items[0].impact.toLowerCase()} environmental impact.`;
      speech.lang = 'en-US';
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  // Toggle voice assistant
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast(isVoiceEnabled ? "Voice assistant disabled" : "Voice assistant enabled");
  };

  return {
    isVoiceEnabled,
    voiceToTextEnabled,
    productDescription,
    setProductDescription,
    toggleVoiceToText,
    speakDetectionResults,
    toggleVoice
  };
}
