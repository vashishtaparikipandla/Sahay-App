'use client';
import React, { useEffect, useState, useRef } from 'react';

export function DeviceScaler({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computeScale = () => {
      // Intrinsic size of the device-frame including its box-shadow bezel
      // Frame width: 412, shadow: 14px on both sides -> 440
      // Frame height: 917, shadow: 14px on both sides -> 945
      const frameNaturalWidth = 440;
      const frameNaturalHeight = 945;
      
      // We want to leave about 48px of margin so it doesn't touch the browser edges
      const margin = 48;
      const availableWidth = window.innerWidth - margin;
      const availableHeight = window.innerHeight - margin;
      
      const newScale = Math.min(
        availableWidth / frameNaturalWidth,
        availableHeight / frameNaturalHeight,
        1
      );
      setScale(newScale);
    };

    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        transition: 'transform 0.1s ease-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}
