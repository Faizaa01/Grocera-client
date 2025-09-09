import { HiShoppingBag } from "react-icons/hi2";
import {
  FiArchive,
  FiBarChart2,
  FiCheckCircle,
  FiPackage,
  FiPlusCircle,
  FiPrinter,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { Link, useLocation } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const customerMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/shop", icon: FiPackage, label: "Products" },
    { to: "/dashboard/wishlist", icon: FiCheckCircle, label: "Wishlists" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
    { to: "/dashboard/orders", icon: FiArchive, label: "Orders" },
    { to: "/dashboard/deposit", icon: FiPrinter, label: "Deposit" },
  ];
  
  const adminMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/products/add", icon: FiPlusCircle, label: "Add Product" },
    { to: "/shop", icon: FiPackage, label: "Products" },
    { to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
    { to: "/categories", icon: FiTag, label: "Categories" },
    { to: "/dashboard/orders", icon: FiArchive, label: "Orders" },
    { to: "/dashboard/users", icon: FiUsers, label: "Users" },
  ];

  const menuItems = user.is_staff || user.groups?.includes("seller") ? adminMenus : customerMenus;

  return (
    <div className="sticky top-0 drawer-side z-10 font-serif border border-black">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="menu bg-gradient-to-b from-violet-200 via-green-100 to-pink-200 w-68 min-h-full p-5 text-gray-800 flex flex-col shadow-md">
        {/* Logo Section */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-3 px-2">
            <div className="">
              <HiShoppingBag className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-extrabold tracking-wide">
              Grocera
            </h1>
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="menu menu-md gap-2 flex-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    isActive
                      ? "bg-red-300 text-white shadow-sm"
                      : "hover:bg-blue-200"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="pt-6 text-xs text-gray-500 border-t">
          © 2025 Grocera Admin
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
