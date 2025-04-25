import { useFormik } from "formik";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useLoginMutation } from "../services";
import * as Yup from "yup";
function LoginPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();
        const { access, refresh } = response;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        handleLogin();
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Login failed");
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Hero */}
      <div className="max-w-[85rem] h-full flex items-center justify-center  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
              Client care system
            </h1>
            <p className="mt-3 text-lg text-gray-800">
              Health program management system for enrolling and tracking client
              information
            </p>
            <div>
              <h2 className="text-3xl font-bold my-4">Please login</h2>
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="hs-hero-name-2"
                    className="block text-sm font-medium"
                  >
                    <span className="sr-only">Full name</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="hs-hero-name-2"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="hs-hero-email-2"
                    className="block text-sm font-medium"
                  >
                    <span className="sr-only">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="hs-hero-email-2"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="grid">
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* End Col */}

          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <img
              className="w-full rounded-xl"
              src="https://thumbs.dreamstime.com/b/medical-hospital-healthcare-vector-infographics-doctors-departments-poster-cardiology-heart-pills-stethoscope-88016897.jpg"
              alt="Hero Image"
            />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </div>
  );
}

export default LoginPage;
