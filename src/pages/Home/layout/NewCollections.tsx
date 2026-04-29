import { Link } from 'react-router-dom';
import { routePath } from '../../../utils/routePath';
import collect1 from '../../../assets/images/iglasscollection1.jpg';
import collect2 from '../../../assets/images/iglasscollection2.jpg';

const NewCollections = () => {
  return (
    <section>
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F465E] mb-2 block">
            Collections
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Explore Our Collections
          </h2>
        </div>
        <Link
          to={routePath.PRODUCTS}
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#2F465E] hover:underline"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/*
        Desktop: 3-column grid — left card | center stage (glasses float here) | right card.
        The empty center column aligns with the fixed glasses animation at viewport-center.
        Mobile: single column, cards stack.
      */}
      <div
        className="hidden md:grid gap-5"
        style={{ gridTemplateColumns: '1fr 90px 1fr' }}
      >
        {/* ── Summer Collection ── */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#96887D] h-[620px]">
          <img
            src={collect1}
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 mb-2 block">
              2025 Season
            </span>
            <h3 className="text-3xl font-black text-white mb-3 leading-tight">
              Summer Collection
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs">
              From bold cat-eyes to sleek aviators and translucent frames — let the sunshine into your style.
            </p>
            <Link
              to={routePath.SHOP}
              className="inline-flex items-center gap-2 bg-white text-[#3D3834] hover:bg-[#3D3834] hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm"
            >
              Shop Summer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Center stage — intentional visual breathing room for the glasses ── */}
        <div className="flex items-stretch justify-center">
          <div className="w-px bg-gradient-to-b from-transparent via-[#2F465E]/12 to-transparent" />
        </div>

        {/* ── Kids' Wear ── */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#E7E7E7] h-[620px]">
          <img
            src={collect2}
            alt="Kid's Collection"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#506D4E]/80 via-[#506D4E]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-green-200 mb-2 block">
              Kids & Junior
            </span>
            <h3 className="text-3xl font-black text-white mb-3 leading-tight">
              Kids' Wear
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs">
              Vibrant frames, comfy fits, and playful designs — a perfect pair for every little explorer.
            </p>
            <Link
              to={routePath.New}
              className="inline-flex items-center gap-2 bg-white text-[#506D4E] hover:bg-[#506D4E] hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm"
            >
              Shop Kids
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: single-column stack */}
      <div className="grid grid-cols-1 gap-5 md:hidden">
        <div className="group relative overflow-hidden rounded-2xl bg-[#96887D] h-[480px]">
          <img
            src={collect1}
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 mb-2 block">
              2025 Season
            </span>
            <h3 className="text-2xl font-black text-white mb-2 leading-tight">Summer Collection</h3>
            <p className="text-white/75 text-sm leading-relaxed mb-5 max-w-xs">
              Bold cat-eyes, sleek aviators, translucent frames.
            </p>
            <Link
              to={routePath.SHOP}
              className="inline-flex items-center gap-2 bg-white text-[#3D3834] font-semibold px-5 py-2.5 rounded-full text-sm"
            >
              Shop Summer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-[#E7E7E7] h-[480px]">
          <img
            src={collect2}
            alt="Kid's Collection"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#506D4E]/80 via-[#506D4E]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-green-200 mb-2 block">
              Kids & Junior
            </span>
            <h3 className="text-2xl font-black text-white mb-2 leading-tight">Kids' Wear</h3>
            <p className="text-white/75 text-sm leading-relaxed mb-5 max-w-xs">
              Vibrant frames, comfy fits, playful designs.
            </p>
            <Link
              to={routePath.New}
              className="inline-flex items-center gap-2 bg-white text-[#506D4E] font-semibold px-5 py-2.5 rounded-full text-sm"
            >
              Shop Kids
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-10 grid grid-cols-3 gap-4 py-8 px-6 bg-[#2F465E] rounded-2xl text-white text-center">
        {[
          { num: '500+', label: 'Frame Styles' },
          { num: '50k+', label: 'Happy Customers' },
          { num: '5★', label: 'Average Rating' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl md:text-3xl font-black">{stat.num}</div>
            <div className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewCollections;
