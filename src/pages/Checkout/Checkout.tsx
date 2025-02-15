import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
//import { Product } from '../../store/features/productSlice';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  town: string;
  state: string;
  phone: string;
  email: string;
  orderNotes?: string;
}

type PaymentMethod = 'transfer' | 'monnify';

const Checkout = () => {
  //const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer');
 // const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    town: '',
    state: '',
    phone: '',
    email: '',
    orderNotes: '',
  });

  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('https://nga-states-lga.onrender.com/fetch');
        const data = await response.json();
        console.log(data)
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     if (paymentMethod === 'monnify') {
  //       // Initialize Monnify payment
  //       // Replace with your Monnify integration code
  //       const monnifyConfig = {
  //         amount: total,
  //         currency: "NGN",
  //         reference: Date.now().toString(),
  //         customerName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
  //         customerEmail: shippingDetails.email,
  //         apiKey: "YOUR_MONNIFY_API_KEY",
  //         contractCode: "YOUR_CONTRACT_CODE",
  //         paymentDescription: "Payment for order",
  //       };

  //       // Add your Monnify payment initialization here
  //       // window.MonnifySDK.initialize(monnifyConfig);
  //     } else {
  //       // Handle bank transfer
  //       navigate('/success', { 
  //         state: { 
  //           orderDetails: {
  //             items: cartItems,
  //             shipping: shippingDetails,
  //             total,
  //             paymentMethod
  //           }
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Payment error:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Details Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
            <form  className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={shippingDetails.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={shippingDetails.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
                />
              </div>
            </div>
 

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street address *
              </label>
              <input
                type="text"
                name="streetAddress"
                required
                placeholder="House number and street name"
                value={shippingDetails.streetAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
              />
            </div>
 

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town / City *
                </label>
                <input
                  type="text"
                  name="town"
                  required
                  value={shippingDetails.town}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  required
                  value={shippingDetails.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066] max-h-32 overflow-y-auto"
                >
                  <option value="">Select a state</option>
                  {states && states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={shippingDetails.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={shippingDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order notes (optional)
              </label>
              <textarea
                name="orderNotes"
                rows={4}
                value={shippingDetails.orderNotes}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#330066]"
                placeholder="Notes about your order, e.g. special notes for delivery"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between font-medium text-gray-600 mb-2">
                <span>PRODUCT</span>
                <span>SUBTOTAL</span>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={item.imageUrl}
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free shipping</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-[#330066] focus:ring-[#330066]"
                  />
                  <span>Direct Bank Transfer</span>
                </label>
                {paymentMethod === 'transfer' && (
                  <div className="mt-2 p-4 bg-white rounded-md text-sm">
                    <p className="font-medium mb-2">Bank Details:</p>
                    <p>Bank: First Bank</p>
                    <p>Account Number: 0123456789</p>
                    <p>Account Name: BetaShip Medical Supplies</p>
                    <p className="mt-2 text-gray-600">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will be shipped after we receive the payment.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="monnify"
                    checked={paymentMethod === 'monnify'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-[#330066] focus:ring-[#330066]"
                  />
                  <span>Pay with Monnify</span>
                </label>
                {paymentMethod === 'monnify' && (
                  <div className="mt-2 p-4 bg-white rounded-md text-sm">
                    <p>Pay securely using Monnify payment gateway.</p>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
               className=' bg-[#330066] hover:bg-purple-700'
      
            >
             place order
            </button>

            {/* <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#330066] hover:bg-purple-700'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button> */}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default Checkout;