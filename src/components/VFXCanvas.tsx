import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  type: 'cross' | 'sparkle' | 'dot';
}

const VFXCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Create VFX particles (crosshairs, sparkles, dots as seen in the reference video)
    const particleCount = Math.floor(Math.min(width, 1440) / 28);
    const particles: Particle[] = [];

    const types: ('cross' | 'sparkle' | 'dot')[] = ['cross', 'sparkle', 'dot'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 4 + 3,
        alpha: Math.random() * 0.4 + 0.1,
        targetAlpha: Math.random() * 0.5 + 0.15,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    const drawCross = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.strokeStyle = `rgba(229, 57, 53, ${alpha * 0.75})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - s, y);
      ctx.lineTo(x + s, y);
      ctx.moveTo(x, y - s);
      ctx.lineTo(x, y + s);
      ctx.stroke();
      ctx.restore();
    };

    const drawSparkle = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.moveTo(x, y - s * 1.5);
      ctx.lineTo(x + s * 0.4, y - s * 0.4);
      ctx.lineTo(x + s * 1.5, y);
      ctx.lineTo(x + s * 0.4, y + s * 0.4);
      ctx.lineTo(x, y + s * 1.5);
      ctx.lineTo(x - s * 0.4, y + s * 0.4);
      ctx.lineTo(x - s * 1.5, y);
      ctx.lineTo(x - s * 0.4, y - s * 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawDot = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.fillStyle = `rgba(229, 57, 53, ${alpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(x, y, s * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mouseRef.current.active;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Repel or attract slightly towards mouse
        if (hasMouse) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle alpha breathing
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        if (Math.abs(p.targetAlpha - p.alpha) < 0.03) {
          p.targetAlpha = Math.random() * 0.45 + 0.1;
        }

        // Render based on type
        if (p.type === 'cross') {
          drawCross(p.x, p.y, p.size, p.alpha);
        } else if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.alpha);
        } else {
          drawDot(p.x, p.y, p.size, p.alpha);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.85,
      }}
    />
  );
};

export default VFXCanvas;

