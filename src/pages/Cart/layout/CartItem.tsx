import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../store/features/cartSlice';
import { toast } from 'react-toastify';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
}

const CartItem = ({ id, name, price, imageUrl, quantity, size }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(id));
    toast.success('Product removed from cart');
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-800">{name}</h3>
        {size && (
          <p className="text-sm text-gray-600 mt-1">
            Size: {size}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 rounded-full border border-gray-300 hover:border-[#330066]"
            >
              <FiMinus className="text-[#330066]" />
            </button>
            <span className="text-lg font-medium w-8 text-center text-[#330066]">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 rounded-full border border-gray-300 hover:border-[#330066]"
            >
              <FiPlus className="text-[#330066]" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[#330066]">
              ₦{(price * quantity).toLocaleString()}
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-600 flex items-center gap-1 mt-1"
            >
              <FiTrash2 />
              <span className="text-sm">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
