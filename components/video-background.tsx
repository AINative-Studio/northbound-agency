'use client';

import { useEffect, useRef } from 'react';

export function VideoBackground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = 'https://player.vimeo.com/video/293277364?h=a176caa69f&autoplay=1&loop=1&muted=1&background=1';
    }
  }, []);

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
    </div>
  );
}
