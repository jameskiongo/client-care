import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAddPatientMutation } from "../../services";

function PatientAdd() {
  const navigate = useNavigate();
  const [createPatient, { isLoading }] = useAddPatientMutation();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Full name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female", "other"], "Invalid gender selection"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createPatient(values).unwrap();
        toast.success("Patient added successfully!");
        resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to add patient:", error);
        toast.error(
          error.data?.message || "Failed to add patient. Please try again.",
        );
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="mt-7 w-full max-w-md border border-gray-200 rounded-lg shadow-md p-8 bg-white">
        <div className="w-full">
          <div className="w-full">
            <div className="w-full">
              <h2 className="text-3xl font-bold my-4 capitalize">
                Add New Patient
              </h2>
            </div>
            <div className="w-full">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Enter patient's full name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Enter patient's email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Enter patient's phone number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.gender && formik.errors.gender
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.gender}
                    </div>
                  )}
                </div>

                <div className="grid">
                  <button
                    type="submit"
                    disabled={isLoading || !formik.isValid}
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
                      "Add Patient"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientAdd;
