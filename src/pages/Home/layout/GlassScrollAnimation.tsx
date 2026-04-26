interface Props {
  step: number;
}

const GlassScrollAnimation = ({ step }: Props) => {

  const isComplete = step >= 3;

  const lensGlowStyle = isComplete
    ? { filter: 'drop-shadow(0 0 18px rgba(135,206,235,0.45)) drop-shadow(0 0 6px rgba(47,70,94,0.3))' }
    : {};

  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
      style={{ width: 'min(72vw, 520px)' }}
    >
      <svg
        viewBox="-90 -10 680 190"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          overflow: 'visible',
          transition: 'filter 0.8s ease',
          ...lensGlowStyle,
        }}
      >
        <defs>
          <linearGradient id="lensGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2F465E" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="lensGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2F465E" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="lensShine" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left temple arm */}
        <g
          style={{
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.15s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateX(0px)' : 'translateX(-70px)',
            transformBox: 'fill-box',
            transformOrigin: 'right center',
          }}
        >
          <path
            d="M 8 68 L -82 52"
            stroke="#2F465E"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="-82" cy="52" r="4" fill="#2F465E" />
        </g>

        {/* Right temple arm */}
        <g
          style={{
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.15s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateX(0px)' : 'translateX(70px)',
            transformBox: 'fill-box',
            transformOrigin: 'left center',
          }}
        >
          <path
            d="M 492 68 L 582 52"
            stroke="#2F465E"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="582" cy="52" r="4" fill="#2F465E" />
        </g>

        {/* Left lens */}
        <g
          style={{
            transition: 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'translateX(0px) scale(1)' : 'translateX(-140px) scale(0.55)',
            transformBox: 'fill-box',
            transformOrigin: 'center center',
          }}
        >
          <rect
            x="8"
            y="8"
            width="210"
            height="148"
            rx="26"
            ry="26"
            fill="url(#lensGradLeft)"
            stroke="#2F465E"
            strokeWidth="7.5"
          />
          {/* Lens shine highlight */}
          <rect
            x="8"
            y="8"
            width="210"
            height="148"
            rx="26"
            ry="26"
            fill="url(#lensShine)"
          />
          {/* Screw top-left */}
          <circle cx="36" cy="30" r="4" fill="#2F465E" opacity="0.6" />
          {/* Screw bottom-left */}
          <circle cx="36" cy="134" r="4" fill="#2F465E" opacity="0.6" />
        </g>

        {/* Right lens */}
        <g
          style={{
            transition: 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateX(0px) scale(1)' : 'translateX(140px) scale(0.55)',
            transformBox: 'fill-box',
            transformOrigin: 'center center',
          }}
        >
          <rect
            x="282"
            y="8"
            width="210"
            height="148"
            rx="26"
            ry="26"
            fill="url(#lensGradRight)"
            stroke="#2F465E"
            strokeWidth="7.5"
          />
          {/* Lens shine highlight */}
          <rect
            x="282"
            y="8"
            width="210"
            height="148"
            rx="26"
            ry="26"
            fill="url(#lensShine)"
          />
          {/* Screw top-right */}
          <circle cx="464" cy="30" r="4" fill="#2F465E" opacity="0.6" />
          {/* Screw bottom-right */}
          <circle cx="464" cy="134" r="4" fill="#2F465E" opacity="0.6" />
        </g>

        {/* Bridge */}
        <g
          style={{
            transition: 'opacity 0.5s ease 0.25s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.25s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'scaleX(1)' : 'scaleX(0)',
            transformBox: 'fill-box',
            transformOrigin: 'center center',
          }}
        >
          <path
            d="M 218 76 C 232 54 268 54 282 76"
            stroke="#2F465E"
            strokeWidth="7.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Assembly step labels (shown only during animation, faded) */}
        {step === 1 && (
          <text
            x="113"
            y="185"
            textAnchor="middle"
            fontSize="13"
            fill="#2F465E"
            opacity="0.55"
            fontFamily="Inter, sans-serif"
            style={{ transition: 'opacity 0.4s ease' }}
          >
            left frame
          </text>
        )}
        {step === 2 && (
          <text
            x="387"
            y="185"
            textAnchor="middle"
            fontSize="13"
            fill="#2F465E"
            opacity="0.55"
            fontFamily="Inter, sans-serif"
          >
            right frame
          </text>
        )}
        {isComplete && (
          <text
            x="250"
            y="185"
            textAnchor="middle"
            fontSize="14"
            fill="#2F465E"
            opacity="0.7"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            ✦ Your style, complete ✦
          </text>
        )}
      </svg>

      {/* Floating particles when complete */}
      {isComplete && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#2F465E]"
              style={{
                width: `${4 + (i % 3)}px`,
                height: `${4 + (i % 3)}px`,
                opacity: 0.3 + i * 0.06,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 30}%`,
                animation: `float-particle ${2 + i * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassScrollAnimation;
