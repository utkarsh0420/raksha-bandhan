import React, { useMemo } from 'react';

export default function MarigoldPetals() {
  // Generate 24 floating petals with randomized positions, delays, and sizes
  const petals = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 8,
      color: i % 3 === 0 ? '#FFA500' : i % 3 === 1 ? '#FFD700' : '#E63946',
      opacity: 0.4 + Math.random() * 0.45,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal-particle"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.75}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          {/* Stylized Marigold / Flower Petal SVG */}
          <svg viewBox="0 0 30 20" fill={petal.color} className="w-full h-full filter drop-shadow-sm">
            <path d="M 0 10 C 5 0, 25 0, 30 10 C 25 20, 5 20, 0 10 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
