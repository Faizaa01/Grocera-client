import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import coffee from "../../../assets/images/im-1.png";
import fruit from "../../../assets/images/im-4.png";
import drinks from "../../../assets/images/im-2.png";
import vegetables from "../../../assets/images/im-0.png";
import milky from "../../../assets/images/im-3.png";

import Slide from "./slide";

const Hero = () => {
  const slides = [
    {
      title: "Premium Coffee Collection",
      subtitle: "Start your morning right with our freshly roasted, ethically sourced coffee beans. Rich aroma, perfect taste, delivered fresh to your door.",
      image: coffee,
      bgGradient: "linear-gradient(135deg, rgba(120, 53, 15, 0.3), rgba(180, 83, 9, 0.2))"
    },
    {
      title: "Garden Fresh Fruits",
      subtitle: "Handpicked seasonal fruits bursting with natural sweetness and nutrients. From crisp apples to juicy oranges, taste the difference freshness makes.",
      image: fruit,
      bgGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(252, 211, 77, 0.2))"
    },
    {
      title: "Natural Fruit Beverages",
      subtitle: "Pure, refreshing fruit drinks made from real fruits with no artificial flavors. Healthy hydration that tastes as good as it makes you feel.",
      image: drinks,
      bgGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(251, 146, 60, 0.2))"
    },
    {
      title: "Farm Fresh Vegetables",
      subtitle: "Crisp, colorful vegetables straight from local farms. Packed with vitamins and flavor, our organic vegetables bring health to your table.",
      image: vegetables,
      bgGradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.3), rgba(132, 204, 22, 0.2))"
    },
    {
      title: "Creamy Milky Way Treats",
      subtitle: "Indulge in our premium Tesco Milky Way collection. Rich, creamy, and irresistibly smooth - the perfect treat for any time of day.",
      image: milky,
      bgGradient: "linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(205, 133, 63, 0.2))"
    }
  ];

  return (
    <>
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-amber-600",
          bulletClass: "swiper-pagination-bullet !bg-amber-300 !opacity-50"
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide
              title={slide.title}
              subtitle={slide.subtitle}
              image={slide.image}
              bgGradient={slide.bgGradient}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;