import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { personalInfo, photos, roleIndicators } from '../data/portfolio';

interface HeroProps {
  animationReady?: boolean;
}

const Hero = ({ animationReady = true }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const smallPhotoRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const parallaxTargetRef = useRef<HTMLDivElement>(null);
  const mouseXTo = useRef<gsap.QuickToFunc | null>(null);
  const mouseYTo = useRef<gsap.QuickToFunc | null>(null);

  // Mouse move parallax handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth < 768) return;
    const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseXTo.current?.(xPercent * 20);
    mouseYTo.current?.(yPercent * 20);
  }, []);

  useEffect(() => {
    if (!animationReady) return;

    const ctx = gsap.context(() => {
      // Set up quickTo for parallax
      if (parallaxTargetRef.current) {
        mouseXTo.current = gsap.quickTo(parallaxTargetRef.current, 'x', {
          duration: 0.6,
          ease: 'power3.out',
        });
        mouseYTo.current = gsap.quickTo(parallaxTargetRef.current, 'y', {
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      // Set initial states
      gsap.set(redLineRef.current, { width: 0, opacity: 1 });
      gsap.set(helloRef.current, { y: 30, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.set(brandRef.current, { y: 20, opacity: 0 });
      gsap.set(imageContainerRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(smallPhotoRef.current, { scale: 0, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      gsap.set(locationRef.current, { opacity: 0, y: 10 });

      // Character spans for name
      const nameChars = nameRef.current?.querySelectorAll('.hero-char');
      if (nameChars) {
        gsap.set(nameChars, { y: 100, opacity: 0 });
      }

      // CTA buttons
      const ctaButtons = ctaContainerRef.current?.querySelectorAll('.hero-cta');
      if (ctaButtons) {
        gsap.set(ctaButtons, { y: 30, opacity: 0 });
      }

      // Role indicators
      const roleItems = rolesRef.current?.querySelectorAll('.hero-role');
      if (roleItems) {
        gsap.set(roleItems, { x: -20, opacity: 0 });
      }

      // Main timeline
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: 'power4.out' },
      });

      // 1. Red line
      tl.to(redLineRef.current, {
        width: 40,
        duration: 0.6,
        ease: 'power2.inOut',
      });

      // 2. "HELLO,"
      tl.to(
        helloRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        '-=0.2'
      );

      // 3. Name characters stagger
      if (nameChars) {
        tl.to(
          nameChars,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power4.out',
          },
          '-=0.3'
        );
      }

      // 4. Subtitle
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        '-=0.3'
      );

      // 5. Brand statement
      tl.to(
        brandRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        '-=0.3'
      );

      // 6. CTAs
      if (ctaButtons) {
        tl.to(
          ctaButtons,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
          },
          '-=0.2'
        );
      }

      // 7. Image reveal
      tl.to(
        imageContainerRef.current,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
        },
        '-=0.6'
      );

      // 8. Small photo
      tl.to(
        smallPhotoRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );

      // 9. Role indicators
      if (roleItems) {
        tl.to(
          roleItems,
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
          },
          '-=0.3'
        );
      }

      // 10. Location
      tl.to(
        locationRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        '-=0.2'
      );

      // 11. Scroll indicator
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          duration: 0.6,
        },
        '-=0.1'
      );

      // Scroll indicator dot animation (loop)
      const scrollDot = scrollIndicatorRef.current?.querySelector('.scroll-dot');
      if (scrollDot) {
        gsap.to(scrollDot, {
          y: 24,
          duration: 1.5,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animationReady, handleMouseMove]);

  // Split text into character spans
  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char"
        style={{
          display: char === ' ' ? 'inline' : 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : undefined,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#050505',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ---- NOISE TEXTURE OVERLAY ---- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ---- SUBTLE RED GRADIENT TOP-RIGHT ---- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(157,17,27,0.15) 0%, transparent 60%)',
        }}
      />

      {/* ---- GIANT CINEMATIC BACKGROUND TYPOGRAPHY (AS IN REFERENCE VIDEO) ---- */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textAlign: 'center',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(120px, 22vw, 340px)',
          lineHeight: 0.8,
          color: 'rgba(157, 17, 27, 0.16)',
          letterSpacing: '0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          whiteSpace: 'nowrap',
          textShadow: '0 0 100px rgba(229, 57, 53, 0.2)',
        }}
      >
        HARSH JANGRA
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '120px 48px 80px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 48,
        }}
      >
        {/* =============== LEFT SIDE =============== */}
        <div
          style={{
            flex: '1 1 55%',
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Red line */}
          <div
            ref={redLineRef}
            style={{
              width: 0,
              height: 2,
              background: '#E53935',
              marginBottom: 20,
              borderRadius: 1,
              opacity: 0,
            }}
          />

          {/* HELLO, */}
          <span
            ref={helloRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: '#A5A5A5',
              letterSpacing: 2,
              marginBottom: 8,
              display: 'block',
              opacity: 0,
            }}
          >
            HELLO,
          </span>

          {/* I'M HARSH. */}
          <h1
            ref={nameRef}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px, 10vw, 160px)',
              color: '#FFFFFF',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              margin: '0 0 16px 0',
              overflow: 'hidden',
              padding: '4px 0',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              {splitText("I'M")}
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              {splitText('HARSH.')}
            </span>
          </h1>

          {/* Subtitle roles */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              color: '#A5A5A5',
              margin: '0 0 12px 0',
              letterSpacing: 1,
              opacity: 0,
            }}
          >
            {personalInfo.roles.slice(0, 3).join('. ')}.
          </p>

          {/* Brand statement */}
          <p
            ref={brandRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              color: '#A5A5A5',
              lineHeight: 1.7,
              maxWidth: 500,
              margin: '0 0 32px 0',
              opacity: 0,
            }}
          >
            {personalInfo.heroSubheading}
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaContainerRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 40,
            }}
          >
            <a
              href="#projects"
              className="hero-cta"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 2,
                padding: '16px 32px',
                borderRadius: 0,
                border: 'none',
                background: '#E53935',
                color: '#FFFFFF',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.3s ease, transform 0.3s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#C62828';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#E53935';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="hero-cta"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 2,
                padding: '16px 32px',
                borderRadius: 0,
                border: '1px solid #E53935',
                background: 'transparent',
                color: '#E53935',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition:
                  'background 0.3s ease, color 0.3s ease, transform 0.3s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#E53935';
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#E53935';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Let&apos;s Connect
            </a>

            {/* Play Showreel Trigger (From Reference Video) */}
            <a
              href="#projects"
              className="hero-cta"
              data-cursor="pointer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E53935';
                e.currentTarget.style.backgroundColor = 'rgba(229, 57, 53, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#E53935',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 14px rgba(229, 57, 53, 0.8)',
                }}
              >
                <span style={{ fontSize: 10, marginLeft: 2, color: '#fff' }}>▶</span>
              </div>
              <span>PLAY SHOWREEL</span>
            </a>
          </div>

          {/* Role Indicators */}
          <div
            ref={rolesRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 20,
            }}
          >
            {roleIndicators.map((role) => (
              <div
                key={role.number}
                className="hero-role"
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 11,
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: 3,
                  opacity: 0,
                }}
              >
                <span style={{ color: '#E53935', marginRight: 8 }}>
                  {role.number}
                </span>
                <span style={{ color: '#555' }}>—</span>
                <span style={{ marginLeft: 8 }}>{role.label}</span>
              </div>
            ))}
          </div>

          {/* Location */}
          <div
            ref={locationRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              color: '#555',
              textTransform: 'uppercase',
              letterSpacing: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#E53935',
                display: 'inline-block',
              }}
            />
            {personalInfo.location.toUpperCase()}
          </div>
        </div>

        {/* =============== RIGHT SIDE =============== */}
        <div
          style={{
            flex: '1 1 35%',
            minWidth: 280,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Red glow behind image */}
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              top: '10%',
              left: '10%',
              background:
                'radial-gradient(ellipse at center, rgba(229,57,53,0.3) 0%, rgba(229,57,53,0.08) 40%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Image container with parallax */}
          <div
            ref={parallaxTargetRef}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: 480,
            }}
          >
            <div
              ref={imageContainerRef}
              style={{
                position: 'relative',
                width: '100%',
                clipPath: 'inset(0 100% 0 0)',
                overflow: 'hidden',
              }}
            >
              {/* Dark background for blend mode */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  background: '#050505',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={photos.illustrated}
                  alt="Harsh Jangra — Illustrated Portrait"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    mixBlendMode: 'lighten',
                    filter: 'contrast(1.05) brightness(1.05)',
                    objectFit: 'cover',
                  }}
                />

                {/* Subtle red tint overlay on image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, rgba(229,57,53,0.06) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Bottom gradient fade */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    background:
                      'linear-gradient(to top, #050505 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Small "real me" photo inset */}
            <div
              ref={smallPhotoRef}
              style={{
                position: 'absolute',
                bottom: 24,
                right: -16,
                width: 120,
                height: 160,
                overflow: 'hidden',
                border: '2px solid #E53935',
                borderRadius: 2,
                transform: 'rotate(2deg) scale(0)',
                opacity: 0,
                zIndex: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={photos.mountain}
                alt="Harsh Jangra"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Subtle overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(5,5,5,0.4) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Stat Counters Column (From Reference Video Frame 06s) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: -36,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                zIndex: 4,
              }}
            >
              {[
                { val: '03.', label: 'CORE ROLES' },
                { val: '2026.', label: 'AMBASSADOR' },
                { val: '01.', label: 'BRAND LEAD' },
              ].map((s, idx) => (
                <div key={idx} style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 28,
                      color: '#E53935',
                      lineHeight: 1,
                      letterSpacing: 1,
                      textShadow: '0 0 12px rgba(229,57,53,0.5)',
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 9,
                      color: '#888',
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- SCROLL INDICATOR ---- */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 3,
          opacity: 0,
        }}
      >
        {/* Vertical line with animated dot */}
        <div
          style={{
            position: 'relative',
            width: 1,
            height: 30,
            background: 'rgba(255,255,255,0.15)',
            overflow: 'hidden',
          }}
        >
          <div
            className="scroll-dot"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 3,
              height: 6,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.6)',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          Scroll
        </span>
      </div>

      {/* ---- RESPONSIVE STYLES (injected into document) ---- */}
      <style>{`
        @media (max-width: 768px) {
          #home > div:nth-child(3) {
            flex-direction: column-reverse !important;
            padding: 100px 24px 60px !important;
            gap: 32px !important;
          }
          #home > div:nth-child(3) > div:first-child {
            flex: 1 1 100% !important;
            min-width: unset !important;
            align-items: center !important;
            text-align: center !important;
          }
          #home > div:nth-child(3) > div:last-child {
            flex: 1 1 100% !important;
            min-width: unset !important;
            max-width: 300px !important;
            margin: 0 auto !important;
          }
          #home h1 {
            font-size: clamp(56px, 14vw, 90px) !important;
          }
          #home .hero-cta {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
