import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

/* ─── helpers ─── */
const splitChars = (text: string) =>
  text.split('').map((ch, i) => (
    <span
      key={i}
      className="char"
      style={{ display: 'inline-block', opacity: 0, transform: 'translateY(40px)' }}
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

/* ─── Featured Placeholder Image ─── */
const FeaturedPlaceholder: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: 340,
      background: `
        linear-gradient(135deg, #101010 0%, #0d0d0d 40%, #101010 100%),
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 20px,
          rgba(229,57,53,0.03) 20px,
          rgba(229,57,53,0.03) 21px
        )
      `,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* diagonal stripe overlay */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 28px,
          rgba(229,57,53,0.025) 28px,
          rgba(229,57,53,0.025) 29px
        )`,
      }}
    />
    {/* radial vignette */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, #101010 100%)',
      }}
    />
    <span
      style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 'clamp(42px, 5vw, 72px)',
        color: '#fff',
        letterSpacing: 6,
        position: 'relative',
        zIndex: 1,
      }}
    >
      TULSA WEARS
    </span>
    <span
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 11,
        color: '#E53935',
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginTop: 8,
        position: 'relative',
        zIndex: 1,
      }}
    >
      E-Commerce Platform
    </span>
  </div>
);

/* ─── Standard Placeholder Image ─── */
const StandardPlaceholder: React.FC<{ title: string; accent: string }> = ({ title, accent }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: 200,
      background: `linear-gradient(135deg, #101010 0%, #0c0c0c 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        border: '1px solid #222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        background: 'rgba(229,57,53,0.04)',
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 20,
          color: '#E53935',
          letterSpacing: 1,
        }}
      >
        {accent}
      </span>
    </div>
    <span
      style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 22,
        color: '#fff',
        letterSpacing: 3,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {title}
    </span>
  </div>
);

/* ─── Link Button ─── */
const LinkButton: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 24px',
        border: `1px solid ${hovered ? '#E53935' : '#333'}`,
        borderRadius: 0,
        color: hovered ? '#E53935' : '#ccc',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 11,
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        textDecoration: 'none',
        transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        background: hovered ? 'rgba(229,57,53,0.06)' : 'transparent',
      }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
};

/* ─── Tech Tag ─── */
const TechTag: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="tech-tag"
    style={{
      display: 'inline-block',
      border: '1px solid #333',
      padding: '4px 12px',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 11,
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
      color: '#888',
      transition: 'all 0.3s ease',
    }}
  >
    {label}
  </span>
);

/* ═══════════════════════════════════════════════════
   FEATURED PROJECT CARD
   ═══════════════════════════════════════════════════ */
