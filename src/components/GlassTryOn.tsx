import React, { useEffect, useRef, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { useSearchParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { FiCamera, FiRefreshCw } from 'react-icons/fi';
import type { Results } from '@mediapipe/face_mesh';
import glass_product from '../assets/items/glass_product';

// ─── Drawing types ────────────────────────────────────────────────────────────

interface DrawStyle {
  frameColor: string;
  lensColor:  string;
  shape: 'rect' | 'round' | 'aviator' | 'browline';
}

// Map each product id → a drawing style derived from its brand/type
const PRODUCT_DRAW_STYLE: Record<number, DrawStyle> = {
  1:  { frameColor: '#1a1a1a', lensColor: 'rgba(150,185,215,0.14)', shape: 'browline' }, // Clubmaster
  2:  { frameColor: '#3a3a3a', lensColor: 'rgba(100,149,237,0.12)', shape: 'rect'     }, // Zeelool Square
  3:  { frameColor: '#B8960C', lensColor: 'rgba(144,238,180,0.14)', shape: 'round'    }, // Minguela
  4:  { frameColor: '#8B4A8B', lensColor: 'rgba(221,160,221,0.15)', shape: 'rect'     }, // Ralph Lauren
  5:  { frameColor: '#A8A9AD', lensColor: 'rgba(135,206,235,0.13)', shape: 'rect'     }, // Ray-Ban RX6335
  6:  { frameColor: '#1a1a1a', lensColor: 'rgba(0,0,0,0.78)',       shape: 'rect'     }, // Prada sunglasses
  7:  { frameColor: '#8B6914', lensColor: 'rgba(0,0,0,0.74)',       shape: 'rect'     }, // Gucci sunglasses
  8:  { frameColor: '#111111', lensColor: 'rgba(200,150,220,0.72)', shape: 'rect'     }, // D&G
  9:  { frameColor: '#111111', lensColor: 'rgba(255,215,0,0.60)',   shape: 'aviator'  }, // Maui Jim
  10: { frameColor: '#E0E0E0', lensColor: 'rgba(255,140,0,0.55)',   shape: 'aviator'  }, // Oakley
};

const TIPS = [
  'Face the camera directly in even lighting.',
  'Keep your head still for accurate tracking.',
  'Move closer if the tracking is unstable.',
];

// ─── Canvas drawing helpers ───────────────────────────────────────────────────

function traceLensPath(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  shape: DrawStyle['shape'],
) {
  const hw = w / 2;
  const hh = h / 2;
  ctx.beginPath();
  if (shape === 'round') {
    ctx.arc(x, y, Math.min(hw, hh), 0, Math.PI * 2);
  } else if (shape === 'aviator') {
    ctx.moveTo(x - hw * 0.85, y - hh * 0.52);
    ctx.bezierCurveTo(x - hw * 0.85, y - hh * 0.92, x + hw * 0.85, y - hh * 0.92, x + hw * 0.85, y - hh * 0.52);
    ctx.bezierCurveTo(x + hw, y + hh * 0.06, x + hw * 0.6, y + hh * 0.65, x, y + hh * 0.72);
    ctx.bezierCurveTo(x - hw * 0.6, y + hh * 0.65, x - hw, y + hh * 0.06, x - hw * 0.85, y - hh * 0.52);
    ctx.closePath();
  } else {
    // Rounded rectangle
    const r = hh * 0.38;
    ctx.moveTo(x - hw + r, y - hh);
    ctx.lineTo(x + hw - r, y - hh);
    ctx.arcTo(x + hw, y - hh, x + hw, y - hh + r, r);
    ctx.lineTo(x + hw, y + hh - r);
    ctx.arcTo(x + hw, y + hh, x + hw - r, y + hh, r);
    ctx.lineTo(x - hw + r, y + hh);
    ctx.arcTo(x - hw, y + hh, x - hw, y + hh - r, r);
    ctx.lineTo(x - hw, y - hh + r);
    ctx.arcTo(x - hw, y - hh, x - hw + r, y - hh, r);
    ctx.closePath();
  }
}

function drawGlasses(
  ctx:   CanvasRenderingContext2D,
  style: DrawStyle,
  cx:    number,
  cy:    number,
  span:  number,
  angle: number,
  leftEar?:  { x: number; y: number },
  rightEar?: { x: number; y: number },
) {
  const fw  = span * 1.52;
  const lw  = fw * 0.405;
  const lh  = lw * 0.66;
  const gap = fw * 0.075;
  const lcx = -(gap / 2 + lw / 2);
  const rcx =   gap / 2 + lw / 2;
  const fw3 = Math.max(3, span * 0.014);
  const lensShape: DrawStyle['shape'] = style.shape === 'browline' ? 'rect' : style.shape;

  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  // Lens outer corners in canvas space (at y=0 in rotated frame = eye level)
  const leftLocalX  = lcx - lw / 2;
  const rightLocalX = rcx + lw / 2;
  const leftCorner  = { x: cx + leftLocalX  * cosA, y: cy + leftLocalX  * sinA };
  const rightCorner = { x: cx + rightLocalX * cosA, y: cy + rightLocalX * sinA };

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Lens fills
  ctx.fillStyle = style.lensColor;
  traceLensPath(ctx, lcx, 0, lw, lh, lensShape); ctx.fill();
  traceLensPath(ctx, rcx, 0, lw, lh, lensShape); ctx.fill();

  // Frame outlines
  ctx.strokeStyle = style.frameColor;
  ctx.lineWidth   = fw3;
  ctx.lineJoin    = 'round';

  if (style.shape === 'browline') {
    // Thin wire outline
    ctx.lineWidth = fw3 * 0.45;
    traceLensPath(ctx, lcx, 0, lw, lh, 'rect'); ctx.stroke();
    traceLensPath(ctx, rcx, 0, lw, lh, 'rect'); ctx.stroke();
    // Thick brow bar (rounded top, flat bottom)
    const bh = lh * 0.44;
    const by = -lh / 2;
    const br = bh * 0.32;
    ctx.fillStyle = style.frameColor;
    for (const bx of [lcx - lw / 2, rcx - lw / 2]) {
      ctx.beginPath();
      ctx.moveTo(bx + br, by);
      ctx.lineTo(bx + lw - br, by);
      ctx.arcTo(bx + lw, by, bx + lw, by + br, br);
      ctx.lineTo(bx + lw, by + bh);
      ctx.lineTo(bx, by + bh);
      ctx.lineTo(bx, by + br);
      ctx.arcTo(bx, by, bx + br, by, br);
      ctx.closePath();
      ctx.fill();
    }
  } else {
    traceLensPath(ctx, lcx, 0, lw, lh, lensShape); ctx.stroke();
    traceLensPath(ctx, rcx, 0, lw, lh, lensShape); ctx.stroke();
  }

  // Bridge
  ctx.strokeStyle = style.frameColor;
  ctx.lineWidth   = fw3 * 0.72;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  ctx.moveTo(lcx + lw / 2, -lh * 0.08);
  ctx.bezierCurveTo(
    lcx + lw / 2 + gap * 0.3, -lh * 0.52,
    rcx - lw / 2 - gap * 0.3, -lh * 0.52,
    rcx - lw / 2, -lh * 0.08,
  );
  ctx.stroke();

  ctx.restore();

  // Temple arms drawn in canvas space so they reach the actual ear/temple area
  ctx.strokeStyle = style.frameColor;
  ctx.lineWidth   = fw3 * 0.85;
  ctx.lineCap     = 'round';

  const drawTemple = (
    start: { x: number; y: number },
    end:   { x: number; y: number },
  ) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(
      start.x + dx * 0.45, start.y + dy * 0.05,
      start.x + dx * 0.85, start.y + dy * 0.55,
      end.x, end.y,
    );
    ctx.stroke();
  };

  if (leftEar && rightEar) {
    drawTemple(leftCorner, leftEar);
    drawTemple(rightCorner, rightEar);
  } else {
    // Fallback for preview: extend outward along the frame axis, curving slightly down
    const tlen = lw * 1.1;
    drawTemple(leftCorner,  { x: leftCorner.x  - cosA * tlen, y: leftCorner.y  - sinA * tlen + lh * 0.32 });
    drawTemple(rightCorner, { x: rightCorner.x + cosA * tlen, y: rightCorner.y + sinA * tlen + lh * 0.32 });
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

const GlassTryOn: React.FC = () => {
  const [searchParams]  = useSearchParams();
  const initialProduct  = Number(searchParams.get('product')) || glass_product[0].id;

  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const cameraRef   = useRef<Camera | null>(null);
  const mountedRef  = useRef(true);
  const selectedRef = useRef<number>(initialProduct);

  const [selectedId,    setSelectedId]    = useState<number>(initialProduct);
  const [isLoading,     setIsLoading]     = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [faceDetected,  setFaceDetected]  = useState(false);
  const [modelsReady,   setModelsReady]   = useState(false);

  const selectProduct = (id: number) => {
    setSelectedId(id);
    selectedRef.current = id;
  };

  // Draw a centred preview so user can see the glasses before face is tracked
  const drawPreview = (ctx: CanvasRenderingContext2D) => {
    const style = PRODUCT_DRAW_STYLE[selectedRef.current] ?? PRODUCT_DRAW_STYLE[1];
    drawGlasses(ctx, style, 320, 240, 180, 0);
  };

  useEffect(() => {
    mountedRef.current = true;
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;

    const W = 640, H = 480;
    canvas.width  = W;
    canvas.height = H;

    // Draw preview immediately so the canvas is visibly active
    const ctx = canvas.getContext('2d');
    if (ctx) drawPreview(ctx);

    const faceMesh = new FaceMesh({
      locateFile: (f) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${f}`,
    });

    faceMesh.setOptions({
      maxNumFaces:            1,
      refineLandmarks:        true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence:  0.5,
    });

    faceMesh.onResults((results: Results) => {
      if (!mountedRef.current) return;
      const ctx2 = canvas.getContext('2d');
      if (!ctx2) return;

      if (!modelsReady) setModelsReady(true);

      ctx2.clearRect(0, 0, W, H);

      const hasFace = !!(results.multiFaceLandmarks?.length);
      setFaceDetected(hasFace);

      if (!hasFace) {
        // Still draw the preview so the canvas looks active
        drawPreview(ctx2);
        return;
      }

      const lm   = results.multiFaceLandmarks[0];
      const lEye = lm[33];    // user's left-eye outer corner
      const rEye = lm[263];   // user's right-eye outer corner

      // Flip X to match CSS-mirrored video (selfie mode)
      const lx = (1 - lEye.x) * W;
      const ly = lEye.y * H;
      const rx = (1 - rEye.x) * W;
      const ry = rEye.y * H;

      const cx    = (lx + rx) / 2;
      const cy    = (ly + ry) / 2;
      const dx    = rx - lx;
      const dy    = ry - ly;
      const span  = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Face boundary landmarks — temple/ear area (flipped for mirror)
      const leftEar  = { x: (1 - lm[234].x) * W, y: lm[234].y * H };
      const rightEar = { x: (1 - lm[454].x) * W, y: lm[454].y * H };

      const style = PRODUCT_DRAW_STYLE[selectedRef.current] ?? PRODUCT_DRAW_STYLE[1];
      drawGlasses(ctx2, style, cx, cy, span, angle, leftEar, rightEar);
    });

    const cam = new Camera(video, {
      onFrame: async () => { await faceMesh.send({ image: video }); },
      width: W,
      height: H,
    });
    cameraRef.current = cam;

    cam.start()
      .then(() => { if (mountedRef.current) { setHasPermission(true); setIsLoading(false); } })
      .catch(() => { if (mountedRef.current) { setHasPermission(false); setIsLoading(false); } });

    return () => {
      mountedRef.current = false;
      faceMesh.close();
      cameraRef.current?.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw preview whenever selected product changes (before face is detected)
  useEffect(() => {
    if (faceDetected) return;
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPreview(ctx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, faceDetected]);

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-[#0A1D37]">
        {/* Page header */}
        <div className="text-white py-10 px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-3 block">
            Augmented Reality
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Virtual Try-On</h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Pick any frame from our collection and see it on your face in real time.
          </p>
        </div>

        <div className="max-w-[960px] mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Camera + canvas */}
            <div className="lg:col-span-2">
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-[4/3]">

                {/* Loading overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A1D37]/80 text-white z-30 gap-3">
                    <FiCamera className="w-10 h-10 animate-pulse" />
                    <p className="text-sm">Starting camera…</p>
                  </div>
                )}

                {/* Permission denied */}
                {hasPermission === false && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A1D37] text-white z-30 p-6 text-center">
                    <FiCamera className="w-12 h-12 mb-4 text-red-400" />
                    <h3 className="font-bold text-lg mb-2">Camera Access Denied</h3>
                    <p className="text-sm text-white/60 mb-4">
                      Allow camera access in your browser settings then reload.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex items-center gap-2 bg-white text-[#0A1D37] font-semibold px-5 py-2.5 rounded-full text-sm"
                    >
                      <FiRefreshCw className="w-4 h-4" /> Retry
                    </button>
                  </div>
                )}

                {/* Mirrored video — selfie mode */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                  playsInline
                  autoPlay
                  muted
                />

                {/* Glasses overlay — z-10 ensures it sits above the video */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 10 }}
                />

                {/* Face tracking status badge */}
                {!isLoading && hasPermission && (
                  <div
                    className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                    style={{
                      zIndex: 20,
                      background: faceDetected ? 'rgba(34,197,94,0.85)' : 'rgba(251,191,36,0.85)',
                      color: '#fff',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: faceDetected ? '#fff' : '#fff', opacity: 0.9 }}
                    />
                    {faceDetected
                      ? 'Face tracked'
                      : modelsReady
                        ? 'No face detected — look at the camera'
                        : 'Loading face detection…'}
                  </div>
                )}
              </div>
            </div>

            {/* Product selector sidebar */}
            <div className="flex flex-col gap-4">
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="text-white text-sm font-bold mb-3">Try Our Frames</h3>
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {glass_product.map((product) => {
                    const style = PRODUCT_DRAW_STYLE[product.id];
                    const isSelected = selectedId === product.id;
                    return (
                      <button
                        key={product.id}
                        onClick={() => selectProduct(product.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                          isSelected
                            ? 'bg-white text-[#0A1D37]'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {/* Product thumbnail */}
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold leading-tight line-clamp-2">
                            {product.name}
                          </p>
                          {style && (
                            <div className="flex items-center gap-1 mt-1">
                              <span
                                className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0"
                                style={{ background: style.frameColor }}
                              />
                              <span className={`text-[10px] capitalize ${isSelected ? 'text-[#2F465E]' : 'text-white/50'}`}>
                                {style.shape}
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="text-white text-sm font-bold mb-2">Tips</h3>
                <ul className="space-y-1.5">
                  {TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GlassTryOn;
