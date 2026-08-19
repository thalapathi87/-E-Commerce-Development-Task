function LogoAbirami() {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 transition-transform duration-300 hover:scale-110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="abirami-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="abirami-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M20 20
             C 18 16, 10 12, 10 20
             C 10 28, 18 26, 20 20
             C 22 16, 30 16, 30 20
             C 30 24, 22 26, 20 20 Z"
          fill="url(#abirami-gradient)"
          filter="url(#abirami-glow)"
        />

        <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

export default LogoAbirami;
