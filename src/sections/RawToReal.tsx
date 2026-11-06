import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RawToReal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      num: '01',
      title: 'THE CONCEPT',
      desc: 'Deconstructing core objectives, user personas, brand voice, and visual storytelling direction.',
    },
    {
      num: '02',
      title: 'THE ARCHITECTURE',
      desc: 'Formulating modular React/TypeScript schemas, high-performance state trees, and responsive flow.',
    },
    {
      num: '03',
      title: 'THE CRAFT & CODE',
      desc: 'Developing e-commerce backbones, Look-builders, dynamic asset delivery, and algorithmic features.',
    },
    {
      num: '04',
      title: 'THE CINEMATIC POLISH',
      desc: 'Injecting GSAP scroll timelines, custom shaders, film grain, and dramatic lighting aesthetics.',
    },
  ];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <section
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
              UNDER THE HOOD
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 8vw, 100px)',
              lineHeight: 0.95,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            FROM RAW. <span style={{ color: '#E53935' }}>TO REAL.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#A5A5A5',
              marginTop: '16px',
              maxWidth: '620px',
            }}
          >
            Drag the comparison slider to reveal how structured code, wireframes, and raw systems transform into high-impact visual digital experiences.
          </p>
        </div>

        {/* 1. Interactive Comparison Viewport */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
          data-cursor="pointer"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(320px, 45vw, 540px)',
            backgroundColor: '#0c0c0c',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            cursor: 'ew-resize',
            userSelect: 'none',
            marginBottom: '64px',
          }}
        >
          {/* Side A: REAL / FINISHED PRODUCTION (Underneath) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse at 70% 50%, rgba(157, 17, 27, 0.4) 0%, #080808 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(20px, 4vw, 60px)',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                border: '1px solid rgba(229, 57, 53, 0.4)',
                backgroundColor: 'rgba(10, 10, 10, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: 'clamp(24px, 4vw, 48px)',
                maxWidth: '700px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(229, 57, 53, 0.2)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '24px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#4CAF50',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#4CAF50',
                    boxShadow: '0 0 8px #4CAF50',
                  }}
                />
                FINAL PRODUCTION
              </div>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '3px',
                  color: '#E53935',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                TULSA WEARS • HIGH-FASHION PLATFORM
              </div>

              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                  letterSpacing: '0.03em',
                  lineHeight: 1,
                }}
              >
                CINEMATIC COMMERCE LOOK-BUILDER
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#CCCCCC',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0',
                }}
              >
                Dynamic real-time look customization, Vercel Blob cloud image delivery, and high-frequency administrative sync.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 14px', backgroundColor: '#E53935', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>
                  ACTIVE SYSTEM
                </span>
                <span style={{ padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#eee', fontSize: '11px', letterSpacing: '1px' }}>
                  60 FPS GSAP RENDER
                </span>
              </div>
            </div>
          </div>

          {/* Side B: RAW / WIREFRAME & CODE (Clipped overlay) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              backgroundColor: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(20px, 4vw, 60px)',
              boxSizing: 'border-box',
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            <div
              style={{
                border: '1px dashed rgba(255, 255, 255, 0.25)',
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                padding: 'clamp(24px, 4vw, 48px)',
                maxWidth: '700px',
                width: '100%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '24px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#E53935',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#E53935',
                  }}
                />
                RAW SCHEMATIC & CODE
              </div>

              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#888888',
                  marginBottom: '12px',
                }}
              >
                // [TULSA_WEARS] Core Architecture Definition
              </div>

              <pre
                style={{
                  fontFamily: "'SF Mono', Consolas, monospace",
                  fontSize: 'clamp(11px, 1.3vw, 13px)',
                  color: '#4CAF50',
                  lineHeight: 1.5,
                  margin: 0,
                  overflowX: 'hidden',
                }}
              >
{`interface ECommerceEngine {
  catalog: LookBuilderState;
  blobStorage: VercelBlobGateway;
  syncProtocol: RealTimeAdminBridge;
  renderMode: '60fps-gsap-smooth';
}

const dispatchOrder = async (item: Look) => {
  await bridge.emit('CATALOG_UPDATE', item);
};`}
              </pre>

              <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', padding: '4px 8px', border: '1px solid #444', color: '#aaa' }}>
                  BOX_X: 1440
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', padding: '4px 8px', border: '1px solid #444', color: '#aaa' }}>
                  BOX_Y: 900
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', padding: '4px 8px', border: '1px solid #444', color: '#E53935' }}>
                  WIREFRAME_ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Draggable Divider Line & Knob */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: '2px',
              backgroundColor: '#E53935',
              boxShadow: '0 0 16px rgba(229, 57, 53, 0.9)',
              pointerEvents: 'none',
              transform: 'translateX(-50%)',
            }}
          >
            {/* Center Handle Knob */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#050505',
                border: '2px solid #E53935',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(229, 57, 53, 0.6)',
              }}
            >
              <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}>
                ↔
              </span>
            </div>
          </div>
        </div>

        {/* 2. Process Stepper & Quote Card (Inspired by Reference Video Frame 35s) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Process Stepper */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#E53935',
                fontWeight: 600,
                marginBottom: '24px',
              }}
            >
              FROM IDEA TO FINAL FRAME
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {/* Connecting vertical line */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  bottom: '16px',
                  left: '19px',
                  width: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  zIndex: 0,
                }}
              />

              {steps.map((st, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={st.num}
                    onClick={() => setActiveStep(i)}
                    data-cursor="pointer"
                    style={{
                      display: 'flex',
                      gap: '20px',
                      position: 'relative',
                      zIndex: 1,
                      padding: '12px 16px',
                      backgroundColor: isActive ? 'rgba(229, 57, 53, 0.05)' : 'transparent',
                      border: isActive ? '1px solid rgba(229, 57, 53, 0.3)' : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Step indicator node */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        flexShrink: 0,
                        backgroundColor: isActive ? '#E53935' : '#141414',
                        border: isActive ? '2px solid #FF3038' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isActive ? '#FFFFFF' : '#888888',
                        boxShadow: isActive ? '0 0 16px rgba(229, 57, 53, 0.6)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {st.num}
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '15px',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          color: isActive ? '#FFFFFF' : '#AAAAAA',
                          margin: '0 0 6px 0',
                        }}
                      >
                        {st.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '13px',
                          color: isActive ? '#CCCCCC' : '#666666',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Signature Editorial Crimson Quote Card */}
          <div
            style={{
              backgroundColor: '#9D111B',
              backgroundImage: 'linear-gradient(135deg, #9D111B 0%, #680b12 100%)',
              padding: 'clamp(36px, 5vw, 56px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(157, 17, 27, 0.3)',
            }}
          >
            {/* Background watermark quote icon */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '16px',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '160px',
                color: 'rgba(255, 255, 255, 0.08)',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: 1,
              }}
            >
              “
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '20px',
                  fontWeight: 600,
                }}
              >
                CREATIVE CREED
              </div>

              <blockquote
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                "From raw logic and systems architecture to cinematic visual stories that leave a lasting impression."
              </blockquote>
            </div>

            <div style={{ marginTop: '36px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '20px' }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '24px',
                  letterSpacing: '1px',
                  color: '#FFFFFF',
                }}
              >
                HARSH JANGRA
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  letterSpacing: '1px',
                }}
              >
                Creative Technologist • Developer • Community Builder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RawToReal;

