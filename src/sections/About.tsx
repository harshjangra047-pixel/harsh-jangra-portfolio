import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, photos } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const mountainImgRef = useRef<HTMLDivElement>(null);
  const indoorImgRef = useRef<HTMLDivElement>(null);
  const riverImgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: labelRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Red line expand
      if (redLineRef.current) {
        gsap.fromTo(
          redLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: redLineRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Heading characters stagger in
      if (headingRef.current) {
        const text = headingRef.current.textContent || '';
        headingRef.current.innerHTML = '';
        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          headingRef.current!.appendChild(span);
          return span;
        });

        gsap.fromTo(
          chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Paragraph stagger fade-up
      paragraphRefs.current.forEach((p, i) => {
        if (!p) return;
        gsap.fromTo(
          p,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Mountain photo clip-path reveal
      if (mountainImgRef.current) {
        gsap.fromTo(
          mountainImgRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: mountainImgRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Caption fade
      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: captionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Indoor photo clip-path reveal + parallax
      if (indoorImgRef.current) {
        gsap.fromTo(
          indoorImgRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: indoorImgRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Parallax only on desktop
        if (!isMobile) {
          const imgEl = indoorImgRef.current.querySelector('img');
          if (imgEl) {
            gsap.to(imgEl, {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: indoorImgRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            });
          }
        }
      }

      // River photo clip-path reveal
      if (riverImgRef.current) {
        gsap.fromTo(
          riverImgRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: riverImgRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Quote — words fade in sequentially
      if (quoteRef.current) {
        const quoteHTML = quoteRef.current.innerHTML;
        // We need to parse and wrap each word
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = quoteHTML;

        const wrapWords = (node: Node): string => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            return text
              .split(/(\s+)/)
              .map((word) => {
                if (word.trim() === '') return word;
                return `<span class="quote-word" style="display:inline-block;opacity:0;transform:translateY(14px)">${word}</span>`;
              })
              .join('');
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName.toLowerCase();
            const attrs = Array.from(el.attributes)
              .map((a) => `${a.name}="${a.value}"`)
              .join(' ');
            const inner = Array.from(el.childNodes).map(wrapWords).join('');
            return `<${tag} ${attrs}>${inner}</${tag}>`;
          }
          return '';
        };

        const wrappedHTML = Array.from(tempDiv.childNodes).map(wrapWords).join('');
        quoteRef.current.innerHTML = wrappedHTML;

        const words = quoteRef.current.querySelectorAll('.quote-word');
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const paragraphs = personalInfo.aboutText.split('\n\n');

  // Render the quote with "digital experiences" highlighted
  const renderQuote = () => {
    const statement = personalInfo.brandStatement;
    const highlightPhrase = 'digital experiences';
    const idx = statement.indexOf(highlightPhrase);
    if (idx === -1) return statement;
    const before = statement.slice(0, idx);
    const after = statement.slice(idx + highlightPhrase.length);
    return (
      <>
        {before}
        <span style={{ color: '#E53935' }}>{highlightPhrase}</span>
        {after}
      </>
    );
  };

  // ── Styles ──────────────────────────────────────────────
  const styles: Record<string, React.CSSProperties> = {
    section: {
      position: 'relative',
      background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      padding: isMobile ? '80px 0' : '120px 0',
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1340px',
      margin: '0 auto',
      padding: isMobile ? '0 24px' : '0 48px',
    },
    headerArea: {
      marginBottom: isMobile ? '48px' : '72px',
    },
    label: {
      display: 'block',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '11px',
      textTransform: 'uppercase' as const,
      letterSpacing: '4px',
      color: '#A5A5A5',
      marginBottom: '20px',
      opacity: 0,
    },
    redLine: {
      width: '60px',
      height: '2px',
      background: '#E53935',
      marginBottom: '20px',
    },
    heading: {
      fontFamily: "'Bebas Neue', cursive",
      fontSize: 'clamp(48px, 8vw, 120px)',
      color: '#FFFFFF',
      lineHeight: 1.05,
      letterSpacing: '2px',
      margin: 0,
      overflow: 'hidden',
    },
    editorialGrid: {
      display: isMobile ? 'flex' : 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '55% 45%',
      gap: isMobile ? '48px' : '60px',
      flexDirection: isMobile ? ('column' as const) : undefined,
      marginBottom: isMobile ? '56px' : '96px',
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0',
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: isMobile ? '32px' : '40px',
      paddingTop: isMobile ? '0' : '40px',
    },
    paragraph: {
      fontFamily: "'Inter', sans-serif",
      fontSize: isMobile ? '15px' : '17px',
      lineHeight: 1.8,
      color: '#A5A5A5',
      margin: '0 0 24px 0',
      opacity: 0,
    },
    mountainFrame: {
      position: 'relative' as const,
      marginTop: '40px',
      borderLeft: '3px solid #E53935',
      overflow: 'hidden',
    },
    mountainAspect: {
      position: 'relative' as const,
      width: '100%',
      aspectRatio: '16 / 10',
      overflow: 'hidden',
    },
    mountainImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      display: 'block',
    },
    mountainCaption: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '11px',
      fontStyle: 'italic',
      color: '#666',
      marginTop: '12px',
      paddingLeft: '16px',
      opacity: 0,
    },
    indoorFrame: {
      position: 'relative' as const,
      overflow: 'hidden',
      width: '100%',
      aspectRatio: isMobile ? '3 / 4' : '3 / 4.2',
    },
    indoorImg: {
      width: '100%',
      height: '120%',
      objectFit: 'cover' as const,
      display: 'block',
      objectPosition: 'center top',
    },
    indoorGlow: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      background: 'linear-gradient(to top, rgba(229,57,53,0.1), transparent)',
      pointerEvents: 'none' as const,
      zIndex: 2,
    },
    riverFrame: {
      position: 'relative' as const,
      overflow: 'hidden',
      width: isMobile ? '100%' : '85%',
      marginLeft: isMobile ? '0' : 'auto',
      transform: isMobile ? 'none' : 'rotate(1.5deg)',
      borderRadius: '2px',
      aspectRatio: '4 / 3',
    },
    riverImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      display: 'block',
    },
    quoteSection: {
      textAlign: 'center' as const,
      maxWidth: '900px',
      margin: '0 auto',
      padding: isMobile ? '0 24px' : '0 48px',
    },
    quoteText: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 'clamp(24px, 3vw, 40px)',
      color: '#FFFFFF',
      lineHeight: 1.4,
      fontWeight: 500,
      margin: 0,
    },
  };

  return (
    <section ref={sectionRef} id="about" style={styles.section}>
      <div style={styles.container}>
        {/* ── Header ── */}
        <div style={styles.headerArea}>
          <span ref={labelRef} style={styles.label}>
            ABOUT
          </span>
          <div ref={redLineRef} style={styles.redLine} />
          <h2 ref={headingRef} style={styles.heading}>
            BEYOND THE CODE.
          </h2>
        </div>

        {/* ── Editorial Grid ── */}
        <div style={styles.editorialGrid}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                ref={(el) => {
                  paragraphRefs.current[i] = el;
                }}
                style={styles.paragraph}
              >
                {text}
              </p>
            ))}

            {/* Mountain Photo */}
            <div style={styles.mountainFrame}>
              <div ref={mountainImgRef} style={styles.mountainAspect}>
                <img
                  src={photos.mountain}
                  alt="Somewhere in the mountains — India"
                  style={styles.mountainImg}
                  loading="lazy"
                />
              </div>
            </div>
            <span ref={captionRef} style={styles.mountainCaption}>
              Somewhere in the mountains — India
            </span>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            {/* Indoor Photo */}
            <div ref={indoorImgRef} style={styles.indoorFrame}>
              <img
                src={photos.indoor}
                alt="Harsh Jangra — Indoor"
                style={styles.indoorImg}
                loading="lazy"
              />
              <div style={styles.indoorGlow} />
            </div>

            {/* River Photo */}
            <div ref={riverImgRef} style={styles.riverFrame}>
              <img
                src={photos.river}
                alt="By the river"
                style={styles.riverImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ── Quote ── */}
        <div style={styles.quoteSection}>
          <p ref={quoteRef} style={styles.quoteText}>
            {renderQuote()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
