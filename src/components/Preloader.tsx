import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const completedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    sessionStorage.setItem('hj-preloader-seen', 'true');

    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    onComplete();
  }, [onComplete]);

  const skipPreloader = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    sessionStorage.setItem('hj-preloader-seen', 'true');

    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    // Quick fade out on skip
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete,
      });
    } else {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem('hj-preloader-seen') === 'true') {
      onComplete();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleClick = () => skipPreloader();
    const handleKey = () => skipPreloader();

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKey);

    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });

      // 1. Red light line appears and sweeps across center
      tl.fromTo(
        '.preloader-line',
        { width: '0%', opacity: 0 },
        {
          width: '100%',
          opacity: 1,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. HJ brand mark fades in with glow
      tl.fromTo(
        '.preloader-hj',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.3
      );

      // 3. Red light sweep effect
      tl.fromTo(
        '.preloader-sweep',
        { left: '-20%', opacity: 0 },
        {
          left: '120%',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0.5
      );

      // Fade the line
      tl.to(
        '.preloader-line',
        {
          opacity: 0.3,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.8
      );

      // 4. "HARSH JANGRA" letter-by-letter reveal
      tl.fromTo(
        '.preloader-letter',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.04,
          stagger: 0.04,
          ease: 'power2.out',
        },
        1.0
      );

      // 5. Hold for a moment
      tl.to({}, { duration: 0.4 }, '+=0.1');

      // 6. Everything fades out and lifts with clip-path
      tl.to(
        '.preloader-content',
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: 'power3.inOut',
        },
        '+=0'
      );

      tl.to(
        container,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.6,
          ease: 'power4.inOut',
        },
        '-=0.2'
      );
    }, container);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKey);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, [onComplete, finishPreloader, skipPreloader]);

  // Don't render if already seen
  if (sessionStorage.getItem('hj-preloader-seen') === 'true') {
    return null;
  }

  const nameText = 'HARSH JANGRA';

  return (
    <div ref={containerRef} style={styles.container}>
      <div className="preloader-content" style={styles.content}>
        {/* Red horizontal line */}
        <div className="preloader-line" style={styles.line} />

        {/* Red sweep light */}
        <div className="preloader-sweep" style={styles.sweep} />

        {/* HJ Brand Mark */}
        <div className="preloader-hj" style={styles.hjMark}>
          HJ
        </div>

        {/* HARSH JANGRA text */}
        <div style={styles.nameContainer}>
          {nameText.split('').map((letter, index) => (
            <span
              key={index}
              className="preloader-letter"
              style={{
                ...styles.letter,
                ...(letter === ' ' ? { width: '0.3em' } : {}),
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050505',
    zIndex: 9998,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    clipPath: 'inset(0 0 0% 0)',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #E53935, transparent)',
    opacity: 0,
    width: '0%',
    pointerEvents: 'none',
  },
  sweep: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '80px',
    height: '200px',
    background:
      'radial-gradient(ellipse at center, rgba(229, 57, 53, 0.4) 0%, rgba(229, 57, 53, 0.1) 40%, transparent 70%)',
    filter: 'blur(20px)',
    pointerEvents: 'none',
    opacity: 0,
    left: '-20%',
  },
  hjMark: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: 'clamp(48px, 8vw, 96px)',
    color: '#FFFFFF',
    letterSpacing: '0.15em',
    textShadow:
      '0 0 40px rgba(229, 57, 53, 0.6), 0 0 80px rgba(229, 57, 53, 0.3), 0 0 120px rgba(229, 57, 53, 0.1)',
    opacity: 0,
    position: 'relative',
    zIndex: 2,
    lineHeight: 1,
    marginBottom: '16px',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden',
  },
  letter: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(12px, 2vw, 18px)',
    color: '#FFFFFF',
    letterSpacing: '0.35em',
    fontWeight: 300,
    opacity: 0,
    display: 'inline-block',
  },
};

export default Preloader;
