import { Link } from "react-router";
import bgImg from "../../../assets/images/bg.jpeg";

const Slide = ({ title, subtitle, image, bgGradient }) => {
  return (
    <section
      className="w-full min-h-[600px] md:h-[650px] bg-cover bg-center flex justify-center items-center px-4 md:px-8 relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: bgGradient }}
      ></div>

      <div className="absolute top-20 left-10 w-24 h-24 bg-amber-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-200/25 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-black text-amber-900 leading-tight mb-4 font-serif">
            {title}
          </h1>
          <p className="text-lg text-amber-800/90 my-6 font-sans leading-relaxed max-w-md mx-auto md:mx-0">
            {subtitle}
          </p>

          <Link to="/shop" className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
            <button className="w-full sm:w-auto bg-gradient-to-r from-amber-900 to-orange-200 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-900 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 justify-center">
              🛒 Shop Fresh Now
            </button>
            <button className="w-full sm:w-auto border-2 border-amber-900 text-amber-900 px-6 py-3 rounded-full font-medium hover:bg-amber-800 hover:text-white transition-all duration-300 text-center">
              View All Products
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-lg"></div>
            <img
              className="relative max-w-full md:max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              src={image}
              alt="Product"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide;
