import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { navItems } from '../data/portfolio';

// ─── Color & Style Tokens ───────────────────────────────────────────────────
const COLORS = {
  black: '#050505',
  red: '#E53935',
  white: '#FFFFFF',
  grey: '#A5A5A5',
} as const;

const FONTS = {
  logo: "'Bebas Neue', cursive",
  nav: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
} as const;

const SCROLL_THRESHOLD = 100;
const NAV_HEIGHT = 60;

// ─── Navigation Component ───────────────────────────────────────────────────
const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  // ─── Responsive Check ──────────────────────────────────────────────────
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ─── Scroll Detection ──────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Active Section via IntersectionObserver ────────────────────────────
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    // Observe all sections referenced in navItems
    navItems.forEach((item) => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current!.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // ─── Body Scroll Lock ──────────────────────────────────────────────────
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  // ─── Mobile Menu GSAP Animations ───────────────────────────────────────
  useEffect(() => {
    gsapCtxRef.current = gsap.context(() => {});
    return () => {
      gsapCtxRef.current?.revert();
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        // Animate overlay in
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, visibility: 'hidden' },
          {
            opacity: 1,
            visibility: 'visible',
            duration: 0.4,
            ease: 'power3.out',
          }
        );

        // Staggered entrance for menu items
        gsap.fromTo(
          menuItemsRef.current.filter(Boolean),
          {
            y: 60,
            opacity: 0,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      } else {
        // Animate overlay out
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (mobileMenuRef.current) {
              gsap.set(mobileMenuRef.current, { visibility: 'hidden' });
            }
          },
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // ─── Hamburger Animation ───────────────────────────────────────────────
  useEffect(() => {
    if (!hamburgerRef.current) return;

    const lines = hamburgerRef.current.querySelectorAll('span');
    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.to(lines[0], {
          y: 8,
          rotate: 45,
          duration: 0.35,
          ease: 'power2.inOut',
        });
        gsap.to(lines[1], {
          opacity: 0,
          scaleX: 0,
          duration: 0.2,
          ease: 'power2.in',
        });
        gsap.to(lines[2], {
          y: -8,
          rotate: -45,
          duration: 0.35,
          ease: 'power2.inOut',
        });
      } else {
        gsap.to(lines[0], {
          y: 0,
          rotate: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        });
        gsap.to(lines[1], {
          opacity: 1,
          scaleX: 1,
          duration: 0.2,
          delay: 0.1,
          ease: 'power2.out',
        });
        gsap.to(lines[2], {
          y: 0,
          rotate: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        });
      }
    }, hamburgerRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // ─── Smooth Scroll Handler ─────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - NAV_HEIGHT;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen]
  );

  // ─── Scroll to Top (Logo Click) ────────────────────────────────────────
  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  // ─── Styles ────────────────────────────────────────────────────────────
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: NAV_HEIGHT,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '16px 20px' : '16px 40px',
    boxSizing: 'border-box',
    transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
    backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.92)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
    boxShadow: isScrolled ? '0 1px 0 rgba(255,255,255,0.04)' : 'none',
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: FONTS.logo,
    fontSize: '28px',
    fontWeight: 400,
    color: COLORS.red,
    cursor: 'pointer',
    letterSpacing: '3px',
    lineHeight: 1,
    userSelect: 'none',
    transition: 'opacity 0.3s ease',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
  };

  const desktopLinksContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  // ─── Desktop Link Component ────────────────────────────────────────────
  const DesktopNavLink: React.FC<{
    item: { label: string; href: string };
    isActive: boolean;
  }> = ({ item, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);

    const linkStyle: React.CSSProperties = {
      fontFamily: FONTS.nav,
      fontSize: '13px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: isActive ? COLORS.white : isHovered ? COLORS.red : COLORS.grey,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 0',
    };

    const dotStyle: React.CSSProperties = {
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      backgroundColor: COLORS.red,
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: isActive ? 1 : 0,
      scale: isActive ? '1' : '0',
    };

    return (
      <a
        href={item.href}
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => handleNavClick(e, item.href)}
      >
        {item.label}
        <span style={dotStyle} />
      </a>
    );
  };

  // ─── Hamburger Button ──────────────────────────────────────────────────
  const hamburgerLineBase: React.CSSProperties = {
    display: 'block',
    width: '24px',
    height: '2px',
    backgroundColor: COLORS.white,
    borderRadius: '1px',
    transformOrigin: 'center center',
    transition: 'background-color 0.3s ease',
  };

  const hamburgerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'flex-end',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '8px',
    margin: '-8px',
    zIndex: 102,
    position: 'relative',
  };

  // ─── Mobile Menu Overlay ───────────────────────────────────────────────
  const mobileOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(5, 5, 5, 0.98)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    opacity: 0,
    visibility: 'hidden' as const,
  };

  const mobileLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: FONTS.nav,
    fontSize: '32px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '6px',
    color: isActive ? COLORS.red : COLORS.white,
    textDecoration: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    display: 'block',
    textAlign: 'center',
    perspective: '800px',
  });

  return (
    <>
      <nav ref={navRef} style={navStyle} role="navigation" aria-label="Main navigation">
        {/* ─── Logo ─────────────────────────────────────────────────────── */}
        <button
          style={logoStyle}
          onClick={handleLogoClick}
          aria-label="Scroll to top"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
        >
          HJ
        </button>

        {/* ─── Desktop Navigation Links ─────────────────────────────────── */}
        {!isMobile && (
          <div style={desktopLinksContainerStyle}>
            {navItems.map((item) => (
              <DesktopNavLink
                key={item.label}
                item={item}
                isActive={activeSection === item.href.replace('#', '')}
              />
            ))}
          </div>
        )}

        {/* ─── Mobile Hamburger ─────────────────────────────────────────── */}
        {isMobile && (
          <button
            ref={hamburgerRef}
            style={hamburgerStyle}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span style={{ ...hamburgerLineBase, width: '24px' }} />
            <span style={{ ...hamburgerLineBase, width: '18px' }} />
            <span style={{ ...hamburgerLineBase, width: '24px' }} />
          </button>
        )}
      </nav>

      {/* ─── Mobile Menu Overlay ──────────────────────────────────────── */}
      {isMobile && (
        <div ref={mobileMenuRef} style={mobileOverlayStyle} aria-hidden={!isMobileMenuOpen}>
          {navItems.map((item, index) => (
            <a
              key={item.label}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              href={item.href}
              style={mobileLinkStyle(activeSection === item.href.replace('#', ''))}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={(e) => {
                if (activeSection !== item.href.replace('#', '')) {
                  (e.currentTarget as HTMLAnchorElement).style.color = COLORS.red;
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.href.replace('#', '')) {
                  (e.currentTarget as HTMLAnchorElement).style.color = COLORS.white;
                }
              }}
            >
              {item.label}
            </a>
          ))}

          {/* ─── Mobile Menu Footer ─────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: FONTS.body,
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(165, 165, 165, 0.4)',
            }}
          >
            Harsh Jangra © {new Date().getFullYear()}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
