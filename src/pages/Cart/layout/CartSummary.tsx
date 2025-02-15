import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Link } from 'react-router-dom';
import { routePath } from '../../../utils/routePath';

const CartSummary = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">CART SUMMARY</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-xl font-bold text-[#330066]">
            ₦ {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <Link
            to={routePath.CHECKOUT}
            className="block w-full bg-[#330066] text-white text-center py-3 px-4 rounded-full hover:bg-[#2a0052] transition-colors"
          >
            Checkout (₦ {subtotal.toLocaleString()})
          </Link>
          
          <Link
            to={routePath.PRODUCTS}
            className="block w-full border-2 border-[#330066] text-[#330066] text-center py-3 px-4 rounded-full hover:bg-[#330066] hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
