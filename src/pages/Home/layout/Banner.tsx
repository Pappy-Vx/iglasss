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
    cta: 'Shop Now',
    ctaPath: routePath.PRODUCTS,
    ctaAlt: 'Try AR',
    ctaAltPath: routePath.GlassTryOn,
    align: 'left',
  },
  {
    img: banner2,
    cta: 'Explore Collection',
    ctaPath: routePath.SHOP,
    ctaAlt: 'Try Virtual Try-On',
    ctaAltPath: routePath.GlassTryOn,
    align: 'right',
  },
  {
    img: banner3,
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
              {/* Subtle gradient only at the bottom for button readability */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />

              {/* CTA buttons — bottom-aligned, respects slide alignment */}
              <div
                className={`absolute bottom-10 inset-x-0 flex gap-3 px-8 md:px-16 ${
                  slide.align === 'right' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Link
                  to={slide.ctaPath}
                  className="bg-white text-[#2F465E] hover:bg-[#2F465E] hover:text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 text-sm shadow-lg"
                >
                  {slide.cta}
                </Link>
                <Link
                  to={slide.ctaAltPath}
                  className="border-2 border-white/80 text-white hover:bg-white/20 font-medium px-6 py-3 rounded-full transition-all duration-300 text-sm backdrop-blur-sm"
                >
                  {slide.ctaAlt}
                </Link>
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
