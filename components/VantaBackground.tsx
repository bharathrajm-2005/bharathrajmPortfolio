"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
  }
}

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const setVanta = () => {
      if (!vantaEffect.current && vantaRef.current && window.VANTA) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          // Premium gold color (changed from your original)
          color: 0xfff33f, // Soft gold
          backgroundColor: 0x0, // Pure black
          points: 11.00,
          maxDistance: 22.00,
          spacing: 18.00
        });
      }
    };

    // Load Vanta scripts from CDN
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
    script2.async = true;
    
    script1.onload = () => {
      document.body.appendChild(script2);
      script2.onload = setVanta;
    };
    
    document.body.appendChild(script1);

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10"
    />
  );
};

export default VantaBackground;
