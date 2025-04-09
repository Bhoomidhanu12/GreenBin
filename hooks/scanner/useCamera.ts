
import { useRef, useState, useEffect } from 'react';
import { toast } from "sonner";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [hasCameraError, setHasCameraError] = useState(false);

  // Stop any active camera stream
  const stopCameraStream = () => {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      setCurrentStream(null);
    }
    
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
    }
  };
  
  // Toggle between front and back cameras
  const switchCamera = async () => {
    setIsCameraLoading(true);
    stopCameraStream();
    
    // Toggle camera facing mode
    const newFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(newFacing);
    
    toast.info(`Switched to ${newFacing === 'environment' ? 'back' : 'front'} camera`);
    
    // Start the new camera immediately
    await startCamera(newFacing);
    setIsCameraLoading(false);
    
    return newFacing;
  };
  
  // Start the camera feed with specified facing mode
  const startCamera = async (facing: 'environment' | 'user' = cameraFacing) => {
    try {
      setIsCameraLoading(true);
      setHasCameraError(false);
      stopCameraStream();
      
      const constraints = {
        video: { 
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Set proper styles for front camera (mirror effect)
        if (facing === 'user') {
          videoRef.current.style.transform = 'scaleX(-1)';
        } else {
          videoRef.current.style.transform = 'scaleX(1)';
        }
        
        // Make sure we wait for the video to be ready to play
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsCameraLoading(false);
                setCameraPermissionGranted(true);
              })
              .catch(err => {
                console.error("Error playing video:", err);
                setIsCameraLoading(false);
                setHasCameraError(true);
              });
          }
        };
        
        setCurrentStream(stream);
      }
      
      return true;
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraLoading(false);
      setHasCameraError(true);
      setCameraPermissionGranted(false);
      
      // More specific error messages based on error type
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          toast.error("Camera access denied. Please enable camera permissions in your browser settings.");
        } else if (err.name === 'NotFoundError') {
          toast.error("No camera detected on your device.");
        } else if (err.name === 'NotReadableError') {
          toast.error("Camera is already in use by another application.");
        } else {
          toast.error("Error accessing camera. Please try again.");
        }
      } else {
        toast.error("Failed to access camera. Please check permissions.");
      }
      
      return false;
    }
  };

  // Check camera permission status on component mount
  useEffect(() => {
    const checkCameraPermissions = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        
        if (videoInputs.length === 0) {
          toast.error("No camera detected on your device");
          return;
        }
      } catch (err) {
        console.error("Error checking camera devices:", err);
      }
    };
    
    checkCameraPermissions();
  }, []);

  return {
    videoRef,
    cameraFacing,
    isCameraLoading,
    cameraPermissionGranted,
    hasCameraError,
    stopCameraStream,
    switchCamera,
    startCamera
  };
}
