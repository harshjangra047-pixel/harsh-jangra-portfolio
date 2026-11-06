import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Instagram, ArrowUp, Send, AlertCircle } from '../components/Icons';
import { personalInfo } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const titleLine3Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'notice'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleLine1Ref.current,
          start: 'top 85%',
        },
      });

      tl.from([titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current], {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
      }).from(
        contentRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all fields before sending.');
      return;
    }
    // Honest client-side state without fake delivery
    setFormStatus('notice');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(100px, 15vh, 180px) 0 40px 0',
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background Cinematic Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(157, 17, 27, 0.15) 0%, rgba(5, 5, 5, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(229, 57, 53, 0.08) 0%, rgba(5, 5, 5, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Massive Cinematic Headline */}
        <div style={{ marginBottom: 'clamp(48px, 8vw, 96px)' }}>
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={titleLine1Ref}
              style={{
                fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
                fontSize: 'clamp(54px, 11vw, 150px)',
                lineHeight: 0.88,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
              }}
            >
              LET'S CREATE
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={titleLine2Ref}
              style={{
                fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
                fontSize: 'clamp(54px, 11vw, 150px)',
                lineHeight: 0.88,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
              }}
            >
              SOMETHING
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={titleLine3Ref}
              style={{
                fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
                fontSize: 'clamp(54px, 11vw, 150px)',
                lineHeight: 0.88,
                color: '#E53935',
                letterSpacing: '0.02em',
                textShadow: '0 0 40px rgba(229, 57, 53, 0.4)',
              }}
            >
              REMARKABLE.
            </div>
          </div>
        </div>

        {/* Content Section: 2 Columns */}
        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(40px, 8vw, 100px)',
            marginBottom: 'clamp(80px, 12vh, 140px)',
          }}
        >
          {/* Left Column: Direct Outreach & Direct Links */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(18px, 2.5vw, 22px)',
                color: '#A5A5A5',
                lineHeight: 1.6,
                marginBottom: '40px',
                maxWidth: '520px',
              }}
            >
              "Have an idea, collaboration or opportunity in mind? Let's connect and build something meaningful."
            </p>

            {/* Direct Email Card */}
            <div
              style={{
                backgroundColor: '#0c0c0c',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: '3px solid #E53935',
                padding: '24px 32px',
                marginBottom: '40px',
                display: 'inline-block',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#666666',
                  marginBottom: '8px',
                }}
              >
                DIRECT DISPATCH
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E53935')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                >
                  {personalInfo.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  data-cursor="pointer"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: copied ? '#4CAF50' : '#A5A5A5',
                    padding: '6px 14px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#666666',
                  marginBottom: '16px',
                }}
              >
                CONNECT & VERIFY
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { name: 'LinkedIn', icon: <Linkedin size={18} />, href: personalInfo.social.linkedin },
                  { name: 'GitHub', icon: <Github size={18} />, href: personalInfo.social.github },
                  { name: 'Instagram', icon: <Instagram size={18} />, href: personalInfo.social.instagram },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="pointer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#E0E0E0',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                      letterSpacing: '1px',
                      textDecoration: 'none',
                      transition: 'border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#E53935';
                      e.currentTarget.style.backgroundColor = 'rgba(229, 57, 53, 0.1)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = '#E0E0E0';
                    }}
                  >
                    {s.icon}
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Transmission Panel */}
          <div>
            <div
              style={{
                backgroundColor: '#0b0b0b',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                padding: 'clamp(28px, 4vw, 44px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '28px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#E53935',
                    fontWeight: 600,
                  }}
                >
                  TRANSMISSION MODULE
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#4CAF50',
                    boxShadow: '0 0 10px #4CAF50',
                  }}
                />
              </div>

              {formStatus === 'notice' ? (
                <div
                  style={{
                    padding: '24px',
                    backgroundColor: 'rgba(229, 57, 53, 0.08)',
                    border: '1px solid rgba(229, 57, 53, 0.3)',
                    color: '#EDEDED',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E53935', fontWeight: 600, marginBottom: '8px' }}>
                    <AlertCircle size={18} />
                    <span>CLIENT CONFIGURATION NOTICE</span>
                  </div>
                  Thank you for reaching out, <strong>{formData.name}</strong>. Because external email gateways are configured client-side, please dispatch directly to{' '}
                  <a href={`mailto:${personalInfo.email}?subject=Project inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}`} style={{ color: '#E53935', textDecoration: 'underline' }}>
                    {personalInfo.email}
                  </a>{' '}
                  or click the button below to launch your default mail app with this message prepared.
                  <div style={{ marginTop: '20px' }}>
                    <a
                      href={`mailto:${personalInfo.email}?subject=Collaboration / Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#E53935',
                        color: '#FFFFFF',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                      }}
                    >
                      <Mail size={14} /> Open in Mail Client
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#888888',
                        marginBottom: '8px',
                      }}
                    >
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#E53935')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#888888',
                        marginBottom: '8px',
                      }}
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#E53935')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#888888',
                        marginBottom: '8px',
                      }}
                    >
                      MESSAGE / PROPOSAL
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your concept, timeline or inquiry..."
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#E53935')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="pointer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      backgroundColor: '#E53935',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '16px 28px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF3038';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#E53935';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Send size={15} />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Large Editorial Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '60px',
            marginTop: '40px',
          }}
        >
          {/* Faint Oversized Brand Typographic Horizon */}
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(50px, 12vw, 160px)',
              lineHeight: 0.9,
              color: 'rgba(255, 255, 255, 0.03)',
              userSelect: 'none',
              letterSpacing: '0.04em',
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            HARSH JANGRA
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              paddingBottom: '24px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '6px',
                }}
              >
                HARSH JANGRA
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#666666',
                  letterSpacing: '1px',
                }}
              >
                CREATIVE TECHNOLOGIST • DEVELOPER • COMMUNITY BUILDER
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              data-cursor="pointer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#A5A5A5',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E53935';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#A5A5A5';
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} color="#E53935" />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.04)',
              paddingTop: '24px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#555555',
            }}
          >
            <span>© {new Date().getFullYear()} Harsh Jangra. All rights reserved.</span>
            <span>Crafted with Deep Black, Crimson & Architectural Motion.</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;

