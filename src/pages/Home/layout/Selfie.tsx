import { Link } from 'react-router-dom';
import { routePath } from '../../../utils/routePath';
import { FiCamera, FiZap, FiStar } from 'react-icons/fi';
import selfie from '../../../assets/images/selfiehome.png';

const features = [
  {
    icon: <FiCamera className="w-5 h-5" />,
    title: 'Live AR Try-On',
    desc: 'See frames on your face in real time using your camera.',
  },
  {
    icon: <FiZap className="w-5 h-5" />,
    title: 'Instant Results',
    desc: 'No app download needed — works right in your browser.',
  },
  {
    icon: <FiStar className="w-5 h-5" />,
    title: 'Hundreds of Styles',
    desc: 'Try any frame from our catalogue before you buy.',
  },
];

const Selfie = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1D37] via-[#1a2d4a] to-[#2F465E] text-white">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
        {/* Left: text content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-5">
            <FiCamera className="w-4 h-4" />
            Augmented Reality Try-On
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5">
            Try Glasses on
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Your Face, Virtually
            </span>
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Iglasss uses cutting-edge AR technology to let you virtually try on any frame. Find the look that fits your vibe — before it ships to your door.
          </p>

          {/* Feature list */}
          <ul className="space-y-4 mb-10">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 backdrop-blur-sm">
                  {f.icon}
                </span>
                <div>
                  <span className="font-semibold text-sm text-white block">{f.title}</span>
                  <span className="text-white/60 text-xs leading-relaxed">{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to={routePath.GlassTryOn}
            className="inline-flex items-center gap-2 self-start bg-white text-[#2F465E] hover:bg-blue-300 hover:text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-sm shadow-lg hover:shadow-blue-900/30 hover:shadow-2xl"
          >
            <FiCamera className="w-4 h-4" />
            Launch AR Try-On
          </Link>
        </div>

        {/* Right: selfie image */}
        <div className="relative flex items-end justify-center lg:justify-end overflow-hidden min-h-[320px] lg:min-h-0">
          {/* Glow behind image */}
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <img
            src={selfie}
            alt="AR Try-On preview"
            className="relative z-10 h-full max-h-[480px] w-auto object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default Selfie;
