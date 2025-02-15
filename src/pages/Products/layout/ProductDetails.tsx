import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiMinus, FiPlus } from "react-icons/fi";
import { addToCart } from "../../../store/features/cartSlice";
import { toast } from "react-toastify";
import all_product from "../../../assets/items/all_product";
import { routePath } from "../../../utils/routePath";

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Find the product from all_product
  const product = all_product.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const productToAdd = {
      id: String(product.id),
      name: product.name,
      price: product.new_price,
      originalPrice: product.old_price,
      imageUrl: product.image,
      rating: 4.5,
      reviews: 121,
      discount: Math.floor(
        ((product.old_price - product.new_price) / product.old_price) * 100
      ),
      size: selectedSize,
    };

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(productToAdd));
    }

    toast.success("Added to cart successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Product Images */}
        <nav className=" flex mb-4 text-sm  sm:hidden">
          <Link to={routePath.HOME} className="text-gray-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-[#330066] lowercase">{product.name}</span>
        </nav>
        <div className="md:w-1/2">
          <div className="bg-gray-50 rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="md:w-1/2">
          <nav className="sm:flex mb-4 text-sm  hidden">
            <Link to={routePath.HOME} className="text-gray-500">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-[#330066] lowercase">{product.name}</span>
          </nav>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-[#330066] text-xl">
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-600">(121)</span>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-[#330066]">
              ₦{product.new_price.toLocaleString()}
              {product.old_price > product.new_price && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₦{product.old_price.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Suggested payments with 6 months special financing
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Choose a Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                    selectedSize === size
                      ? "border-[#330066] text-[#330066]"
                      : "border-gray-300 text-gray-600"
                  } hover:border-[#330066] transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-2 rounded-full border border-gray-300 hover:border-[#330066]"
              >
                <FiMinus className="text-[#330066]" />
              </button>
              <span className="text-xl font-medium w-8 text-center text-[#330066]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-2 rounded-full border border-gray-300 hover:border-[#330066]"
              >
                <FiPlus className="text-[#330066]" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#330066] text-white py-3 px-6 rounded-full hover:bg-[#2a0052] transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
            {/* <button className="flex-1 border-2 border-[#330066] text-[#330066] py-3 px-6 rounded-full hover:bg-[#330066] hover:text-white transition-colors cursor-pointer">
              Buy Now
            </button> */}
          </div>

          {/* Delivery Info */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-[#330066]">🚚</span>
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-sm text-gray-600">
                  Enter your Postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#330066]">↩️</span>
              <div>
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-sm text-gray-600">
                  Free 30days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container space-y-12 my-6 py-4 px-4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <div className="">
          <p className="text-gray-700">
            William Lawson’s Finest Blended Scotch Whisky is one of the fastest
            growing Scotch whisky brands in the world, featuring notes of
            toasted cereal, juicy apple and chewy toffee.
            <br />
            <br />
            <strong>Premium Blended Scotch</strong>
            <br />
            William Lawson's offers an exceptional blend of fine grains and
            malts, aged to perfection for a rich and smooth taste.
            <br />
            <br />
            <strong>Unique Flavor Profile</strong>
            <br />
            With hints of caramel, a touch of fruit, and a subtle smokiness,
            this whisky creates a delightful experience for your palate.
            <br />
            <br />
            <strong>Perfectly Paired</strong>
            <br />
            Our combo includes two bottles of Coca Cola, designed to complement
            this whisky beautifully. Mix it for a sweet and refreshing twist or
            enjoy it straight.
          </p>
        </div>
      </div>
      <div className="container space-y-12    px-4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid sm:grid-cols-2 grid-cols-1 min-w-max items-center   py-4 gap-8">
          <div className="flex flex-col   justify-center border border-gray-300 w-full rounded-sm">
            <div className="font-semibold  px-4 py-4 border-b border-gray-300">
              Key Features
            </div>
            <ul className="list-disc list-inside px-4 py-4">
              <li>75cl</li>
              <li>2 bottles of Coca Cola 60cl</li>
              <li>Rich and smooth taste</li>
              <li>40% Vol</li>
            </ul>
          </div>
          <div className="flex flex-col   justify-center border border-gray-300 w-full rounded-sm">
            <div className="font-semibold  px-4 py-4 border-b border-gray-300">
              Specification
            </div>
            <ul className="list-disc list-inside px-4 py-4">
              <li>SKU: WI216DB6FA23WNAFAMZ</li>
              <li>Weight (kg): 2</li>
              <li>Colour: Brown</li>
              <li>Shop Type: Betaship Mall</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
