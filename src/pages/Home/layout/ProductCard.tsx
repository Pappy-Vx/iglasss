import { Link } from 'react-router-dom';
import { ProductCardProps } from '../../../types/home.types';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/features/cartSlice';
import { toast } from 'react-toastify';
import { useRecentlyViewed } from '../../../hooks/useRecentlyViewed';
import { routePath } from '../../../utils/routePath';

const ProductCard = ({ id, name, price, originalPrice, imageUrl, rating, reviews, discount }: ProductCardProps) => {
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
    <div className="group relative w-[22rem] "> {/* Added relative wrapper for absolute positioning */}
      <Link
        to={routePath.PRODUCT_DETAILS.replace(':id', id)}
        className="block"
        onClick={handleProductClick}
      >
        <div className="  hover:shadow-md transition-shadow duration-300">
          <div className="relative aspect-w-1 aspect-h-1">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-80 object-cover rounded-md"
            />
          </div>

          <div className="p-4 flex flex-row justify-between items-center">
            <h3 className="text-gray-800 font-medium mb-2 group-hover:text-[#330066] transition-colors line-clamp-2">
              {name}
            </h3>

            <div className="flex items-center mb-2">
              <div className="flex-1">
                <span className="text-lg font-bold text-black">
                  ₦{price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* "Buy Now" button positioned absolutely */}
      <div className="absolute bottom-24 left-4 right-4"> 
        <button
          onClick={handleAddToCart}
          className="w-full h-14 bg-pink-600 text-white py-2 px-4 rounded-md   transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer "
        >
          <span className='font-bold'>Buy Now</span> {/* Changed text to "Buy Now" */}
        </button>
      </div>
      {/* Bestseller Tag */}
      <div className="absolute top-4 left-4 text-black underline  px-2 py-1 rounded-md">
        BESTSELLER
      </div>
    </div>
  );
};

export default ProductCard;