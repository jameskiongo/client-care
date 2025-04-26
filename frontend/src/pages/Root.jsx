import { Outlet } from "react-router";
import Navbar from "../components/Navigation/Navbar";
export default function Root() {
  return (
    <div>
      <div className="">
        <div>
          <Navbar />
        </div>
        {/* <div className="hidden lg:block w-[80px] shadow-md fixed top-[65px] left-0 h-screen"> */}
        <div className="bg-gray-100 w-full shadow-md fixed top-[65px] left-0 h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
