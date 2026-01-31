'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VideoBackground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (iframeRef.current) {
      const mutedParam = isMuted ? '1' : '0';
      iframeRef.current.src = `https://player.vimeo.com/video/293277364?h=a176caa69f&autoplay=1&loop=1&muted=${mutedParam}`;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        ref={iframeRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
          transform: 'translate(-50%, -50%)',
        }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        title="Background Video"
      />

      {/* Unmute Button */}
      <Button
        onClick={toggleMute}
        size="icon"
        variant="outline"
        className="absolute bottom-6 right-6 z-30 bg-black/50 hover:bg-black/70 border-white/30 text-white backdrop-blur-sm"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  );
}
