import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
const slides = [
  {
    id: 1,
    title: "NEW COLLECTION",
    subtitle: "SUMMER 2020",
    desc: "We know how large objects will act, but things on a small scale.",
    btnText: "SHOP NOW",
    img: "/slider1.jpg",
    bgColor: "bg-[#23A6F0]"
  },
  {
    id: 2,
    title: "WOMEN COLLECTION",
    subtitle: "SPRING 2020",
    desc: "Discover our new range of spring outfits for women.",
    btnText: "SHOP NOW",
    img: "/slider2.jpg",
    bgColor: "bg-[#23856D]"
  },
];

const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`w-full h-[600px] md:h-[700px] relative flex ${slide.bgColor}`}>
              <div className="container mx-auto px-4 md:px-8 flex">
                {/* Sol taraf - İçerik */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-white text-base tracking-wider mb-6">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white text-lg mb-8 opacity-90 max-w-lg">
                    {slide.desc}
                  </p>
                  <button className="bg-[#2DC071] hover:bg-[#25a35f] transition-colors text-white font-bold px-10 py-4 text-xl tracking-wider w-fit"
                  onClick={() => {
                    navigate("/shop");
                  }}
                  >
                    Shop Now
                  </button>
                </div>
                
                {/* Sağ taraf - Resim */}
                <div className="hidden md:block w-1/2 relative">
                  <img 
                    src={slide.img}
                    alt={slide.title}
                    className="absolute right-0 h-[700px] object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
