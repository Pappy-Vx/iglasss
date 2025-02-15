import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { routePath } from '../../utils/routePath';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if (!orderDetails) {
      navigate(routePath.HOME);
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) return null;

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          {orderDetails.paymentMethod === 'transfer' ? (
            <>
              Your order has been received. Please make payment to the bank account provided.
              Once payment is confirmed, we will process your order.
            </>
          ) : (
            'Your payment has been processed successfully. We will process your order shortly.'
          )}
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="font-medium mb-2">Order Total: ₦{orderDetails.total.toLocaleString()}</p>
              {orderDetails.paymentMethod === 'transfer' && (
                <div className="mt-4 p-4 bg-white rounded-md">
                  <p className="font-medium mb-2">Bank Details:</p>
                  <p>Bank: First Bank</p>
                  <p>Account Number: 0123456789</p>
                  <p>Account Name: BetaShip Medical Supplies</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Please use your Order ID as payment reference
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Shipping Details:</h3>
              <p>{orderDetails.shipping.firstName} {orderDetails.shipping.lastName}</p>
              <p>{orderDetails.shipping.streetAddress}</p>
              {orderDetails.shipping.apartment && <p>{orderDetails.shipping.apartment}</p>}
              <p>{orderDetails.shipping.town}, {orderDetails.shipping.state}</p>
              <p>Phone: {orderDetails.shipping.phone}</p>
              <p>Email: {orderDetails.shipping.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to={routePath.HOME}
            className="px-6 py-3 bg-[#330066] text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </Link>
          {orderDetails.paymentMethod === 'transfer' && (
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-[#330066] text-[#330066] rounded-md hover:bg-gray-50 transition-colors"
            >
              Print Details
            </button>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Success;
