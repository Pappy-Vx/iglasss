import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { routePath } from '../../../utils/routePath';

import banner1 from '../../../assets/images/iglasss1.jpg';
import banner2 from '../../../assets/images/iglasss2.jpg';
import banner3 from '../../../assets/images/iglasss3.jpg';

const slides = [
  {
    img: banner1,
    tag: 'New Arrivals 2025',
    headline: 'See the World in Style',
    sub: 'Curated frames that match your mood, your look, your life.',
    cta: 'Shop Now',
    ctaPath: routePath.PRODUCTS,
    ctaAlt: 'Try AR',
    ctaAltPath: routePath.GlassTryOn,
    align: 'left',
  },
  {
    img: banner2,
    tag: 'Summer Collection',
    headline: 'Bold Frames, Brighter Days',
    sub: 'From cat-eyes to aviators — find your perfect summer look.',
    cta: 'Explore Collection',
    ctaPath: routePath.SHOP,
    ctaAlt: 'Try Virtual Try-On',
    ctaAltPath: routePath.GlassTryOn,
    align: 'right',
  },
  {
    img: banner3,
    tag: 'AR Technology',
    headline: 'Try Before You Buy',
    sub: 'Use our AR try-on to see exactly how frames look on your face.',
    cta: 'Try AR Now',
    ctaPath: routePath.GlassTryOn,
    ctaAlt: 'Browse All',
    ctaAltPath: routePath.PRODUCTS,
    align: 'left',
  },
];

const pagination = {
  clickable: true,
  renderBullet: (_: number, className: string) =>
    `<span class="${className} custom-bullet"></span>`,
};

const Banner = () => {
  return (
    <div className="relative mt-16 overflow-hidden">
      <Swiper
        pagination={pagination}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="banner-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden">
              {/* Background image */}
              <img
                src={slide.img}
                alt={slide.headline}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 ${
                  slide.align === 'right'
                    ? 'bg-gradient-to-l from-black/70 via-black/30 to-transparent'
                    : 'bg-gradient-to-r from-black/70 via-black/30 to-transparent'
                }`}
              />
              {/* Content */}
              <div
                className={`absolute inset-0 flex items-center px-8 md:px-16 lg:px-24 ${
                  slide.align === 'right' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-lg text-white ${
                    slide.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                  style={{ animation: 'fade-up 0.9s ease forwards' }}
                >
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 mb-3 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    {slide.tag}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-lg">
                    {slide.headline}
                  </h1>
                  <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
                    {slide.sub}
                  </p>
                  <div className={`flex gap-3 flex-wrap ${slide.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    <Link
                      to={slide.ctaPath}
                      className="bg-white text-[#2F465E] hover:bg-[#2F465E] hover:text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      to={slide.ctaAltPath}
                      className="border-2 border-white/70 text-white hover:bg-white/20 font-medium px-6 py-3 rounded-full transition-all duration-300 text-sm backdrop-blur-sm"
                    >
                      {slide.ctaAlt}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Brand tagline */}
      <div className="bg-[#2F465E] text-white py-4 text-center">
        <p className="text-sm md:text-base font-light tracking-wide opacity-90">
          Welcome to Iglasss — where style meets vision.&nbsp;
          <span className="font-semibold">Your perfect frames await.</span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
