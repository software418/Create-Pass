import React, { useRef, useEffect } from 'react';

interface Props {
  onCapture: (blob: Blob | null) => void;
  width?: string;
  height?: string;
}

export const CameraInput: React.FC<Props> = ({ onCapture, width = '300px', height = '200px' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start camera when component mounts
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error("Camera access denied", err));
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    
    canvas.toBlob((blob) => {
      onCapture(blob);
    }, 'image/jpeg', 0.95);
  };

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden', border: '1px solid #ccc' }}>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <button 
        type="button" 
        onClick={takePhoto}
        style={{ position: 'absolute', bottom: '10px', left: '10px' }}
      >
        Snap Photo
      </button>
    </div>
  );
};