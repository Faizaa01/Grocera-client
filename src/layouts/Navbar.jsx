import { Link } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import { CarTaxiFront, ShoppingCart } from 'lucide-react';
import pfp from "../assets/images/pfp.jpeg";
import useCartContext from '../hooks/useCartContext';

const Navbar = () => {
    const { user, logoutUser } = useAuthContext();
    const { cart } = useCartContext();
    return (
    <div className="navbar bg-gray-100 shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto w-full px-4">
            <div className="navbar-start flex items-center space-x-6">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    <a className="btn btn-ghost text-2xl lg:text-3xl font-bold text-stone-600"><ShoppingCart/> Grocera </a>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-xl z-50 mt-3 w-64 p-4 shadow-xl border border-amber-100">
                    <li className="mb-1">
                        <Link to="/" className="text-gray-800 hover:bg-stone-200 hover:text-stone-800 font-medium py-3 px-4 transition-all duration-200">
                            Home
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="/shop" className="text-gray-800 hover:bg-stone-100 hover:text-stone-800 font-medium py-3 px-4 transition-all duration-200">
                            Shop
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="/categories" className="text-gray-800 hover:bg-stone-100 hover:text-stone-800 font-medium py-3 px-4 transition-all duration-200">
                            Category
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="/dashboard" className="text-gray-800 hover:bg-stone-100 hover:text-stone-800 font-medium py-3 px-4 transition-all duration-200">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-800 hover:bg-stone-100 hover:text-stone-800 font-medium py-3 px-4 transition-all duration-200">
                            About
                        </Link>
                    </li>
                </ul>
                </div>
            </div>
            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <a className="btn btn-ghost text-2xl lg:text-3xl font-bold text-stone-600"><ShoppingCart/> Grocera </a>
                <ul className="menu menu-horizontal px-1 py-3 text-md mx-auto space-x-2 hidden lg:flex">
                    <li>
                        <Link to="/" className="text-gray-800 hover:bg-stone-100 hover:text-stone-600 rounded-lg font-medium px-4 py-2 transition-all duration-200 flex items-center gap-2">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="text-gray-800 hover:bg-stone-100 hover:text-stone-600 rounded-lg font-medium px-4 py-2 transition-all duration-200 flex items-center gap-2">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop" className="text-gray-800 hover:bg-stone-100 hover:text-stone-600 rounded-lg font-medium px-4 py-2 transition-all duration-200 flex items-center gap-2">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" className="text-gray-800 hover:bg-stone-100 hover:text-stone-600 rounded-lg font-medium px-4 py-2 transition-all duration-200 flex items-center gap-2">
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-800 hover:bg-stone-100 hover:text-stone-600 rounded-lg font-medium px-4 py-2 transition-all duration-200 flex items-center gap-2">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        {user ? (
        <div className="flex-none mr-5">
            {/* cart button */}
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-5">
                <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                <span className="badge badge-sm indicator-item">
                    {cart?.items?.length || 0}
                </span>
                </div>
            </div>
            <div
                tabIndex={0}
                className="card dropdown-content bg-base-100 z-1 mt-3 w-52 shadow-xl border border-gray-200 rounded-2xl">
                <div className="card-body space-y-2">
                <span className="text-lg font-semibold text-gray-800">{cart?.items?.length || 0} Items</span>
                <span className="text-neutral-500">Total: ${cart?.total_price || 0}</span>
                <div className="pt-2">
                    <Link to="dashboard/cart/">
                      <button className="btn btn-neutral w-full shadow-md hover:scale-[1.02] transition-transform">
                        View cart
                      </button>
                    </Link>
                </div>
                </div>
            </div>
            </div>
            
            {/* User Profile */}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-amber-100">
                    <div className="w-10 rounded-full ring-2 ring-stone-400 hover:ring-stone-600 transition-all duration-200">
                        <img
                            alt="User Profile"
                            src={pfp}
                            className="rounded-full"
                        />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-xl z-50 mt-3 w-64 p-3 shadow-xl border border-amber-100">
                    <li className="mb-1">
                        <Link to="dashboard/profile" className="hover:bg-gray-100 hover:text-amber-900 rounded-lg font-medium py-3 px-3 transition-all duration-200 flex items-center gap-3">
                            My Profile
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="dashboard/orders" className="hover:bg-gray-100 hover:text-amber-900 rounded-lg font-medium py-3 px-3 transition-all duration-200 flex items-center gap-3">
                            My Orders
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="dashboard/wishlist" className=" hover:bg-gray-100 hover:text-amber-900 rounded-lg font-medium py-3 px-3 transition-all duration-200 flex items-center gap-3">
                            Wishlist
                        </Link>
                    </li>
                    <li className="mb-1">
                        <a className="hover:bg-gray-100 hover:text-amber-900 rounded-lg font-medium py-3 px-3 transition-all duration-200 flex items-center gap-3">
                            Settings
                        </a>
                    </li>
                    <li className="border-t border-gray-200 mt-1 pt-1">
                        <a onClick={logoutUser} className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium py-3 px-3 transition-all duration-200 flex items-center gap-3">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>) : (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-neutral opacity-50">
              Login
            </Link>
            <Link to="/register" className="btn btn-neutral opacity-70">
              Register
            </Link>
          </div>
        )}
    </div>
    );
};

export default Navbar;