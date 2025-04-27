import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../utils/AuthProvider";
import { useState } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="flex flex-wrap md:justify-start py-3 md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 relative">
        <nav className="relative max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex items-center justify-between py-2 md:hidden">
            <Link
              className="flex-none font-semibold text-xl text-black"
              aria-label="Brand"
              to="/"
            >
              Client Care System
            </Link>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:justify-between">
            <div className="flex items-center gap-x-1">
              <Link
                className="flex-none font-semibold text-xl text-black"
                aria-label="Brand"
                to="/"
              >
                Client Care System
              </Link>
            </div>

            {/* Search Bar - Desktop (only shown when logged in) */}
            {accessToken && <SearchBar />}

            {/* Navigation Links - Desktop */}
            <div className="flex items-center gap-x-1.5">
              {!accessToken ? (
                <Link
                  to="/login"
                  className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700"
                >
                  Sign in
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <Link
                      className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                      to="/create_program"
                    >
                      Create Program
                    </Link>
                    <Link
                      className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                      to="/add_patient"
                    >
                      Add Patient
                    </Link>
                    <Link
                      className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                      to="/dashboard"
                    >
                      Programs
                    </Link>
                    <Link
                      className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                      to="/patients"
                    >
                      Patients
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            className={`${isMenuOpen ? "block" : "hidden"} md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50`}
          >
            {/* Search Bar - Mobile (only shown when logged in) */}
            {accessToken && (
              <div className="px-4 pt-3 pb-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links - Mobile */}
            <div className="px-2 pb-3 space-y-1">
              {!accessToken ? (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  Sign in
                </Link>
              ) : (
                <>
                  <Link
                    to="/create_program"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Create Program
                  </Link>
                  <Link
                    to="/add_patient"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Add Client
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Programs
                  </Link>
                  <Link
                    to="/patients"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Clients
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
