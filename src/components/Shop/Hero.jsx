import bg from "../../assets/images/bg2.jpeg";
import Img from "../../assets/images/img6.jpeg";
import Img1 from "../../assets/images/img7.jpeg";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[500px] mx-auto bg-cover bg-center flex items-center px-6 md:px-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative container w-full flex items-center justify-between">

        <div className="w-1/4 flex justify-center">
          <img
            className="w-full max-w-[300px] rounded-full shadow-lg"
            src={Img}
            alt="Shop product"
          />
        </div>
        
        <div className="w-3/4 text-white text-center md:text-left px-6">
          <h1 className="font-serif text-center text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Discover All the Best Products
          </h1>
          <p className="text-lg mb-6 text-center font-serif text-stone-200">
            From daily essentials to premium picks, everything you need in one
            place.
          </p>
        </div>

        <div className="w-1/4 flex justify-center">
          <img
            className="w-full max-w-[300px] rounded-full shadow-lg"
            src={Img1}
            alt="Shop product"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
