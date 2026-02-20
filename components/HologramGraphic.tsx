import React from 'react';

interface HologramGraphicProps {
  className?: string;
}

const HologramGraphic: React.FC<HologramGraphicProps> = ({ className = "max-w-[400px] mx-auto" }) => {
  return (
    <div className={`relative w-full aspect-square flex items-center justify-center select-none pointer-events-none ${className}`}>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full animate-pulse"></div>
      
      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base Platform / Projector Light */}
        <ellipse cx="200" cy="360" rx="80" ry="20" fill="#3b82f6" opacity="0.2" filter="url(#glow)" />
        <path d="M140 360 L180 150 L220 150 L260 360 Z" fill="url(#holoGradient)" opacity="0.1" />

        {/* Central AI Core - Abstract Brain/Network Metaphor */}
        <g className="animate-[float_6s_ease-in-out_infinite]" style={{ transformOrigin: 'center' }}>
            
            {/* Inner Core Sphere */}
            <circle cx="200" cy="200" r="40" fill="url(#coreGlow)" />
            
            {/* Rotating Data Geometries */}
            <g className="origin-center animate-[spin_10s_linear_infinite]">
                <path d="M200 150 L243 175 L243 225 L200 250 L157 225 L157 175 Z" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.8" filter="url(#glow)" />
                <circle cx="200" cy="150" r="3" fill="#ef4444" />
                <circle cx="243" cy="225" r="3" fill="#ef4444" />
                <circle cx="157" cy="225" r="3" fill="#ef4444" />
            </g>

            <g className="origin-center animate-[spin_15s_linear_infinite_reverse]">
                <rect x="170" y="170" width="60" height="60" rx="2" stroke="#06b6d4" strokeWidth="1" fill="none" transform="rotate(45 200 200)" opacity="0.6" />
            </g>

            {/* Orbital Rings - Representing Processing Power */}
            <ellipse cx="200" cy="200" rx="90" ry="30" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 10" fill="none" opacity="0.6" className="origin-center animate-[spin_8s_linear_infinite]" />
            <ellipse cx="200" cy="200" rx="90" ry="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="20 40" fill="none" opacity="0.4" className="origin-center animate-[spin_12s_linear_infinite_reverse]" style={{ transform: 'rotate(60deg)' }} />
            <ellipse cx="200" cy="200" rx="120" ry="120" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 10" fill="none" opacity="0.2" className="origin-center animate-[spin_30s_linear_infinite]" />

            {/* Floating Data Nodes */}
            <g className="animate-pulse">
                <circle cx="120" cy="180" r="2" fill="#fff" opacity="0.8" />
                <line x1="120" y1="180" x2="160" y2="190" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
                
                <circle cx="280" cy="220" r="2" fill="#fff" opacity="0.8" />
                <line x1="280" y1="220" x2="240" y2="210" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
                
                <circle cx="230" cy="120" r="2" fill="#ef4444" opacity="0.8" />
                <line x1="230" y1="120" x2="210" y2="160" stroke="#ef4444" strokeWidth="0.5" opacity="0.4" />
            </g>
        </g>

        {/* Hologram Scanlines Overlay */}
        <g opacity="0.1">
            <line x1="0" y1="0" x2="400" y2="0" stroke="#fff" strokeWidth="1">
                <animate attributeName="y1" from="0" to="400" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" from="0" to="400" dur="3s" repeatCount="indefinite" />
            </line>
        </g>
      </svg>
    </div>
  );
};

export default HologramGraphic;