// import { useRecentlyViewed } from '../../../hooks/useRecentlyViewed';
// import ProductCard from './ProductCard';

const RecentlyViewed = () => {
  // const { recentItems } = useRecentlyViewed();

  // if (recentItems.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Recently Viewed
        </h2>
      </div>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div> */}
    </section>
  );
};

export default RecentlyViewed;
