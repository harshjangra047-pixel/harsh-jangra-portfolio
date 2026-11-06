import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Film, Users } from '../components/Icons';
import { expertise } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Cards staggered entrance
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      id: 'tech',
      num: '01',
      title: 'TECHNOLOGY',
      subtitle: 'Code, Architecture & AI Systems',
      icon: <Terminal size={24} color="#E53935" />,
      items: expertise.technology,
      glowColor: 'rgba(229, 57, 53, 0.12)',
    },
    {
      id: 'creative',
      num: '02',
      title: 'CREATIVE',
      subtitle: 'Visual Effects, UGC & Digital Storytelling',
      icon: <Film size={24} color="#E53935" />,
      items: expertise.creative,
      glowColor: 'rgba(157, 17, 27, 0.15)',
    },
    {
      id: 'leadership',
      num: '03',
      title: 'LEADERSHIP & COMMUNITY',
      subtitle: 'Initiative, Collaboration & Ecosystem Building',
      icon: <Users size={24} color="#E53935" />,
      items: expertise.leadership,
      glowColor: 'rgba(255, 48, 56, 0.1)',
    },
  ];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 12vh, 160px) 0',
        backgroundColor: '#050505',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
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
              CAPABILITIES & DOMAINS
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
            DISCIPLINES <span style={{ color: '#E53935' }}>&</span> CRAFT.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#A5A5A5',
              marginTop: '16px',
              maxWidth: '640px',
            }}
          >
            A multidisciplinary convergence of systems programming, emerging artificial intelligence,
            high-impact visual media and community-driven technology initiatives.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              data-cursor="pointer"
              style={{
                backgroundColor: '#0c0c0c',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '2px',
                padding: 'clamp(28px, 4vw, 44px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(229, 57, 53, 0.5)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 16px 40px ${cat.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background watermark number */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '16px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '90px',
                  color: 'rgba(255, 255, 255, 0.03)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                {cat.num}
              </div>

              <div>
                {/* Icon & Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(229, 57, 53, 0.1)',
                      border: '1px solid rgba(229, 57, 53, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '12px',
                      letterSpacing: '2px',
                      color: '#E53935',
                      fontWeight: 600,
                    }}
                  >
                    {cat.num}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(28px, 3.5vw, 36px)',
                    letterSpacing: '0.04em',
                    color: '#FFFFFF',
                    margin: '0 0 8px 0',
                    lineHeight: 1,
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#777777',
                    margin: '0 0 32px 0',
                    lineHeight: 1.5,
                  }}
                >
                  {cat.subtitle}
                </p>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(229, 57, 53, 0.06)';
                        e.currentTarget.style.borderColor = 'rgba(229, 57, 53, 0.25)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#E53935',
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '14px',
                          color: '#E0E0E0',
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent indicator */}
              <div
                style={{
                  marginTop: '32px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#666666',
                  }}
                >
                  FIELD ACTIVE
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#E53935',
                    boxShadow: '0 0 10px #E53935',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

