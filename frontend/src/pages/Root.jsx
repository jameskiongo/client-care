import { Outlet } from "react-router";
export default function Root() {
  return (
    <div>
      <div className="">
        {/* <div className="hidden lg:block w-[80px] shadow-md fixed top-[65px] left-0 h-screen"> */}
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
