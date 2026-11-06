import React from 'react';

const BrandMarquee: React.FC = () => {
  const items = [
    'TULSA WEARS',
    'GOOGLE DEVELOPER GROUPS',
    'GOOGLE STUDENT AMBASSADOR 2026',
    'TEAM GEMINI SOLUTIONS',
    'SMART INDIA HACKATHON FINALIST',
    'ORACLE AI AGENT STUDIO',
    'ANTHROPIC CLAUDE',
    'CCET CHANDIGARH',
  ];

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#080808',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '20px 0',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {/* Edge gradient shadows */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120px',
          height: '100%',
          background: 'linear-gradient(to right, #050505, transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '100%',
          background: 'linear-gradient(to left, #050505, transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 48px;
          animation: marqueeScroll 28s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: idx % 2 === 0 ? '#FFFFFF' : '#888888',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E53935')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = idx % 2 === 0 ? '#FFFFFF' : '#888888')
              }
            >
              {text}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                backgroundColor: '#E53935',
                transform: 'rotate(45deg)',
                boxShadow: '0 0 8px rgba(229, 57, 53, 0.8)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;

