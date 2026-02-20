import React, { useMemo } from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-32 h-32", showTagline = false }) => {
  // Use useMemo to generate particles once and keep them stable
  const particles = useMemo(() => {
    const items = [];
    const count = 160; // High density for the sphere look
    const radius = 160;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // Randomize radius slightly to create depth (a thick shell)
      const r = radius + (Math.random() * 30 - 15);
      const x = 200 + Math.cos(angle) * r;
      const y = 200 + Math.sin(angle) * r;
      
      // Color Logic: Top is Blue, Bottom is Red.
      // We create a slight gradient/mix in the middle equator.
      const isTop = y < 200;
      let color = isTop ? '#3b82f6' : '#ef4444'; // Default Blue or Red
      
      // Randomly mix colors near the equator for organic look
      if (Math.abs(y - 200) < 20) {
         color = Math.random() > 0.5 ? '#3b82f6' : '#ef4444';
      }

      items.push({
        cx: x,
        cy: y,
        r: Math.random() * 2.5 + 1, // Varied particle sizes
        fill: color,
        opacity: Math.random() * 0.5 + 0.4
      });
    }
    return items;
  }, []);

  // Inner orbital particles (fewer, faster)
  const innerOrbitals = useMemo(() => {
    const items = [];
    for(let i=0; i<12; i++) {
        items.push({
            angle: (i / 12) * 360,
            r: 130 + Math.random() * 10
        })
    }
    return items;
  }, []);

  return (
    <svg 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Swiss AI Logo"
    >
      <defs>
        {/* Radial gradient to create the "Void" effect in the center behind text */}
        <radialGradient id="centerVoid" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) scale(160)">
          <stop offset="0.6" stopColor="#0F172A" stopOpacity="0.95" />
          <stop offset="0.85" stopColor="#0F172A" stopOpacity="0.6" />
          <stop offset="1" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dark Center Background */}
      <circle cx="200" cy="200" r="150" fill="url(#centerVoid)" />

      {/* Main Particle Sphere (Slow Rotation) */}
      <g className="origin-center animate-[spin_60s_linear_infinite]">
        {particles.map((p, i) => (
          <circle key={i} {...p} />
        ))}
      </g>
      
      {/* Decorative Dashed Rings (Tech Feel) */}
      <circle cx="200" cy="200" r="175" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 40" opacity="0.3" className="origin-center animate-[spin_20s_linear_infinite]" />
      <circle cx="200" cy="200" r="170" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 20" opacity="0.3" className="origin-center animate-[spin_30s_linear_infinite_reverse]" />

      {/* Main Text - Updated to Good Timing Bold */}
      <text 
        x="200" 
        y="195" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="white" 
        fontFamily="'Good Timing Bold', 'Good Timing', 'Orbitron', sans-serif" 
        fontWeight="700" 
        fontSize="46"
        letterSpacing="1"
        style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.8))' }}
      >
        SWISS AI
      </text>
      
      {/* Tagline - Matches the design "FUTURE IS NOW" in red */}
      {showTagline && (
        <text 
          x="200" 
          y="235" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="#ef4444" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="600" 
          fontSize="16"
          letterSpacing="5"
          style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}
        >
          FUTURE IS NOW
        </text>
      )}
    </svg>
  );
};

export default Logo;