'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: any;
  }
}

const useVantaBackground = () => {
  const vantaRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Vanta.js from CDN for better compatibility
    const loadVanta = () => {
      if (typeof window !== 'undefined' && window.VANTA) {
        // Initialize Vanta NET with premium gold theme
        vantaRef.current = window.VANTA.NET({
          el: containerRef.current,
          // Premium gold color (soft gold tone)
          color: 0xffd700,
          // Deep near-black background
          backgroundColor: 0x0a0a0a,
          // Minimal density for clean look
          points: 8,
          maxDistance: 20,
          spacing: 18,
          // Elegant appearance
          showDots: true,
          // Smooth interactions
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          // Full screen coverage
          minHeight: 2000,
          minWidth: 2000,
          // Subtle scale for premium feel
          scale: 1.0,
          scaleMobile: 1.0,
        });
      }
    };

    // Load Vanta.js and THREE.js from CDN
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js';
    script2.async = true;
    
    script1.onload = () => {
      document.body.appendChild(script2);
      script2.onload = loadVanta;
    };
    
    document.body.appendChild(script1);

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  return { containerRef };
};

export default useVantaBackground;
