import { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../Home/layout/ProductCard';
import glass_product from '../../assets/items/glass_product';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Best Discount' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under £5,000', min: 0, max: 5000 },
  { label: '£5,000 – £15,000', min: 5000, max: 15000 },
  { label: '£15,000 – £30,000', min: 15000, max: 30000 },
  { label: 'Over £30,000', min: 30000, max: Infinity },
];

const Shop = () => {
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode] = useState<'grid' | 'list'>('grid');

  const products = useMemo(() => {
    const range = PRICE_RANGES[priceRange];
    let filtered = glass_product.filter(
      (p) => p.new_price >= range.min && p.new_price <= range.max
    );

    if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.new_price - b.new_price);
    else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.new_price - a.new_price);
    else if (sort === 'discount')
      filtered = [...filtered].sort(
        (a, b) =>
          ((b.old_price - b.new_price) / b.old_price) -
          ((a.old_price - a.new_price) / a.old_price)
      );

    return filtered;
  }, [sort, priceRange]);

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Page header */}
        <div className="bg-gradient-to-r from-[#0A1D37] to-[#2F465E] text-white py-14 px-4">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-2">Shop</p>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Sunglasses</h1>
            <p className="text-white/60 text-sm">
              {products.length} styles available
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 py-10">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-sm font-medium border border-gray-200 rounded-full px-4 py-2 hover:border-[#2F465E] transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              Filters
            </button>

            <div className="flex items-center gap-3">
              <FiGrid className={`w-5 h-5 cursor-pointer ${viewMode === 'grid' ? 'text-[#2F465E]' : 'text-gray-400'}`} />
              <FiList className={`w-5 h-5 cursor-pointer ${viewMode === 'list' ? 'text-[#2F465E]' : 'text-gray-400'}`} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2F465E] bg-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter panel */}
          {showFilter && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={i}
                    onClick={() => setPriceRange(i)}
                    className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                      priceRange === i
                        ? 'bg-[#2F465E] text-white border-[#2F465E]'
                        : 'border-gray-200 text-gray-600 hover:border-[#2F465E]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No products match your filters.
            </div>
          ) : (
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
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Shop;
