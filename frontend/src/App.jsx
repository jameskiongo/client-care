import HomePage from "./pages/HomePage";
import IndividualProgram from "./pages/IndividualProgram";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProgramCreate from "./pages/ProgramCreate";
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
      <Route index element={<LandingPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/program/:program_id" element={<IndividualProgram />} />
        <Route path="/create_program" element={<ProgramCreate />} />
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
