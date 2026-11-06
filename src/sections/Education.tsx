import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Compass } from '../components/Icons';
import { education } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 8vh, 100px) 0',
        backgroundColor: '#070707',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '2px', backgroundColor: '#E53935' }} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#E53935',
                fontWeight: 600,
              }}
            >
              ACADEMIC FOUNDATION
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            FORMAL <span style={{ color: '#E53935' }}>EDUCATION</span>
          </h2>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          style={{
            backgroundColor: '#0f0f0f',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderLeft: '4px solid #E53935',
            padding: 'clamp(32px, 5vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Background watermark */}
          <div
            style={{
              position: 'absolute',
              right: '-20px',
              bottom: '-20px',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(120px, 18vw, 240px)',
              color: 'rgba(255, 255, 255, 0.015)',
              userSelect: 'none',
              pointerEvents: 'none',
              lineHeight: 0.8,
            }}
          >
            2029
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(229, 57, 53, 0.1)',
                  border: '1px solid rgba(229, 57, 53, 0.3)',
                  padding: '6px 14px',
                  marginBottom: '16px',
                }}
              >
                <GraduationCap size={16} color="#E53935" />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#E53935',
                    fontWeight: 600,
                  }}
                >
                  DEGREE CANDIDATE
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(22px, 3.5vw, 36px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                  lineHeight: 1.2,
                }}
              >
                {education.degree}
              </h3>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#A5A5A5',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                }}
              >
                <Compass size={18} color="#E53935" />
                <span>{education.institution}</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '16px 24px',
                minWidth: '220px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '2px',
                  color: '#E53935',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                }}
              >
                <Calendar size={14} />
                <span>TIMELINE</span>
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '28px',
                  letterSpacing: '2px',
                  color: '#FFFFFF',
                }}
              >
                {education.duration}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#888888',
                  marginTop: '4px',
                }}
              >
                Expected Graduation: {education.expectedGraduation}
              </div>
            </div>
          </div>

          {/* Progress / Timeline Visual Bar */}
          <div style={{ marginTop: '32px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                color: '#777777',
                marginBottom: '8px',
              }}
            >
              <span>2025 • Year 1 Induction</span>
              <span style={{ color: '#E53935' }}>Ongoing B.Tech Progression</span>
              <span>2029 • Graduation</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '35%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #9D111B, #E53935)',
                  boxShadow: '0 0 12px #E53935',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

