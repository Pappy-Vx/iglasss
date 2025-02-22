
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'



// import Swiper styles


import banner1 from "../../../assets/images/home.png"; // Update with correct paths



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
        <img src={banner1} alt="Banner 2" className="slide-img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner1} alt="Banner 3" className="slide-img" />
      </SwiperSlide>
    </Swiper>
    <p className="md:w-[50%] w-full leading-8 md:text-2xl text-xl md:ml-5 ml-0 mt-10" style={{fontFamily: 'NexaBold, sans-serif'}}>
    Welcome to Lush Hair, where it's all about <strong>YOU!</strong>  Your hair journey starts here, so keep exploring and see what we've got for every vibe and version of you.
    </p>
  </div>
  );
};

export default Banner;
