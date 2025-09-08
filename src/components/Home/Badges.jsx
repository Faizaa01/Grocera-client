import { Truck, Award, Headphones, Wheat, MessageCircleQuestionMark } from "lucide-react"
import { LuMailQuestion } from "react-icons/lu";

const badges = [
  {
    icon: Truck,
    title: "FREE SHIPPING",
    description: "ON ORDER OVER $100",
    bgColor: "bg-purple-300",
    iconColor: "text-white",
  },
  {
    icon: Wheat,
    title: "ALWAYS FRESH",
    description: "PRODUCT WELL PACKAGE",
    bgColor: "bg-stone-400",
    iconColor: "text-white",
  },
  {
    icon: Award,
    title: "SUPERIOR QUALITY",
    description: "QUALITY PRODUCTS",
    bgColor: "bg-red-300",
    iconColor: "text-white",
  },
  {
    icon: LuMailQuestion,
    title: "SUPPORT",
    description: "24/7 SUPPORT",
    bgColor: "bg-blue-300",
    iconColor: "text-white",
  },
]

const Badges = () => {
  return (
    <section className="py-16 bg-white bg-">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Icon Circle */}
              <div

                className={`
                w-24 h-24 rounded-full ${badge.bgColor} 
                flex items-center justify-center mb-6
                transition-transform duration-300 group-hover:scale-110
                shadow-lg
              `}
              >
                <badge.icon className={`w-10 h-10 ${badge.iconColor}`} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">{badge.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 font-medium">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Badges
