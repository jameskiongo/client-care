import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCreateProgramMutation } from "../../services/apis/programs";

function ProgramCreate() {
  const navigate = useNavigate();
  const [createProgram, { isLoading }] = useCreateProgramMutation();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Program name is required")
      .min(3, "Program name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    start_date: Yup.date()
      .required("Start date is required")
      .min(new Date(), "Start date cannot be in the past"),

    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date must be after start date"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createProgram(values).unwrap();
        toast.success("Program created successfully!");
        resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to create program:", error);
        toast.error(
          error.data?.message || "Failed to create program. Please try again.",
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
                Create New Program
              </h2>
            </div>
            <div className="w-full">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Program Name
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
                    placeholder="Enter program name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Enter program description"
                  ></textarea>
                  {formik.touched.description && formik.errors.description && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                {/* Start Date */}
                <div className="mb-4">
                  <label
                    htmlFor="start_date"
                    className="block text-sm font-medium mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.start_date}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.start_date && formik.errors.start_date
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {formik.touched.start_date && formik.errors.start_date && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.start_date}
                    </div>
                  )}
                </div>

                {/* End Date */}
                <div className="mb-4">
                  <label
                    htmlFor="end_date"
                    className="block text-sm font-medium mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.end_date}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${
                      formik.touched.end_date && formik.errors.end_date
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {formik.touched.end_date && formik.errors.end_date && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.end_date}
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
                      "Create Program"
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

export default ProgramCreate;
