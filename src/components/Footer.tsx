import { Link } from 'react-router-dom';
import { routePath } from '../utils/routePath';
import Logo from '../assets/images/logofooter.png';
import { FiMail } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaLocationPin, FaPhone } from 'react-icons/fa6';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1D37] text-white">
      {/* Main footer grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link to={routePath.HOME}>
              <img src={Logo} alt="Iglasss" className="h-12 w-auto" />
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Premium eyewear for every face, mood, and lifestyle. Lagos-born, Nigeria-wide.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://instagram.com/iglasss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/iglasss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:azeezkolapo05@gmail.com"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FiMail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40 mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Eyeglasses', path: routePath.New },
                { label: 'Sunglasses', path: routePath.SHOP },
                { label: 'Contact Lenses', path: routePath.PRODUCTS },
                { label: 'AR Try-On', path: routePath.GlassTryOn },
                { label: 'New Arrivals', path: routePath.New },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Iglasss', path: routePath.ABOUT },
                { label: 'Contact Us', path: routePath.CONTACT },
                { label: 'Privacy Policy', path: routePath.POLICY },
                { label: 'Terms & Conditions', path: '/terms' },
                { label: 'Returns & Refunds', path: routePath.POLICY },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <FaLocationPin className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                <span>Lagos, Nigeria<br /><span className="text-white/35 text-xs">Island & Mainland locations</span></span>
              </li>
              <li>
                <a
                  href="tel:+2348146664972"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <FaPhone className="w-4 h-4 text-white/40 flex-shrink-0" />
                  +234 814 666 4972
                </a>
              </li>
              <li>
                <a
                  href="mailto:azeezkolapo05@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <FiMail className="w-4 h-4 text-white/40 flex-shrink-0" />
                  hello@iglasss.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {year} Iglasss. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to={routePath.POLICY} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
