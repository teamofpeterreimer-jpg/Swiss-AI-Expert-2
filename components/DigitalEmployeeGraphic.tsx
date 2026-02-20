import React from 'react';

interface DigitalEmployeeGraphicProps {
  className?: string;
}

const DigitalEmployeeGraphic: React.FC<DigitalEmployeeGraphicProps> = ({ className = "max-w-[400px] mx-auto" }) => {
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
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="brainGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <filter id="glitch">
             <feTurbulence type="fractalNoise" baseFrequency="0.01 0.005" numOctaves="2" result="noise"/>
             <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>

        {/* Base Platform */}
        <ellipse cx="200" cy="380" rx="100" ry="20" fill="#3b82f6" opacity="0.2" className="animate-pulse" />
        <g className="origin-center animate-[spin_10s_linear_infinite]">
             <ellipse cx="200" cy="380" rx="120" ry="30" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 20" opacity="0.4" />
        </g>

        {/* Floating Avatar Body */}
        <g className="animate-[float_6s_ease-in-out_infinite]" style={{ transformOrigin: 'center' }}>
            
            {/* Shoulders / Torso - Wireframe style */}
            <path 
                d="M100 380 Q200 380 300 380 L320 320 Q340 280 280 280 L250 280 L250 250 L150 250 L150 280 L120 280 Q60 280 80 320 Z" 
                fill="url(#avatarGradient)" 
                opacity="0.2" 
                stroke="#3b82f6" 
                strokeWidth="1"
            />
            
            {/* Neck */}
            <rect x="170" y="200" width="60" height="60" fill="#3b82f6" opacity="0.3" />
            <path d="M170 200 L170 260 M230 200 L230 260" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />

            {/* Head Shape */}
            <path 
                d="M150 150 C150 90 250 90 250 150 C250 190 230 220 200 220 C170 220 150 190 150 150 Z" 
                fill="#0f172a" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                opacity="0.8"
            />
            
            {/* Face/Visor Line */}
            <path d="M160 150 Q200 160 240 150" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />

            {/* Brain / AI Core */}
            <circle cx="200" cy="130" r="25" fill="url(#brainGlow)" opacity="0.8" className="animate-pulse" />
            
            {/* Neural Connections inside head */}
            <g opacity="0.6">
                <circle cx="190" cy="120" r="2" fill="#fff" />
                <circle cx="210" cy="120" r="2" fill="#fff" />
                <circle cx="200" cy="140" r="2" fill="#fff" />
                <line x1="190" y1="120" x2="210" y2="120" stroke="#fff" strokeWidth="0.5" />
                <line x1="190" y1="120" x2="200" y2="140" stroke="#fff" strokeWidth="0.5" />
                <line x1="210" y1="120" x2="200" y2="140" stroke="#fff" strokeWidth="0.5" />
            </g>

            {/* Floating Data Rings around Head */}
            <ellipse cx="200" cy="150" rx="70" ry="15" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.5" className="origin-center animate-[spin_8s_linear_infinite]" />
            <ellipse cx="200" cy="150" rx="80" ry="10" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.4" className="origin-center animate-[spin_12s_linear_infinite_reverse]" style={{ transform: 'rotate(-10deg)' }} />

        </g>

        {/* Scanning Effect */}
        <line x1="0" y1="0" x2="400" y2="0" stroke="#3b82f6" strokeWidth="2" opacity="0.5">
            <animate attributeName="y1" from="50" to="400" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y2" from="50" to="400" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
        </line>
        
        {/* Hologram Scanlines Overlay */}
        <g opacity="0.15">
             <pattern id="scanlines" x="0" y="0" width="100%" height="4" patternUnits="userSpaceOnUse">
                 <rect x="0" y="0" width="100%" height="2" fill="#000" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#scanlines)" />
        </g>

      </svg>
    </div>
  );
};

export default DigitalEmployeeGraphic;