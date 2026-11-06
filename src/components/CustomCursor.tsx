import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorState = 'default' | 'hover' | 'text';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const stateRef = useRef<CursorState>('default');

  useEffect(() => {
    // Detect touch devices
    const isTouch =
      'ontouchstart' in window ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ring || !textEl) return;

    // Use quickTo for high-performance following
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const setCursorState = (state: CursorState) => {
      if (stateRef.current === state) return;
      stateRef.current = state;

      switch (state) {
        case 'hover':
          gsap.to(ring, {
            scale: 1.5,
            borderColor: 'rgba(229, 57, 53, 0.6)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 0.5,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(textEl, {
            opacity: 0,
            duration: 0.15,
          });
          break;

        case 'text':
          gsap.to(ring, {
            scale: 2,
            borderColor: 'rgba(229, 57, 53, 0.8)',
            backgroundColor: 'rgba(229, 57, 53, 0.08)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(textEl, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          break;

        default:
          gsap.to(ring, {
            scale: 1,
            borderColor: 'rgba(229, 57, 53, 1)',
            backgroundColor: 'transparent',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(textEl, {
            opacity: 0,
            duration: 0.15,
          });
          break;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest<HTMLElement>(
        '[data-cursor], a, button'
      );

      if (!cursorEl) {
        setCursorState('default');
        return;
      }

      const cursorAttr = cursorEl.getAttribute('data-cursor');

      if (cursorAttr === 'view') {
        setCursorState('text');
      } else if (
        cursorAttr === 'pointer' ||
        cursorEl.tagName === 'A' ||
        cursorEl.tagName === 'BUTTON'
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest<HTMLElement>(
        '[data-cursor], a, button'
      );

      if (cursorEl) {
        // Check if we're leaving to a non-interactive element
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        const nextCursorEl = relatedTarget?.closest<HTMLElement>(
          '[data-cursor], a, button'
        );
        if (!nextCursorEl) {
          setCursorState('default');
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#E53935',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid #E53935',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
          backgroundColor: 'transparent',
        }}
      >
        <span
          ref={textRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '9px',
            fontWeight: 600,
            color: '#E53935',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          VIEW
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
