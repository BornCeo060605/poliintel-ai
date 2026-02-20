'use client';

/**
 * Animated flowing lines in brand colors (blue/green) for the hero.
 */
export function FlowingLines() {
  const paths = [
    'M -200 120 Q 200 60 600 140 T 1000 80 T 1400 160 T 2000 100',
    'M -150 200 Q 250 160 650 240 T 1050 180 T 1450 260 T 2050 200',
    'M -100 280 Q 300 240 700 320 T 1100 280 T 1500 360 T 2100 300',
    'M -250 60 Q 150 20 550 100 T 950 40 T 1350 120 T 1950 60',
    'M -180 340 Q 220 300 620 380 T 1020 320 T 1420 400 T 2020 340',
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 1800 450"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="heroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path
            key={i}
            fill="none"
            stroke={i % 2 === 0 ? 'url(#heroGrad1)' : 'url(#heroGrad2)'}
            strokeWidth="1.2"
            strokeLinecap="round"
            d={d}
            style={{
              animation: `flow ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
