import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const properties = {
      particleColor: 'rgba(255, 255, 255, 0.5)',
      lineColor: 'rgba(255, 255, 255, 0.15)',
      particleCount: Math.min(Math.floor(window.innerWidth / 10), 100),
      connectionDistance: 150,
      mouseDistance: 200,
    };

    let mouse = { x: 0, y: 0 };

    type ParticleType = 'default' | 'red' | 'blue';

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: ParticleType;

      // Update constructor to accept optional coordinates
      constructor(startX?: number, startY?: number) {
        // If coordinates are provided (click), use them. Otherwise random.
        this.x = startX ?? Math.random() * w;
        this.y = startY ?? Math.random() * h;
        
        // If it's a click-spawned particle, give it higher velocity (explosion effect)
        const isSpawned = startX !== undefined;
        const speedMultiplier = isSpawned ? 3 : 0.5;

        this.vx = (Math.random() - 0.5) * speedMultiplier;
        this.vy = (Math.random() - 0.5) * speedMultiplier;
        
        this.size = Math.random() * 2 + 1;
        
        // Randomly assign particle types
        const rand = Math.random();
        if (rand > 0.9) {
            this.type = 'red'; // 10% Swiss Red
        } else if (rand > 0.8) {
            this.type = 'blue'; // 10% Tech Blue
        } else {
            this.type = 'default'; // 80% Standard White
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Friction for spawned particles (slow them down over time to normal speed)
        // This makes the explosion look impactful but then settle down
        if (Math.abs(this.vx) > 0.5) this.vx *= 0.96;
        if (Math.abs(this.vy) > 0.5) this.vy *= 0.96;

        // Mouse interaction (Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < properties.mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (properties.mouseDistance - distance) / properties.mouseDistance;
            // Push away gently
            this.vx -= forceDirectionX * force * 0.05;
            this.vy -= forceDirectionY * force * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.type === 'red') {
            ctx.fillStyle = '#ef4444';
        } else if (this.type === 'blue') {
            ctx.fillStyle = '#3b82f6';
        } else {
            ctx.fillStyle = properties.particleColor;
        }
        
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < properties.connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - distance / properties.connectionDistance;
            
            // Connection color logic
            if (particles[i].type === 'red' || particles[j].type === 'red') {
                ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.4})`;
            } else if (particles[i].type === 'blue' || particles[j].type === 'blue') {
                ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`;
            } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            }
            
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
        // Spawn 6 new particles at click location
        for (let i = 0; i < 6; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }

        // Performance check: Limit total particles to avoid lag
        const maxParticles = 250;
        if (particles.length > maxParticles) {
            // Remove the oldest particles to make room for new ones
            particles.splice(0, particles.length - maxParticles);
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default NeuralBackground;