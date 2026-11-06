import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Star, ShieldCheck, ExternalLink, CheckCircle } from '../components/Icons';
import { achievements, certifications } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const awardCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const certCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Awards stagger
      awardCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
        });
      });

      // Certifications stagger
      certCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getAwardIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy size={32} color="#E53935" />;
      case 'award':
        return <Award size={32} color="#E53935" />;
      case 'star':
        return <Star size={32} color="#E53935" />;
      default:
        return <Trophy size={32} color="#E53935" />;
    }
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 12vh, 160px) 0',
        backgroundColor: '#050505',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 70px)' }}>
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
              HONORS & ACCREDITATION
            </span>
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(48px, 8vw, 100px)',
              lineHeight: 0.95,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            RECOGNITION <span style={{ color: '#E53935' }}>&</span> CREDENTIALS.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#A5A5A5',
              marginTop: '16px',
              maxWidth: '600px',
            }}
          >
            Milestones and verified competencies across competitive programming, AI architecture, and global developer advocacy.
          </p>
        </div>

        {/* 1. Major Honors Grid (3 Items) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {achievements.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                awardCardsRef.current[idx] = el;
              }}
              data-cursor="pointer"
              style={{
                backgroundColor: '#0c0c0c',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: 'clamp(32px, 4vw, 44px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(229, 57, 53, 0.6)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(229, 57, 53, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  background: 'radial-gradient(circle, rgba(229, 57, 53, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(229, 57, 53, 0.08)',
                    border: '1px solid rgba(229, 57, 53, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                  }}
                >
                  {getAwardIcon(item.icon)}
                </div>

                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#888888',
                    marginBottom: '10px',
                  }}
                >
                  HONOR / DISTINCTION
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    margin: '0 0 16px 0',
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <div>
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '32px',
                    letterSpacing: '1px',
                    color: '#E53935',
                    lineHeight: 1,
                  }}
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Professional Certifications Section */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <ShieldCheck size={20} color="#E53935" />
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '22px',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              PROFESSIONAL CERTIFICATIONS
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  certCardsRef.current[idx] = el;
                }}
                style={{
                  backgroundColor: '#0a0a0a',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(229, 57, 53, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
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
                      {cert.issuer}
                    </span>
                    <CheckCircle size={15} color="#4CAF50" />
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#EDEDED',
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {cert.title}
                  </h4>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      color: '#666666',
                    }}
                  >
                    Verified Credential
                  </span>
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '12px',
                      color: '#A5A5A5',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E53935')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#A5A5A5')}
                  >
                    <span>View Record</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

