import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const token = localStorage.getItem("accessToken");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
