import { Link } from 'react-router-dom';
import { ProductCardProps } from '../../../types/home.types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/features/cartSlice';
import { toast } from 'react-toastify';
import { useRecentlyViewed } from '../../../hooks/useRecentlyViewed';
import { routePath } from '../../../utils/routePath';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  rating,
  reviews,
  discount,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ id, name, price, originalPrice, imageUrl, rating, reviews, discount }));
    toast.success('Added to cart!');
  };

  const handleProductClick = () => {
    addToRecentlyViewed({ id, name, price, originalPrice, imageUrl, rating, reviews, discount });
  };

  return (
    <Link
      to={routePath.PRODUCT_DETAILS.replace(':id', id)}
      className="block group w-[200px]"
      onClick={handleProductClick}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#2F465E]/20">
        {/* Image area */}
        <div className="relative bg-gray-50 overflow-hidden h-44">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          {discount && discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#2F465E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {/* Quick-add button (hover) */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-white text-[#2F465E] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#2F465E] hover:text-white"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Text */}
        <div className="p-3">
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#2F465E] transition-colors mb-1.5 leading-snug">
            {name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-[#2F465E]">
              ₦{price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-gray-400 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {/* Stars */}
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] text-gray-400 ml-0.5">({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
