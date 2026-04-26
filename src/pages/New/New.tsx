import { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../Home/layout/ProductCard';
import glass_product from '../../assets/items/glass_product';
import { Link } from 'react-router-dom';
import { routePath } from '../../utils/routePath';
import { FiCamera } from 'react-icons/fi';

const CATEGORIES = ['All', 'Rectangle', 'Round', 'Aviator', 'Cat Eye', 'Wayfarer'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const glassFeatures = [
  { emoji: '🔭', title: 'Prescription Ready', desc: 'All frames work with single vision, bifocal, and progressive lenses.' },
  { emoji: '🛡️', title: 'Blue Light Filter', desc: 'Add blue light coating for screen-heavy days.' },
  { emoji: '🌿', title: 'Eco-Friendly Options', desc: 'Frames made from sustainable bio-acetate.' },
  { emoji: '📐', title: 'Perfect Fit Guarantee', desc: 'Free adjustments at any Iglasss partner store.' },
];

const New = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('default');

  const products = useMemo(() => {
    let result = [...glass_product];

    if (sort === 'price-asc') result.sort((a, b) => a.new_price - b.new_price);
    else if (sort === 'price-desc') result.sort((a, b) => b.new_price - a.new_price);

    return result;
  }, [sort]);

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0A1D37] to-[#2F465E] text-white py-16 px-4">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-2">
                Eyewear
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                Eyeglasses
              </h1>
              <p className="text-white/65 text-base max-w-md leading-relaxed">
                Discover frames that match your face, your style, and your prescription. All frames are prescription-compatible.
              </p>
            </div>
            <Link
              to={routePath.GlassTryOn}
              className="flex-shrink-0 flex items-center gap-2 bg-white text-[#2F465E] hover:bg-blue-300 hover:text-white font-bold px-6 py-3.5 rounded-full transition-all text-sm shadow-lg"
            >
              <FiCamera className="w-4 h-4" />
              Virtual Try-On
            </Link>
          </div>
        </section>

        {/* Features strip */}
        <section className="bg-white border-b border-gray-100 py-6 px-4">
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {glassFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{f.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category tabs + sort */}
        <section className="sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-30 px-4 py-3">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#2F465E] text-white border-[#2F465E]'
                      : 'border-gray-200 text-gray-600 hover:border-[#2F465E]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-full px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2F465E] bg-white"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Product grid */}
        <section className="py-10 px-4 bg-[#FAF9F6]">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-sm text-gray-500 mb-6">{products.length} styles</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  name={product.name}
                  price={product.new_price}
                  originalPrice={product.old_price}
                  imageUrl={product.image}
                  rating={4.5}
                  reviews={Math.floor(Math.random() * 200) + 30}
                  discount={Math.floor(((product.old_price - product.new_price) / product.old_price) * 100)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="py-16 px-4 bg-[#2F465E] text-white text-center">
          <h2 className="text-3xl font-black mb-3">Not sure which frames suit you?</h2>
          <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto">
            Use our AR try-on to see every frame on your face before you buy.
          </p>
          <Link
            to={routePath.GlassTryOn}
            className="inline-flex items-center gap-2 bg-white text-[#2F465E] hover:bg-blue-300 hover:text-white font-bold px-8 py-3 rounded-full transition-all text-sm"
          >
            <FiCamera className="w-4 h-4" />
            Launch AR Try-On
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default New;
