import { useEffect, useState } from "react";
import apiClient from "../../../services/api-client";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/categories")
      .then((res) => setCategories(res.data.results))
      .catch((err) => console.error("Failed to fetch categories:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 min-h-[300px]">
        <span className="loading loading-spinner loading-xl text-black"></span>
      </div>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl text-gray-700 font-bold">Browse Categories</h2>
        <Link
          to="/categories"
          className="bg-red-300 px-6 py-2 rounded-full text-lg"
        >
          View All
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        loop={categories.length > 1}
        slidesPerView={Math.min(4, categories.length)}
        breakpoints={{
          320: { slidesPerView: Math.min(1, categories.length) },
          640: { slidesPerView: Math.min(2, categories.length) },
          1024: { slidesPerView: Math.min(4, categories.length) },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <CategoryItem index={index} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
