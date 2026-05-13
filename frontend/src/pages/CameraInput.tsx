import  { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

interface Props {
  onCapture: (blob: Blob | null) => void;
  width?: string;
  height?: string;
}

// Type definition for the parent's ref
export interface CameraInputHandle {
  takePhoto: () => Promise<Blob | null>;
  resetCamera: () => void;
}

export const CameraInput = forwardRef<CameraInputHandle, Props>(
  ({ onCapture, width = '300px', height = '200px' }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    // Expose logic to the main page
    useImperativeHandle(ref, () => ({
      takePhoto: () => {
        return new Promise((resolve) => {
          if (!videoRef.current || capturedImage) {
            // If already captured, resolve with null or logic to return existing blob
            resolve(null);
            return;
          }

          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext('2d');
          
          if (ctx && videoRef.current) {
            ctx.drawImage(videoRef.current, 0, 0);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
            setCapturedImage(dataUrl);

            canvas.toBlob((blob) => {
              onCapture(blob); 
              resolve(blob);   
            }, 'image/jpeg', 0.95);
          } else {
            resolve(null);
          }
        });
      },
      resetCamera: () => {
        setCapturedImage(null);
      }
    }));

    useEffect(() => {
      // Start stream only if no image is captured yet
      if (!capturedImage) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
          .then(stream => {
            if (videoRef.current) videoRef.current.srcObject = stream;
          })
          .catch(err => console.error("Camera access denied", err));
      }
      
      // Cleanup: stop tracks when component unmounts
      return () => {
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }, [capturedImage]);

    return (
      <div style={{ 
        width, 
        height, 
        position: 'relative', 
        overflow: 'hidden', 
        border: '1px solid #ccc', 
        borderRadius: '8px',
        backgroundColor: '#000' 
      }}>
        {capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        )}
      </div>
    );
  }
);


