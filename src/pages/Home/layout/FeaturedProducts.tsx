import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ProductCardProps } from '../../../types/home.types';
import { GlassProduct } from '../../../types/product.types';
import glass_product from '../../../assets/items/glass_product';
import { routePath } from '../../../utils/routePath';

const FeaturedProducts = () => {
  const [products] = useState<ProductCardProps[]>(() =>
    glass_product
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((product: GlassProduct) => ({
        id: String(product.id),
        name: product.name,
        price: product.new_price || 0,
        originalPrice: product.old_price || undefined,
        imageUrl: product.image || '',
        rating: 4.5,
        reviews: Math.floor(Math.random() * 200) + 50,
        discount:
          product.old_price && product.new_price
            ? Math.floor(((product.old_price - product.new_price) / product.old_price) * 100)
            : undefined,
      }))
  );

  return (
    <section>
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F465E] mb-2 block">
            Handpicked
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Featured Frames
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

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />

        <Marquee direction="left" speed={55} pauseOnHover gradient={false}>
          {products.map((product) => (
            <div key={product.id} className="mx-3">
              <ProductCard {...product} />
            </div>
          ))}
        </Marquee>
      </div>

      {/*
        Large gap between rows — this horizontal band aligns with the fixed glasses
        animation at viewport center, letting the assembled glasses show clearly
        between the two scrolling product streams.
      */}
      <div className="flex items-center justify-center mt-12 mb-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2F465E]/10 to-transparent" />
        <span className="mx-4 text-[10px] uppercase tracking-[0.3em] text-[#2F465E]/25 font-semibold whitespace-nowrap select-none">
          Featured Frames
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#2F465E]/10 to-transparent" />
      </div>

      {/* Second row (reverse) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
        <Marquee direction="right" speed={45} pauseOnHover gradient={false}>
          {[...products].reverse().map((product) => (
            <div key={`rev-${product.id}`} className="mx-3">
              <ProductCard {...product} />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="mt-8 text-center">
        <Link
          to={routePath.PRODUCTS}
          className="inline-flex items-center gap-2 border-2 border-[#2F465E] text-[#2F465E] hover:bg-[#2F465E] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 text-sm"
        >
          Browse All Frames
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
