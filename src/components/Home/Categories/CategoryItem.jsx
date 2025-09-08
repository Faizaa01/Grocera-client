import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import img1 from "../../../assets/images/img1.jpeg";
import img2 from "../../../assets/images/img2.jpeg";
import img3 from "../../../assets/images/img3.jpeg";
import img4 from "../../../assets/images/img4.jpeg";
import img5 from "../../../assets/images/img8.jpeg";

const CategoryItem = ({ index, category }) => {
  const bg = [img1, img2, img3, img4, img5];
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/shop?category=${category.id}`);
  };

  return (
    <div
      className="m-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url(${bg[index]})` }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-16">
          <div className="h-10 w-10 rounded-full bg-red-300 text-white flex items-center justify-center font-bold text-xl">
            {category.name.charAt(0)}
          </div>
          <span className="text-sm text-gray-600 bg-white/70 px-2 py-1 rounded-full">
            {category.product_count} Items
          </span>
        </div>
        <h3 className="text-xl font-bold">{category.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-grow">
          {category.description}
        </p>
        <button
          onClick={handleExplore}
          className="text-gray-900 font-bold hover:text-pink-600 transition-colors flex items-center"
        >
          Explore
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
