import bg from "../../../assets/images/bg1.jpeg";
import Img from "../../../assets/images/im-6.png";
import DiscountTimer from "./DiscountTimer";
const DiscountSection = () => {
  return (
    <section
      className="w-full h-[550px] mx-auto bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container w-full flex flex-col md:flex-row items-center justify-around px-4 md:px-8">
        {/* Left Content  */}
        <div className="max-w-md md:w-1/2 flex justify-center">
          <img className="w-2/3 md:w-full" src={Img} />{" "}
        </div>

        {/* Right Image  */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <p className="text-indigo-500 text-xl font-medium font-serif py-3">Best price for you</p>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-gray-900">
            20% Discount On All Items. Deal of the day !!!
          </h1>
          {/* CountDown Timer  */}
          <DiscountTimer />
          <button className="hover:bg-lime-700 hover:text-white px-6 py-3 font-bold font-serif rounded-full shadow-md">
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;