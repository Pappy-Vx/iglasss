import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Header from '../../components/Header';
import CartItem from './layout/CartItem';
import CartSummary from './layout/CartSummary';
import { Link } from 'react-router-dom';
import { routePath } from '../../utils/routePath';
import { FiShoppingBag } from 'react-icons/fi';
import RecentlyViewed from '../Home/layout/RecentlyViewed';
import Footer from '../../components/Footer';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center mt-8">
          <div className="max-w-md mx-auto">
            <FiShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Browse our products and discover our best deals!</p>
            <Link
              to={routePath.PRODUCTS}
              className="inline-block bg-pink-600 text-white py-3 px-8 rounded-full hover:bg-[#ffffff] hover:text-pink-600 hover:border-pink-600 border-2 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
          <RecentlyViewed />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:flex-grow">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Cart ({cartItems.length})
                </h1>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    quantity={item.quantity}
                    size={item.size}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-80">
            <CartSummary />
          </div>
        </div>
        <RecentlyViewed />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
