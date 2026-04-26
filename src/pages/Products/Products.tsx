import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProductDetails from './layout/ProductDetails';
import glass_product from '../../assets/items/glass_product';
import ProductCard from '../Home/layout/ProductCard';
import RecentlyViewed from '../Home/layout/RecentlyViewed';
import Footer from '../../components/Footer';
import { useState, useMemo } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Biggest Discount' },
];

const Products = () => {
  const { id } = useParams();
  const [sort, setSort] = useState('default');

  const products = useMemo(() => {
    let result = [...glass_product];
    if (sort === 'price-asc') result.sort((a, b) => a.new_price - b.new_price);
    else if (sort === 'price-desc') result.sort((a, b) => b.new_price - a.new_price);
    else if (sort === 'discount')
      result.sort(
        (a, b) =>
          (b.old_price - b.new_price) / b.old_price -
          (a.old_price - a.new_price) / a.old_price
      );
    return result;
  }, [sort]);

  if (id) {
    return (
      <>
        <Header />
        <div className="pt-16 min-h-screen">
          <ProductDetails />
          <div className="max-w-[1100px] mx-auto px-4 pb-12">
            <RecentlyViewed />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Page hero */}
        <div className="bg-gradient-to-r from-[#0A1D37] to-[#2F465E] text-white py-14 px-4">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-2">Catalogue</p>
            <h1 className="text-4xl md:text-5xl font-black mb-2">All Eyewear</h1>
            <p className="text-white/60 text-sm">{glass_product.length} styles — prescription compatible</p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 py-10">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-sm text-gray-500">{products.length} products</p>
            <div className="flex items-center gap-3">
              <FiGrid className="w-5 h-5 text-[#2F465E]" />
              <FiList className="w-5 h-5 text-gray-300" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2F465E] bg-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
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
                reviews={Math.floor(Math.random() * 200) + 50}
                discount={Math.floor(((product.old_price - product.new_price) / product.old_price) * 100)}
              />
            ))}
          </div>

          <div className="mt-12">
            <RecentlyViewed />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Products;
