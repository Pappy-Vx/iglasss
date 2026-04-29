interface Props {
  step: number;
}

const GlassScrollAnimation = ({ step }: Props) => {
  const isComplete = step >= 3;

  return (
    <div
      className="fixed left-1/2 pointer-events-none select-none"
      style={{
        top: '50%',
        width: 'min(88vw, 600px)',
        transform: 'translate(-50%, -50%)',
        opacity: step === 0 ? 0 : isComplete ? 0.2 : 0.13,
        transition: 'opacity 1.1s ease',
        zIndex: 5,
        filter: isComplete
          ? 'drop-shadow(0 0 24px rgba(135,206,235,0.3)) drop-shadow(0 0 8px rgba(47,70,94,0.18))'
          : 'none',
      }}
    >
      <svg
        viewBox="-150 -5 810 190"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Left lens gradient — cool sky-glass tint */}
          <linearGradient id="gsaLensL" x1="0%" y1="0%" x2="100%" y2="110%">
            <stop offset="0%" stopColor="#c5e8f8" stopOpacity="0.38" />
            <stop offset="60%" stopColor="#7ab8d9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3a6e95" stopOpacity="0.08" />
          </linearGradient>
          {/* Right lens gradient — mirrored */}
          <linearGradient id="gsaLensR" x1="100%" y1="0%" x2="0%" y2="110%">
            <stop offset="0%" stopColor="#c5e8f8" stopOpacity="0.38" />
            <stop offset="60%" stopColor="#7ab8d9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3a6e95" stopOpacity="0.08" />
          </linearGradient>
          {/* Upper-left specular shine */}
          <radialGradient id="gsaShineL" cx="28%" cy="28%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gsaShineR" cx="28%" cy="28%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* Clip paths for shine overlay */}
          <clipPath id="clipLens1">
            <rect x="5" y="12" width="218" height="133" rx="52" ry="52" />
          </clipPath>
          <clipPath id="clipLens2">
            <rect x="287" y="12" width="218" height="133" rx="52" ry="52" />
          </clipPath>
        </defs>

        {/* ─── Left temple arm ─── */}
        <g
          style={{
            transition: 'opacity 0.6s ease 0.3s, transform 0.85s cubic-bezier(0.34,1.4,0.64,1) 0.3s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateX(0)' : 'translateX(-95px)',
            transformBox: 'fill-box',
            transformOrigin: 'right center',
          }}
        >
          {/* Temple arm — tapers slightly toward the tip */}
          <line
            x1="5" y1="64"
            x2="-140" y2="47"
            stroke="#2F465E"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Hinge — outer corner of frame */}
          <circle cx="5" cy="64" r="6.2" fill="#2F465E" />
          <circle cx="5" cy="64" r="2.6" fill="#fff" opacity="0.45" />
          {/* End cap tip */}
          <circle cx="-140" cy="47" r="3.5" fill="#2F465E" opacity="0.5" />
        </g>

        {/* ─── Left lens ─── */}
        <g
          style={{
            /*
             * Flip-in from left: lens starts as an edge-on sliver (scaleX 0.08)
             * offset to the left, then expands into position — gives a "turn to face
             * you" depth illusion without needing real 3D transforms.
             */
            transition: 'opacity 1s cubic-bezier(0.34,1.56,0.64,1), transform 1s cubic-bezier(0.34,1.56,0.64,1)',
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1
              ? 'translateX(0) scaleX(1)'
              : 'translateX(-105px) scaleX(0.08)',
            transformBox: 'fill-box',
            transformOrigin: 'center center',
          }}
        >
          {/* Main lens body */}
          <rect
            x="5" y="12" width="218" height="133"
            rx="52" ry="52"
            fill="url(#gsaLensL)"
            stroke="#2F465E"
            strokeWidth="4"
          />
          {/* Specular shine clipped to lens shape */}
          <g clipPath="url(#clipLens1)">
            <rect x="5" y="12" width="218" height="133"
              rx="52" ry="52"
              fill="url(#gsaShineL)"
            />
          </g>
          {/* Frame screws */}
          <circle cx="40" cy="33" r="2.8" fill="#2F465E" opacity="0.48" />
          <circle cx="40" cy="124" r="2.8" fill="#2F465E" opacity="0.48" />
        </g>

        {/* ─── Bridge ─── */}
        <g
          style={{
            transition: 'opacity 0.4s ease 0.35s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.35s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'scaleX(1)' : 'scaleX(0)',
            transformBox: 'fill-box',
            transformOrigin: 'center center',
          }}
        >
          <path
            d="M 223 80 C 237 55 273 55 287 80"
            stroke="#2F465E"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ─── Right lens ─── */}
        <g
          style={{
            transition: 'opacity 1s cubic-bezier(0.34,1.56,0.64,1), transform 1s cubic-bezier(0.34,1.56,0.64,1)',
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2
              ? 'translateX(0) scaleX(1)'
              : 'translateX(105px) scaleX(0.08)',
            transformBox: 'fill-box',
            transformOrigin: 'center center',
          }}
        >
          <rect
            x="287" y="12" width="218" height="133"
            rx="52" ry="52"
            fill="url(#gsaLensR)"
            stroke="#2F465E"
            strokeWidth="4"
          />
          <g clipPath="url(#clipLens2)">
            <rect x="287" y="12" width="218" height="133"
              rx="52" ry="52"
              fill="url(#gsaShineR)"
            />
          </g>
          <circle cx="470" cy="33" r="2.8" fill="#2F465E" opacity="0.48" />
          <circle cx="470" cy="124" r="2.8" fill="#2F465E" opacity="0.48" />
        </g>

        {/* ─── Right temple arm ─── */}
        <g
          style={{
            transition: 'opacity 0.6s ease 0.3s, transform 0.85s cubic-bezier(0.34,1.4,0.64,1) 0.3s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateX(0)' : 'translateX(95px)',
            transformBox: 'fill-box',
            transformOrigin: 'left center',
          }}
        >
          <line
            x1="505" y1="64"
            x2="650" y2="47"
            stroke="#2F465E"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="505" cy="64" r="6.2" fill="#2F465E" />
          <circle cx="505" cy="64" r="2.6" fill="#fff" opacity="0.45" />
          <circle cx="650" cy="47" r="3.5" fill="#2F465E" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default GlassScrollAnimation;
