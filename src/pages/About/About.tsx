import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { routePath } from '../../utils/routePath';
import { FiEye, FiHeart, FiAward, FiCamera } from 'react-icons/fi';

const values = [
  {
    icon: <FiEye className="w-6 h-6" />,
    title: 'Vision-First Design',
    desc: 'Every frame is built around optic clarity and comfort, not just aesthetics.',
  },
  {
    icon: <FiHeart className="w-6 h-6" />,
    title: 'Made for Everyone',
    desc: 'From kids to adults, casual wearers to professionals — we have your frame.',
  },
  {
    icon: <FiAward className="w-6 h-6" />,
    title: 'Premium Quality',
    desc: 'We source only from certified manufacturers with global quality standards.',
  },
  {
    icon: <FiCamera className="w-6 h-6" />,
    title: 'AR Technology',
    desc: 'Our virtual try-on lets you see exactly how frames look before buying.',
  },
];

const milestones = [
  { year: '2020', event: 'Iglasss founded in Lagos, Nigeria' },
  { year: '2021', event: 'Launched our first online catalogue with 100+ frames' },
  { year: '2022', event: 'Reached 10,000 customers across Nigeria' },
  { year: '2023', event: 'Introduced prescription lens services' },
  { year: '2024', event: 'Launched AR Virtual Try-On technology' },
  { year: '2025', event: 'Expanded to 500+ frame styles with same-day Lagos delivery' },
];

const About = () => {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0A1D37] to-[#2F465E] text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-4 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Where Style Meets
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">
                Vision
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Iglasss was born from a simple idea: eyewear should be as expressive as you are. We're a Nigerian brand on a mission to make premium, stylish frames accessible to everyone.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F465E] mb-3 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                Helping Nigerians See
                <br />the World in Style
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                At Iglasss, we believe that the right pair of glasses can completely transform how you present yourself to the world. Your frames are an extension of your personality — bold, quiet, playful, or professional.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We built a platform where finding your perfect frame is easy, fun, and inclusive. With hundreds of styles ranging from classic wire frames to bold acetate designs, we've got a pair for every face, every mood, and every moment.
              </p>
              <Link
                to={routePath.PRODUCTS}
                className="inline-flex items-center gap-2 bg-[#2F465E] text-white hover:bg-[#1a2d3d] font-semibold px-7 py-3 rounded-full transition-all duration-300 text-sm"
              >
                Browse Our Collection
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { num: '500+', label: 'Frame Styles', color: 'bg-[#F0F4F8]' },
                { num: '50k+', label: 'Happy Customers', color: 'bg-[#EBF5FF]' },
                { num: '5★', label: 'Average Rating', color: 'bg-[#F5F0FF]' },
                { num: '24h', label: 'Lagos Delivery', color: 'bg-[#F0FFF4]' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`${stat.color} rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-square`}
                >
                  <span className="text-4xl font-black text-[#2F465E] mb-1">{stat.num}</span>
                  <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-[#FAF9F6]">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F465E] mb-3 block">
                What we stand for
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl p-7 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#2F465E]/10 text-[#2F465E] rounded-xl flex items-center justify-center mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F465E] mb-3 block">
                Since 2020
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Our Journey
              </h2>
            </div>

            <ol className="relative border-l-2 border-[#2F465E]/20 ml-4">
              {milestones.map((m, i) => (
                <li key={i} className="mb-10 ml-6 last:mb-0">
                  <span className="absolute -left-[11px] flex items-center justify-center w-5 h-5 bg-[#2F465E] rounded-full ring-4 ring-white" />
                  <span className="text-xs font-bold text-[#2F465E] uppercase tracking-wider">{m.year}</span>
                  <p className="text-gray-700 mt-0.5 font-medium">{m.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-[#0A1D37] text-white text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Find Your Frame?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Browse over 500 styles and use our AR try-on to see what works for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to={routePath.PRODUCTS}
              className="bg-white text-[#0A1D37] hover:bg-blue-300 font-bold px-8 py-3 rounded-full transition-all text-sm"
            >
              Shop Now
            </Link>
            <Link
              to={routePath.GlassTryOn}
              className="border-2 border-white/50 hover:bg-white/10 font-semibold px-7 py-3 rounded-full transition-all text-sm"
            >
              Try AR
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
