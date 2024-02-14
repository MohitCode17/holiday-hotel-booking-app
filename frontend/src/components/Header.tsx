import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-primary">
      <div className="navbar container mx-auto px-2">
        <div className="navbar-start">
          {/* Navbar for Mobile Device */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link to="/my-bookings">My Booking</Link>
                  </li>
                  <li>
                    <Link to="/my-hotels">My Hotels</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to={"/"}
            className="text-2xl text-white font-bold tracking-tight"
          >
            Holiday.com
          </Link>
        </div>
        {/* Navbar for Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/my-bookings">My Booking</Link>
                </li>
                <li>
                  <Link to="/my-hotels">My Hotels</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link
              to="/sign-in"
              className="px-3 py-2 bg-white text-primarySoft text-sm font-semibold flex items-center hover:bg-blue-50 rounded-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
