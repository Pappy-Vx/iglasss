import { Link } from 'react-router-dom';
import { routePath } from '../utils/routePath';
import Logo from '../../public/logo.png';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaLocationPin,  FaPhone,  } from 'react-icons/fa6';
import {FaTelegramPlane} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to={routePath.HOME} className="block">
              <img src={Logo} alt="BetaShip Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Categories */}
          <div className=''>
            <h3 className="text-lg font-semibold  mb-4 uppercase">Corporate Head Offices</h3>
            <div className='flex flex-row gap-3 items-center justify-center '>
              <FaLocationPin className='w-5 h-5' />
              <span className='text-sm'>38 Eric Moore Road, Surelere, Lagos, Nigeria</span>
            </div>
            <div className='flex flex-row gap-3 items-center justify-center '>
              <FaLocationPin className='w-5 h-5' />
              <span className='text-sm'>38 Eric Moore Road, Surelere, Lagos, Nigeria</span>
            </div>
            <div className='flex flex-row gap-3 items-center justify-center '>
              <FaPhone className='w-5 h-5' />
              <span className='text-sm'>+234 8095 9990 00</span>
            </div>
            <div className='flex flex-row gap-3 items-center justify-center '>
              <FaTelegramPlane className='w-5 h-5' />
              <span className='text-sm'>lush@tolaram.com</span>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold  mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Braids', path: routePath.ABOUT },
                { name: 'Crotchet', path: routePath.PRODUCTS },
                { name: 'Weaves', path: routePath.CONTACT },
                { name: 'Kids', path: '/delivery-return' },
                { name: 'Lush Hair Care', path: '/delivery-return' },
                { name: 'Professional School', path: '/delivery-return' },
                { name: 'Pink Celebreties', path: '/delivery-return' },
                { name: 'Pink Belle', path: '/delivery-return' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className=" hover:text-pink-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold  mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="https://twitter.com/betaship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  hover:text-pink-600 transition-colors"
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
                  className="flex items-center gap-2  hover:text-pink-600 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 ">
                  <FiPhone className="w-5 h-5" />
                  <span>+234 814 666 4972</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 ">
                  <FiMail className="w-5 h-5" />
                  <span>Email:</span>
                  <a 
                    href="mailto:info@betaship.com.ng"
                    className="text-white hover:underline"
                  >
                    info@lushhair.com
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
              {new Date().getFullYear()} Lush Hair. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy-policy"
                className=" hover:text-pink-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms"
                className=" hover:text-pink-600 transition-colors"
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