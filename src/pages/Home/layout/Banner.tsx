
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'



// import Swiper styles


import banner1 from "../../../assets/images/iglasss1.jpg"; // Update with correct paths
import banner2 from "../../../assets/images/iglasss2.jpg"; // Update with correct paths
import banner3 from "../../../assets/images/iglasss3.jpg"; // Update with correct paths


const Banner = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return `<span class="${className} custom-bullet"></span>`;
    },
  };
  return (
    <div className="relative   rounded-lg overflow-hidden mt-[5rem]">
    <Swiper
      pagination={pagination}
      loop={true}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={banner1} alt="Banner 1" className="slide-img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner2} alt="Banner 2" className="slide-img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner3} alt="Banner 3" className="slide-img" />
      </SwiperSlide>
    </Swiper>
    <p className="md:w-[50%] w-full leading-8 md:text-2xl text-xl md:ml-5 ml-0 mt-10" style={{fontFamily: 'NexaBold, sans-serif'}}>
    Welcome to Iglasss where style meets vision! Your perfect frames await, so dive in and discover eyewear that’s made to match your mood, your look, and your lifestyle.
    </p>
  </div>
  );
};

export default Banner;
