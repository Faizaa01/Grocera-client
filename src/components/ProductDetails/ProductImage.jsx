import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Thumbs } from "swiper/modules";
import defaultImage from "../../assets/images/default.png";

const ProductImage = ({ images, productName }) => {
  const [thumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayImages = images && images.length > 0 ? images : [{ image: defaultImage }];

  return (
    <div className="rounded-lg border overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="product-main-slider"
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
      >
        {displayImages.map((obj, index) => (
          <SwiperSlide key={index}>
            <div
              className="aspect-square bg-base-100 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={obj.image}
                alt={productName}
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
            <div className="relative max-w-3xl w-full">
            <Swiper
                initialSlide={currentSlide}
                modules={[Navigation]}
                navigation
                className="product-lightbox-slider"
            >
                {displayImages.map((obj, index) => (
                <SwiperSlide key={index}>
                    <div className="flex justify-center">
                    <img
                        src={obj.image}
                        alt={productName}
                        className="max-h-screen object-contain"
                    />
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>

            <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 text-white text-3xl z-[100] bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
            >
                &times;
            </button>
            </div>
        </div>
        )}
    </div>
  );
};

export default ProductImage;
