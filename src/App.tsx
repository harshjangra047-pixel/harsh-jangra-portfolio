import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import VFXCanvas from './components/VFXCanvas';
import BrandMarquee from './components/BrandMarquee';

import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import RawToReal from './sections/RawToReal';
import Expertise from './sections/Expertise';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('hj-preloader-seen') === 'true';
  });

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#050505',
        color: '#FFFFFF',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Cinematic Film Grain Overlay */}
      <div
        className="film-grain"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9990,
        }}
      />

      {/* Interactive VFX Particles / Crosshairs / Sparkles (As seen in Reference Video) */}
      <VFXCanvas />

      {/* Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Persistent Navigation */}
      <Navigation />

      {/* Main Experience Stream */}
      <main style={{ position: 'relative', zIndex: 3 }}>
        <Hero animationReady={preloaderComplete} />
        <BrandMarquee />
        <About />
        <Experience />
        <Projects />
        <RawToReal />
        <Expertise />
        <Education />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}

export default App;
