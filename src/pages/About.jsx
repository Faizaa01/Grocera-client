import img from '../assets/images/about.png';


const About = () => {
  return (
    <section className="bg-stone-200 min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={img}
            alt="Healthy groceries, fresh food representation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-[#6b4c3b] mb-4">About Grocera</h1>
          <p className="text-gray-700 text-lg mb-6">
            Grocera was founded with a passion for delivering fresh groceries, premium staples, and quality products right to your doorstep. Our mission is to make healthy living simple and affordable for everyone—offering unbeatable prices, fast delivery, and dedicated customer service.
          </p>
          <ul className="mb-4 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
              Curated selection of organic and locally sourced products
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
              Fast, free shipping on all orders over $50
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
              24/7 customer support and easy returns
            </li>
          </ul>
          <p className="text-gray-600 text-base">
            Join thousands of satisfied customers who trust Grocera for their daily food essentials and discover the difference!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
