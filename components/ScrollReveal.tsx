import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'zoom-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // in milliseconds
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when just 10% of the element is visible to ensure it fires reliably
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // Safety check for ref.current before accessing in cleanup
      // Note: ref.current might be null if unmounted, but observer.unobserve needs the element.
      // In strict mode or React 18+, refs are cleared. We'll leave the unobserve logic to the variable.
      // But standard practice is to copy ref.current to a variable inside effect.
    };
  }, []);

  // Define initial styles based on animation type
  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-in-left':
        return 'opacity-0 -translate-x-24'; // Start from left
      case 'fade-in-right':
        return 'opacity-0 translate-x-24'; // Start from right
      case 'zoom-in':
        return 'opacity-0 scale-75'; // Start smaller
      case 'fade-in-up':
      default:
        return 'opacity-0 translate-y-24'; // Start from bottom
    }
  };

  // Define visible styles (resetting transforms)
  const getVisibleStyle = () => {
    return 'opacity-100 translate-x-0 translate-y-0 scale-100';
  };

  return (
    <div
      ref={ref}
      // Apply the transition delay inline
      style={{ 
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`${className} transform transition-all duration-1000 ${
        isVisible ? getVisibleStyle() : getInitialStyle()
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;