import { Link } from 'react-router-dom';
import { routePath } from '../../../utils/routePath';

const HomeFooter = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0A1D37] text-white py-14 px-8 text-center">
      {/* Large soft gradient circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
          Join the community
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          #iglasssnigeria
        </h2>
        <p className="text-white/60 text-base mb-8 max-w-sm mx-auto">
          Tag us in your looks and get featured on our page.
        </p>
        <Link
          to={routePath.SHOP}
          className="inline-flex items-center gap-2 bg-white text-[#0A1D37] hover:bg-blue-300 font-bold px-8 py-3 rounded-full transition-all duration-300 text-sm"
        >
          Shop All Styles
        </Link>
      </div>
    </div>
  );
};

export default HomeFooter;
