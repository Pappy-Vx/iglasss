import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiHelpCircle,
  FiSearch,
  FiMenu,
} from "react-icons/fi";
import {
  NavigationMenuComponent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./common/NavigationMenuComponent";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Logo from "../../public/logo.png";
import { routePath } from "../utils/routePath";
import { Product } from "../store/features/productSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.products);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const searchTimeoutRef = useRef<number | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = window.setTimeout(() => {
      if (query.length >= 3) {
        // Filter all products based on search query
        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredProducts);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay
  };

  // Close search results when clicking outside
  const handleClickOutside = () => {
    setShowResults(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      // Clear timeout on unmount
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-sm  flex items-center justify-between fixed top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-600 hover:text-[#330066]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="bg-black w-20  ">
            <img src={Logo} alt="" />
          </div>

          {/* Search Bar */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-black hover:text-pink-600">
              Home
            </Link>
            <Link to={routePath.New} className="text-black hover:text-pink-600">
              New In
            </Link>
            <Link
              to="/account"
              className="flex items-center space-x-2 text-gray-600 hover:text-[#330066]"
            >
              <NavigationMenuComponent className="text-black">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black hover:text-pink-600">
                    Product <CaretDownIcon className="CaretDown" aria-hidden />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="navcon2">
                      <NavigationMenuLink href="/">
                        <div className="decor">
                          <Link to={routePath.LOGIN}>Braided</Link>
                        </div>
                        <div className="navmenulink">
                          <h4>Wigs</h4>
                        </div>
                        <div className="navmenulink">
                          <h4>Pawny Braids</h4>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuComponent>
            </Link>
            <Link
              to={routePath.CONTACT}
              className="text-black hover:text-pink-600"
            >
              <span>Our Professional School</span>
            </Link>
            <Link
              to={routePath.CONTACT}
              className="text-black hover:text-pink-600"
            >
              <span>Contact</span>
            </Link>
          </nav>
          <div className="hidden lg:flex items-center space-x-6 flex-row">
            <div className="flex-1 max-w-3xl relative">
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  placeholder="Search products, brands and categories (min. 3 characters)"
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#330066] text-text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    searchQuery.length >= 3 ? "bg-pink-600" : "bg-gray-400"
                  } text-white p-1.5 rounded-md transition-colors duration-300 ${
                    searchQuery.length >= 3
                      ? "hover:bg-pink-600"
                      : "cursor-not-allowed"
                  }`}
                  disabled={searchQuery.length < 3}
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="flex items-center space-x-3">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {product.category}
                          </p>
                          <p className="text-sm font-medium text-[#330066]">
                            ₦{product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {showResults &&
                searchQuery.length >= 3 &&
                searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-center text-gray-500">
                    No products found matching "{searchQuery}"
                  </div>
                )}
            </div>
            <Link
              to={routePath.CART}
              className="hidden text-black hover:text-pink-600 lg:flex flex-row items-center space-x-2"
            >
              <FiShoppingCart className="h-6 w-6" />
              <span className="bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartQuantity > 0 ? cartQuantity : 0}
              </span>
            </Link>
          </div>

          <Link
              to={routePath.CART}
              className="text-black hover:text-pink-600 flex lg:hidden flex-row items-center space-x-2"
            >
              <FiShoppingCart className="h-6 w-6" />
              <span className="bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartQuantity > 0 ? cartQuantity : 0}
              </span>
            </Link>
          {isMenuOpen && (
            <div className="lg:hidden bg-white absolute left-0 top-[5.5rem] w-full h-full z-50  ">
              <div className="container mx-auto px-4 py-2">
                <nav className="flex flex-col space-y-4">
                  <div
                    className="flex items-center space-x-2 text-gray-600 py-2 cursor-pointer"
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Account</span>
                    <CaretDownIcon className="w-5 h-5" />
                  </div>
                  {isAccountMenuOpen && (
                    <div className="pl-8 space-y-2">
                      <Link to={routePath.LOGIN} className="text-gray-600">
                        Login
                      </Link>
                      <Link to="/orders" className="text-gray-600">
                        Orders
                      </Link>
                    </div>
                  )}
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 text-gray-600 py-2"
                  >
                    <FiHelpCircle className="w-5 h-5" />
                    <span>Help</span>
                  </Link>
                  <h3 className="text-black">Categories</h3>
                  <div className="border-t pt-2">
                    {[
                      "Surgical",
                      "Dental",
                      "Medical",
                      "Implants",
                      "Laboratory Equiptments",
                    ].map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category
                          .toLowerCase()
                          .replace(/ & /g, "-")}`}
                        className="block text-gray-600 py-2"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