const FeaturedCard: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 3,
      rotateX: -y * 3,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, []);

  const features = project.features.slice(0, 8);

  return (
    <div
      ref={cardRef}
      className="featured-card"
      data-cursor="view"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: '#0a0a0a',
        border: `1px solid ${hovered ? 'rgba(229,57,53,0.3)' : '#1a1a1a'}`,
        padding: 0,
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transform: hovered ? 'scale(1.01)' : 'scale(1)',
        transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
        boxShadow: hovered ? '0 0 40px rgba(229,57,53,0.06)' : 'none',
        willChange: 'transform',
      }}
    >
      {/* Watermark Number */}
      <span
        style={{
          position: 'absolute',
          top: -20,
          right: 20,
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(120px, 12vw, 200px)',
          color: 'rgba(229,57,53,0.08)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {project.number}
      </span>

      {/* Layout Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 45%, 560px) 1fr',
          gap: 0,
          position: 'relative',
          zIndex: 1,
        }}
        className="featured-grid"
      >
        {/* Image Area */}
        <div
          ref={imgRef}
          style={{
            overflow: 'hidden',
            borderRight: '1px solid #1a1a1a',
          }}
        >
          <div
            style={{
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <FeaturedPlaceholder />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(28px, 3vw, 48px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Category */}
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              letterSpacing: 4,
              textTransform: 'uppercase' as const,
              color: '#E53935',
            }}
          >
            {project.category.toUpperCase()}
          </span>

          {/* Title */}
          <h3
            ref={titleRef}
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(36px, 4vw, 48px)',
              color: '#fff',
              margin: 0,
              letterSpacing: 2,
              lineHeight: 1.1,
              transform: hovered ? 'translateX(6px)' : 'translateX(0)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {project.title.toUpperCase()}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              lineHeight: 1.7,
              color: '#A5A5A5',
              margin: 0,
              maxWidth: 520,
            }}
          >
            {project.description}
          </p>

          {/* Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px 20px',
              marginTop: 4,
            }}
            className="features-grid"
          >
            {features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#E53935',
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: '#777',
                    lineHeight: 1.5,
                  }}
                >
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 8,
            }}
          >
            {project.tech.map((t, i) => (
              <TechTag key={i} label={t} />
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <LinkButton href={project.liveLink} label="View Project" />
            <LinkButton href={project.githubLink} label="GitHub" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   STANDARD PROJECT CARD
   ═══════════════════════════════════════════════════ */
const StandardCard: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 3,
      rotateX: -y * 3,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, []);

  const placeholderAccent =
    project.number === '02' ? '📝' : project.number === '03' ? 'PY' : project.number;

  return (
    <div
      ref={cardRef}
      className="standard-card"
      data-cursor="view"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: '#0a0a0a',
        border: `1px solid ${hovered ? 'rgba(229,57,53,0.3)' : '#1a1a1a'}`,
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transform: hovered ? 'scale(1.01)' : 'scale(1)',
        transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
        boxShadow: hovered ? '0 0 30px rgba(229,57,53,0.05)' : 'none',
        willChange: 'transform',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Watermark Number */}
      <span
        style={{
          position: 'absolute',
          top: -10,
          right: 14,
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 100,
          color: 'rgba(229,57,53,0.08)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {project.number}
      </span>

      {/* Image */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid #1a1a1a', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <StandardPlaceholder title={project.title.toUpperCase()} accent={placeholderAccent} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: 'clamp(20px, 2vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Category */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
            color: '#E53935',
          }}
        >
          {project.category.toUpperCase()}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(26px, 3vw, 34px)',
            color: '#fff',
            margin: 0,
            letterSpacing: 2,
            lineHeight: 1.1,
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {project.title.toUpperCase()}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            lineHeight: 1.65,
            color: '#A5A5A5',
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
          {project.tech.map((t, i) => (
            <TechTag key={i} label={t} />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <LinkButton href={project.liveLink} label="View Project" />
          <LinkButton href={project.githubLink} label="GitHub" />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── heading char stagger ── */
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.025,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* ── featured card ── */
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { y: 80, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        /* tech tags inside featured */
        const featuredTags = featuredRef.current.querySelectorAll('.tech-tag');
        if (featuredTags.length) {
          gsap.fromTo(
            featuredTags,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: featuredRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      /* ── standard cards stagger ── */
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.standard-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        /* tech tags inside standard cards */
        const stdTags = gridRef.current.querySelectorAll('.tech-tag');
        if (stdTags.length) {
          gsap.fromTo(
            stdTags,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.find((p) => p.isFeatured);
  const standard = projects.filter((p) => !p.isFeatured);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        background: '#050505',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ─── Header ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: 'uppercase' as const,
              color: '#666',
            }}
          >
            PROJECTS
          </span>
          <div style={{ width: 60, height: 2, background: '#E53935' }} />
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(48px, 7vw, 100px)',
            color: '#fff',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: 2,
          }}
        >
          {splitChars('SELECTED WORKS.')}
        </h2>
      </div>

      {/* ─── Featured Project ─── */}
      {featured && (
        <div ref={featuredRef} style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 'clamp(28px, 3vw, 48px)' }}>
          <FeaturedCard project={featured} />
        </div>
      )}

      {/* ─── Standard Cards Grid ─── */}
      <div
        ref={gridRef}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(16px, 2vw, 28px)',
        }}
      >
        {standard.map((p) => (
          <StandardCard key={p.id} project={p} />
        ))}
      </div>

      {/* ─── Responsive Styles ─── */}
      <style>{`
        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid #1a1a1a;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
