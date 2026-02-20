import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    // Check if hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expanded selector list for better detection
      const clickable = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      setIsHovering(!!clickable);
    };

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
        if (clickable) {
             setIsHovering(false);
        }
    }

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    // Add mouseout to reset state when leaving an element quickly
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block will-change-transform"
      style={{
        // Top-left of the cursor container is the mouse position
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Container for animations */}
      <div 
        className={`relative transition-transform duration-150 ease-out -ml-[3px] -mt-[2px] ${isClicked ? 'scale-90' : 'scale-100'}`}
      >
        {/* Glow Effect - Changes color/size based on hover state */}
        <div 
          className={`absolute top-[12px] left-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-md transition-all duration-300 ${
            isHovering 
              ? 'w-14 h-14 bg-swiss-red/40 animate-pulse' 
              : 'w-8 h-8 bg-blue-500/10'
          }`}
        ></div>

        {/* Cursor Shape */}
        <div className="relative">
             <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transform transition-all duration-300 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]`}
            >
                {isHovering ? (
                    // Hand Pointer Shape
                    // The tip of the index finger aligns roughly with (3,2) to match the arrow tip
                    <path 
                        d="M6 1.5C6 1.5 6 1.5 6 2V10.5H3.5C2.67 10.5 2 11.17 2 12C2 12.2 2.04 12.38 2.12 12.55L4.62 18.55C4.83 19.06 5.33 19.4 5.91 19.4H13.5C14.33 19.4 15 18.73 15 17.9V12.4C15 11.57 14.33 10.9 13.5 10.9H10.5V2.5C10.5 1.67 9.83 1 9 1H7.5C6.67 1 6 1.67 6 2.5V1.5Z"
                        fill="#94a3b8" 
                        stroke="white" 
                        strokeWidth="1.5" 
                        strokeLinejoin="round"
                    />
                ) : (
                    // Standard Arrow Shape (Vertical Left Edge)
                    <path 
                        d="M3 2 L3 21 L8 16 L18 16 L3 2 Z" 
                        fill="#94a3b8" 
                        stroke="white" 
                        strokeWidth="1.5" 
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;