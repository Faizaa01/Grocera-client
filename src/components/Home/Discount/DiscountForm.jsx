import { Mail } from "lucide-react"
import bg from "../../../assets/images/bg0.jpeg";

const DiscountForm = () => {
  return (
    <section className="w-full h-[400px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
          style={{ backgroundImage: `url(${bg})` }}
        >

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
              Get 30% Off Your First Purchase
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed"> New to Grocera? Enjoy a special welcome discount on your first order. </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0" />
                Free shipping on orders over $50
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0" />
                Valid for 30 days
              </li>
            </ul>
          </div>

          {/* Right Form */}
          <div className="space-y-6 p-8">
            <form className="space-y-4" noValidate>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 border-2 bg-white border-gray-300 rounded-lg focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none placeholder-gray-400 text-gray-900 transition"
                  required
                  aria-label="Your Email Address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
              >
                Get My 25% Discount Code
              </button>
            </form>

            <p className="text-md text-gray-700 text-center">
              * Discount code will be sent to your email. Valid for first-time purchases only.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscountForm
