import HomePage from "./pages/HomePage/HomePage";
import IndividualProgram from "./pages/ProgramPage/IndividualProgram";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProgramCreate from "./pages/ProgramPage/ProgramCreate";
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
import PatientProfile from "./pages/PatientPage/PatientProfile";
import PatientAdd from "./pages/PatientPage/PatientAdd";
import AllPatients from "./pages/PatientPage/AllPatients";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LandingPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/patients" element={<AllPatients />} />
        <Route path="/program/:program_id" element={<IndividualProgram />} />
        <Route path="/patient/:patient_id" element={<PatientProfile />} />
        <Route path="/create_program" element={<ProgramCreate />} />
        <Route path="/add_patient" element={<PatientAdd />} />
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
