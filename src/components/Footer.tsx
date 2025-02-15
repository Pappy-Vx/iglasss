import { Link } from 'react-router-dom';
import { routePath } from '../utils/routePath';
import Logo from '../../public/logo.png';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to={routePath.HOME} className="block">
              <img src={Logo} alt="BetaShip Logo" className="h-16 w-auto" />
            </Link>
            <p className="text-gray-600">
              Nigeria's trusted registered medical supply company.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-3">
              {['Surgical', 'Laboratory Equipment', 'Dental', 'Medical', 'Implants'].map((category) => (
                <li key={category}>
                  <Link
                    to={routePath.PRODUCTS}
                    className="text-gray-600 hover:text-[#330066] transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Useful Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: routePath.ABOUT },
                { name: 'Shop', path: routePath.PRODUCTS },
                { name: 'Contact Us', path: routePath.CONTACT },
                { name: 'Delivery & Return', path: '/delivery-return' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-[#330066] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="https://twitter.com/betaship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#330066] transition-colors"
                >
                  <FaXTwitter className="w-5 h-5" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://instagram.com/betaship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#330066] transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiPhone className="w-5 h-5" />
                  <span>+234 814 666 4972</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMail className="w-5 h-5" />
                  <span>Email:</span>
                  <a 
                    href="mailto:info@betaship.com.ng"
                    className="text-[#330066] hover:underline"
                  >
                    info@betaship.com.ng
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-center md:text-left">
              {new Date().getFullYear()} BetaShip. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy-policy"
                className="text-gray-600 hover:text-[#330066] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms"
                className="text-gray-600 hover:text-[#330066] transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;