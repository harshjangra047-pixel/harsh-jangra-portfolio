import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const headerChildren = headerRef.current.children;
        gsap.fromTo(
          headerChildren,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Vertical line draw animation
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }

      // Entries stagger animation
      experiences.forEach((_, index) => {
        const number = numberRefs.current[index];
        const card = cardRefs.current[index];
        const dot = dotRefs.current[index];
        const tagContainer = tagContainerRefs.current[index];

        if (number) {
          gsap.fromTo(
            number,
            { scale: 1.2, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: number,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { x: 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: dot,
                start: 'top 80%',
                toggleActions: 'play none none none',
                onEnter: () => {
                  gsap.to(dot, {
                    boxShadow: '0 0 20px rgba(229,57,53,0.8)',
                    duration: 0.4,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut',
                  });
                },
              },
            }
          );
        }

        if (tagContainer) {
          const tags = tagContainer.querySelectorAll('[data-tag]');
          gsap.fromTo(
            tags,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: tagContainer,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Styles
  const sectionStyle: React.CSSProperties = {
    background: '#050505',
    padding: 'clamp(80px, 12vw, 160px) 0',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 60px)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '4px',
    color: '#888',
    marginBottom: '16px',
  };

  const redLineStyle: React.CSSProperties = {
    width: '60px',
    height: '2px',
    background: '#E53935',
    marginBottom: '24px',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: 'clamp(48px, 7vw, 100px)',
    color: '#FFFFFF',
    lineHeight: 1.05,
    margin: 0,
    marginBottom: 'clamp(60px, 8vw, 100px)',
  };

  const timelineWrapperStyle: React.CSSProperties = {
    position: 'relative',
  };

  const verticalLineStyle: React.CSSProperties = {
    position: 'absolute',
    left: 'clamp(40px, 7vw, 100px)',
    top: 0,
    bottom: 0,
    width: '1px',
    background: '#1a1a1a',
    transformOrigin: 'top center',
  };

  const entryStyle = (isFeatured: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'clamp(30px, 5vw, 80px)',
    marginBottom: isFeatured ? 'clamp(60px, 8vw, 100px)' : 'clamp(50px, 6vw, 80px)',
    position: 'relative',
  });

  const numberStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: 'clamp(80px, 12vw, 200px)',
    color: 'rgba(229,57,53,0.15)',
    lineHeight: 1,
    minWidth: 'clamp(80px, 14vw, 200px)',
    textAlign: 'center' as const,
    position: 'relative',
    userSelect: 'none' as const,
    flexShrink: 0,
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    left: 'clamp(40px, 7vw, 100px)',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#E53935',
    transform: 'translateX(-4.5px)',
    zIndex: 2,
    boxShadow: '0 0 8px rgba(229,57,53,0.5)',
  };

  const cardStyle = (isFeatured: boolean): React.CSSProperties => ({
    background: '#101010',
    border: '1px solid #1a1a1a',
    borderTop: '3px solid #E53935',
    padding: isFeatured ? 'clamp(30px, 4vw, 48px)' : 'clamp(24px, 3vw, 36px)',
    flex: 1,
    position: 'relative',
    ...(isFeatured
      ? { boxShadow: '0 0 40px rgba(229,57,53,0.1)' }
      : {}),
  });

  const categoryStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    color: '#E53935',
    marginBottom: '12px',
  };

  const roleStyle = (isFeatured: boolean): React.CSSProperties => ({
    fontFamily: "'Bebas Neue', cursive",
    fontSize: isFeatured ? 'clamp(28px, 4vw, 36px)' : 'clamp(24px, 3vw, 30px)',
    color: '#FFFFFF',
    margin: '0 0 6px 0',
    lineHeight: 1.2,
  });

  const orgStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    color: '#A5A5A5',
    margin: '0 0 20px 0',
  };

  const descStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    color: '#A5A5A5',
    lineHeight: 1.7,
    margin: '0 0 24px 0',
  };

  const highlightsGridStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
  };

  const tagStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    color: '#999',
    border: '1px solid #333',
    padding: '8px 16px',
    background: 'transparent',
  };

  const yearBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#FFFFFF',
    background: '#E53935',
    padding: '4px 14px',
    marginBottom: '16px',
    fontWeight: 600,
  };

  // Mobile styles — applied via media query check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const mobileEntryStyle: React.CSSProperties = {
    flexDirection: 'column' as const,
    gap: '0',
    marginBottom: '50px',
  };

  const mobileNumberStyle: React.CSSProperties = {
    fontSize: '60px',
    minWidth: 'unset',
    textAlign: 'left' as const,
    marginBottom: '8px',
  };

  return (
    <section id="experience" ref={sectionRef} style={sectionStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div ref={headerRef}>
          <p style={labelStyle}>EXPERIENCE</p>
          <div style={redLineStyle} />
          <h2 style={headingStyle}>WHERE I&apos;VE CONTRIBUTED.</h2>
        </div>

        {/* Timeline */}
        <div style={timelineWrapperStyle}>
          {/* Vertical connecting line — hidden on mobile */}
          <div
            ref={timelineLineRef}
            style={{
              ...verticalLineStyle,
              ...(isMobile ? { display: 'none' } : {}),
            }}
          />

          {/* Entry 01 — TULSA WEARS (FEATURED) */}
          <div
            style={{
              ...entryStyle(true),
              ...(isMobile ? mobileEntryStyle : {}),
            }}
          >
            {/* Red dot on timeline line */}
            <div
              ref={(el) => { dotRefs.current[0] = el; }}
              style={{
                ...dotStyle,
                top: '40px',
                ...(isMobile ? { display: 'none' } : {}),
              }}
            />

            {/* Large number */}
            <div
              ref={(el) => { numberRefs.current[0] = el; }}
              style={{
                ...numberStyle,
                ...(isMobile ? mobileNumberStyle : {}),
              }}
            >
              {experiences[0].number}
            </div>

            {/* Card */}
            <div
              ref={(el) => { cardRefs.current[0] = el; }}
              style={cardStyle(true)}
            >
              <p style={categoryStyle}>{experiences[0].category.toUpperCase()}</p>
              <h3 style={roleStyle(true)}>{experiences[0].role.toUpperCase()}</h3>
              <p style={orgStyle}>{experiences[0].organization.toUpperCase()}</p>
              <p style={descStyle}>{experiences[0].description}</p>
              <div
                ref={(el) => { tagContainerRefs.current[0] = el; }}
                style={highlightsGridStyle}
              >
                {experiences[0].highlights.map((h, i) => (
                  <span key={i} data-tag style={tagStyle}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Entry 02 — GDG */}
          <div
            style={{
              ...entryStyle(false),
              ...(isMobile ? mobileEntryStyle : {}),
            }}
          >
            <div
              ref={(el) => { dotRefs.current[1] = el; }}
              style={{
                ...dotStyle,
                top: '40px',
                ...(isMobile ? { display: 'none' } : {}),
              }}
            />

            <div
              ref={(el) => { numberRefs.current[1] = el; }}
              style={{
                ...numberStyle,
                ...(isMobile ? mobileNumberStyle : {}),
              }}
            >
              {experiences[1].number}
            </div>

            <div
              ref={(el) => { cardRefs.current[1] = el; }}
              style={cardStyle(false)}
            >
              <p style={categoryStyle}>{experiences[1].category.toUpperCase()}</p>
              <h3 style={roleStyle(false)}>{experiences[1].role.toUpperCase()}</h3>
              <p style={orgStyle}>{experiences[1].organization.toUpperCase()}</p>
              <p style={descStyle}>{experiences[1].description}</p>
              <div
                ref={(el) => { tagContainerRefs.current[1] = el; }}
                style={highlightsGridStyle}
              >
                {experiences[1].highlights.map((h, i) => (
                  <span key={i} data-tag style={tagStyle}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Entry 03 — GOOGLE STUDENT AMBASSADOR */}
          <div
            style={{
              ...entryStyle(false),
              ...(isMobile ? mobileEntryStyle : {}),
            }}
          >
            <div
              ref={(el) => { dotRefs.current[2] = el; }}
              style={{
                ...dotStyle,
                top: '40px',
                ...(isMobile ? { display: 'none' } : {}),
              }}
            />

            <div
              ref={(el) => { numberRefs.current[2] = el; }}
              style={{
                ...numberStyle,
                ...(isMobile ? mobileNumberStyle : {}),
              }}
            >
              {experiences[2].number}
            </div>

            <div
              ref={(el) => { cardRefs.current[2] = el; }}
              style={cardStyle(false)}
            >
              <p style={categoryStyle}>{experiences[2].category.toUpperCase()}</p>
              {experiences[2].year && (
                <span style={yearBadgeStyle}>{experiences[2].year}</span>
              )}
              <h3 style={roleStyle(false)}>{experiences[2].role.toUpperCase()}</h3>
              <p style={orgStyle}>{experiences[2].organization.toUpperCase()}</p>
              <p style={descStyle}>{experiences[2].description}</p>
              {experiences[2].subdescription && (
                <p style={{ ...descStyle, marginBottom: '24px' }}>
                  {experiences[2].subdescription}
                </p>
              )}
              <div
                ref={(el) => { tagContainerRefs.current[2] = el; }}
                style={highlightsGridStyle}
              >
                {experiences[2].highlights.map((h, i) => (
                  <span key={i} data-tag style={tagStyle}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive media query styles injected as a style tag */}
      <style>{`
        @media (max-width: 768px) {
          #experience [data-entry] {
            flex-direction: column !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
