import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../shared/ui/atoms/Button';

interface Props {
  onCapture: (blob: Blob | null) => void;
  width?: string;
  height?: string;
}

export const CameraInput: React.FC<Props> = ({ onCapture, width = '300px', height = '200px' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // 1. Add state to hold the image URL
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera access denied", err));
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    
    // 2. Convert to Data URL for immediate preview
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(dataUrl);

    // 3. Convert to Blob for your backend logic
    canvas.toBlob((blob) => {
      onCapture(blob);
    }, 'image/jpeg', 0.95);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden', border: '1px solid #ccc' }}>
      
      {capturedImage ? (
        // Preview Mode
        <div style={{ width: '100%', height: '100%' }}>
          <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Button type="button" onClick={retakePhoto} style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
            Retake
          </Button>
        </div>
      ) : (
        // Camera Mode
        <div style={{ width: '100%', height: '100%' }}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <Button type="button" onClick={takePhoto} style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
            Snap Photo
          </Button>
        </div>
      )}
    </div>
  );
};