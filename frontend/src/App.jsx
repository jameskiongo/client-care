import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Root from "./pages/Root";
import AuthProvider from "./utils/AuthProvider";
import PrivateRoutes from "./utils/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LoginPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<HomePage />} />
      </Route>
    </Route>,
  ),
);
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
