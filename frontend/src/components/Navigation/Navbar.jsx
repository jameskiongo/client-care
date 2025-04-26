import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../utils/AuthProvider";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const accessToken = localStorage.getItem("accessToken");
  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  return (
    <div>
      {/* ========== HEADER ========== */}
      <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200">
        <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-x-1">
            <Link
              className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80"
              aria-label="Brand"
              to="/"
            >
              Client Care System
            </Link>
          </div>

          <div
            id="hs-header-base"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
            aria-labelledby="hs-header-base-collapse"
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                <div className="grow">
                  {/* <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1"> */}
                  {/* <Link */}
                  {/*   className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100" */}
                  {/*   to="/" */}
                  {/* > */}
                  {/*   dashboard */}
                  {/* </Link> */}
                  {/* </div> */}
                </div>

                <div className="my-2 md:my-0 md:mx-2">
                  {/* <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300"></div> */}
                </div>

                {/* Button Group */}
                <div className=" flex flex-wrap items-center gap-x-1.5">
                  {!accessToken ? (
                    <>
                      <Link
                        to="/login"
                        className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Sign in
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                        <Link
                          className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100"
                          to="/dashboard"
                        >
                          Create New Program
                        </Link>
                        <Link
                          className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100"
                          to="#"
                        >
                          Add New Client
                        </Link>

                        <Link
                          className="p-2 capitalize flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100"
                          to="/dashboard"
                        >
                          dashboard
                        </Link>
                      </div>

                      <Link
                        onClick={handleLogout}
                        className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
                {/* End Button Group */}
              </div>
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </div>
  );
}

export default Navbar;
