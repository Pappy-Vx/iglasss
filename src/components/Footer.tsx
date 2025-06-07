import { Link } from 'react-router-dom';
import { routePath } from '../utils/routePath';
import Logo from '../assets/images/logofooter.png';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaLocationPin,  FaPhone,  } from 'react-icons/fa6';
import {FaTelegramPlane} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2F465E] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to={routePath.HOME} className="block">
              <img src={Logo} alt="BetaShip Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Categories */}
          <div>
          <h3 className="text-lg font-semibold  mb-4 uppercase">Corporate Head Offices</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  "
                >
                    <FaLocationPin className='w-5 h-5' />
                    <span > Lagos, Nigeria</span>
                </Link>
              </li>
              <li>
                <Link
                to="tel:+2348146664972"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 "
                >
                  <FaPhone className='w-5 h-5' />
                  <span >+234 814 666 4972</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold  mb-4 uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Sunglasses', path: routePath.ABOUT },
                { name: 'Eyeglasses', path: routePath.PRODUCTS },
                { name: 'Lenses', path: routePath.CONTACT },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className=" hover:text-[#000000] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold  mb-4 uppercase">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="https://twitter.com/betaship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  hover:text-[#000000] transition-colors"
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
                  className="flex items-center gap-2  hover:text-[#000000] transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 ">
                  <FiMail className="w-5 h-5" />
                  <a 
                    href="mailto:kolawolekolapo20@gmail.com"
                    className="text-white hover:underline"
                  >
                    click here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className=" text-center md:text-left">
              {new Date().getFullYear()} Iglasss. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy-policy"
                className=" hover:text-[#000000] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms"
                className=" hover:text-[#000000] transition-colors"
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