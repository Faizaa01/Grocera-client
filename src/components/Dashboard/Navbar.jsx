import { FiMenu, FiX, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import pfp from "../../assets/images/pfp.jpeg";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = ({ sidebarOpen }) => {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar bg-violet-200 shadow-md px-4 border-b border-black">
      {/* Sidebar toggle (mobile) */}
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          {sidebarOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </label>
      </div>

      {/* Title */}
      <div className="flex-1 px-2">
        <h2 className="text-lg font-serif font-semibold tracking-wide">Dashboard</h2>
      </div>

      {/* Profile Dropdown */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-offset-2 ring-violet-400">
              <img alt="User avatar" src={pfp} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-56"
          >
            <li>
              <Link to="/dashboard/profile" className="flex items-center gap-2">
                <FiUser className="h-4 w-4 text-fuchsia-600" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center gap-2">
                <FiSettings className="h-4 w-4 text-fuchsia-600" />
                Settings
              </Link>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
