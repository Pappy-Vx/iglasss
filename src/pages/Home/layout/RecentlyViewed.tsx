import { useRecentlyViewed } from '../../../hooks/useRecentlyViewed';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
  const { recentItems } = useRecentlyViewed();

  if (recentItems.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F465E] mb-2 block">
            Your history
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Recently Viewed
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recentItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
