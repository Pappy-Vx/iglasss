import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiMinus, FiPlus, FiCamera, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { addToCart } from '../../../store/features/cartSlice';
import { toast } from 'react-toastify';
import glass_product from '../../../assets/items/glass_product';
import { routePath } from '../../../utils/routePath';

const FRAME_SIZES = ['Narrow (49mm)', 'Medium (52mm)', 'Wide (55mm)', 'Extra Wide (58mm)'];

const frameFeatures = [
  'UV400 lens protection',
  'Lightweight frame construction',
  'Spring hinges for comfort',
  'Prescription compatible',
  'Case & cleaning cloth included',
];

const lensOptions = [
  { id: 'clear', label: 'Clear (standard)', price: 0 },
  { id: 'tinted', label: 'Tinted (+£3,500)', price: 3500 },
  { id: 'bluelight', label: 'Blue Light Filter (+£5,000)', price: 5000 },
  { id: 'photochromic', label: 'Photochromic (+£8,000)', price: 8000 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLens, setSelectedLens] = useState('clear');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = glass_product.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-lg">Product not found.</p>
        <Link to={routePath.PRODUCTS} className="text-[#2F465E] hover:underline text-sm mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const lensAddon = lensOptions.find((l) => l.id === selectedLens)?.price ?? 0;
  const totalPrice = (product.new_price + lensAddon) * quantity;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please choose a frame size.');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: String(product.id),
          name: product.name,
          price: product.new_price + lensAddon,
          originalPrice: product.old_price,
          imageUrl: product.image,
          rating: 4.5,
          reviews: 121,
          discount: Math.floor(
            ((product.old_price - product.new_price) / product.old_price) * 100
          ),
          size: selectedSize,
        })
      );
    }
    toast.success('Added to cart!');
  };

  const discount = Math.floor(
    ((product.old_price - product.new_price) / product.old_price) * 100
  );

  const mockImages = [product.image, product.image, product.image];

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link to={routePath.HOME} className="hover:text-[#2F465E]">Home</Link>
        <span>/</span>
        <Link to={routePath.PRODUCTS} className="hover:text-[#2F465E]">Eyeglasses</Link>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="md:w-[45%]">
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-3 aspect-square flex items-center justify-center">
            <img
              src={mockImages[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="flex gap-2">
            {mockImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`flex-1 aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-[#2F465E]' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain p-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-[55%]">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">4.8 (121 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black text-[#2F465E]">
              £{product.new_price.toLocaleString()}
            </span>
            {product.old_price > product.new_price && (
              <span className="text-lg text-gray-400 line-through">
                £{product.old_price.toLocaleString()}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Brand + type badges */}
          {(product.brand || product.type) && (
            <div className="flex items-center gap-2 mb-4">
              {product.brand && (
                <span className="text-xs font-semibold bg-[#2F465E]/8 text-[#2F465E] px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
              {product.type && (
                <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                  {product.type}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed mb-6 border-l-2 border-[#2F465E]/20 pl-4">
              {product.description}
            </p>
          )}

          {/* AR Try-on CTA */}
          <Link
            to={`${routePath.GlassTryOn}?product=${product.id}`}
            className="flex items-center gap-2 w-full bg-[#EBF5FF] text-[#2F465E] hover:bg-[#2F465E] hover:text-white font-semibold px-4 py-3 rounded-xl mb-6 transition-all text-sm justify-center"
          >
            <FiCamera className="w-4 h-4" />
            Try on with AR
          </Link>

          {/* Frame Size */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Frame Size <span className="text-red-400">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {FRAME_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-xs px-3.5 py-2 rounded-full border transition-colors ${
                    selectedSize === size
                      ? 'bg-[#2F465E] text-white border-[#2F465E]'
                      : 'border-gray-200 text-gray-600 hover:border-[#2F465E]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Lens option */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-800 mb-2">Lens Option</p>
            <div className="grid grid-cols-2 gap-2">
              {lensOptions.map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => setSelectedLens(lens.id)}
                  className={`text-xs px-3 py-2.5 rounded-xl border text-left transition-colors ${
                    selectedLens === lens.id
                      ? 'bg-[#2F465E] text-white border-[#2F465E]'
                      : 'border-gray-200 text-gray-600 hover:border-[#2F465E]'
                  }`}
                >
                  {lens.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#2F465E] transition-colors"
              >
                <FiMinus className="w-3.5 h-3.5 text-[#2F465E]" />
              </button>
              <span className="text-lg font-bold text-[#2F465E] w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((p) => p + 1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#2F465E] transition-colors"
              >
                <FiPlus className="w-3.5 h-3.5 text-[#2F465E]" />
              </button>
              <span className="text-sm text-gray-400 ml-2">
                Total: <strong className="text-[#2F465E]">£{totalPrice.toLocaleString()}</strong>
              </span>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#2F465E] hover:bg-[#1a2d3d] text-white font-bold py-4 rounded-full transition-colors text-sm mb-3"
          >
            Add to Cart
          </button>

          {/* Delivery info */}
          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            {[
              { icon: <FiTruck className="w-4 h-4" />, title: 'Free Delivery', desc: 'Free shipping across Nigeria on orders above £10,000.' },
              { icon: <FiRefreshCw className="w-4 h-4" />, title: '30-Day Returns', desc: 'Not the right fit? Return within 30 days for free.' },
              { icon: <FiShield className="w-4 h-4" />, title: '1-Year Warranty', desc: 'Frame defects covered for 12 months from purchase.' },
            ].map((info) => (
              <div key={info.title} className="flex items-start gap-3">
                <span className="text-[#2F465E] mt-0.5">{info.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{info.title}</p>
                  <p className="text-xs text-gray-500">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Frame features + specs */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4">Frame Features</h2>
          <ul className="space-y-2">
            {frameFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500 font-bold text-base">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4">Specifications</h2>
          <div className="space-y-2">
            {[
              ['Frame Material', 'Premium Acetate / Metal'],
              ['Lens Width', '49–58mm (size dependent)'],
              ['Bridge Width', '18–22mm'],
              ['Temple Length', '140mm'],
              ['Weight', '< 25g'],
              ['Prescription', 'Compatible'],
            ].map(([key, val]) => (
              <div key={key} className="flex justify-between text-sm border-b border-gray-50 pb-1.5">
                <span className="text-gray-500">{key}</span>
                <span className="font-medium text-gray-800">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
