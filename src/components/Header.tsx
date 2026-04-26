import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiCamera } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Logo from '../assets/images/logo.png';
import { routePath } from '../utils/routePath';
import { Product } from '../store/features/productSlice';

const navLinks = [
  { label: 'Eyeglasses', path: routePath.New },
  { label: 'Sunglasses', path: routePath.SHOP },
  { label: 'Lenses', path: routePath.PRODUCTS },
  { label: 'About', path: routePath.ABOUT },
  { label: 'Contact', path: routePath.CONTACT },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.products);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const searchTimeoutRef = useRef<number | null>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = window.setTimeout(() => {
      if (query.length >= 2) {
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 280);
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#2F465E] p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to={routePath.HOME} className="flex-shrink-0">
            <img src={Logo} alt="Iglasss" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 relative group ${
                    isActive ? 'text-[#2F465E]' : 'text-gray-700 hover:text-[#2F465E]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#2F465E] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Search + Actions */}
          <div className="hidden lg:flex items-center gap-3 flex-1 max-w-sm" ref={searchWrapperRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search glasses..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:border-[#2F465E] focus:ring-1 focus:ring-[#2F465E] transition-all"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => { setShowResults(false); setSearchQuery(''); }}
                      >
                        {product.image && (
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-[#2F465E] font-semibold">
                            ₦{product.price?.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                      No glasses found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {/* AR Try-on button */}
            <Link
              to={routePath.GlassTryOn}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2F465E] hover:bg-[#1a2d3d] px-3 py-2 rounded-full transition-colors"
            >
              <FiCamera className="w-3.5 h-3.5" />
              Try AR
            </Link>

            {/* Cart */}
            <Link
              to={routePath.CART}
              className="relative text-[#2F465E] hover:text-[#1a2d3d] transition-colors"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="w-6 h-6" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2F465E] text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
        } bg-white`}
      >
        <div className="px-4 py-4 space-y-1">
          {/* Mobile search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search glasses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:border-[#2F465E]"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#2F465E]/10 text-[#2F465E]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to={routePath.GlassTryOn}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 mt-3 py-2.5 px-3 bg-[#2F465E] text-white rounded-lg text-sm font-medium"
          >
            <FiCamera className="w-4 h-4" />
            Try AR Glasses
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
