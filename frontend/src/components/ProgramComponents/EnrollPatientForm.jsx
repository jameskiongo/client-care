import toast from "react-hot-toast";
import {
  useGetAllPatientsQuery,
  useEnrollPatientToProgramMutation,
} from "../../services";

function EnrollPatientForm({ toggleEnrollForm, program_id }) {
  const {
    data: patients,
    error: patientsError,
    isLoading,
  } = useGetAllPatientsQuery();
  const [enrollPatient, { isLoading: isSubmitting }] =
    useEnrollPatientToProgramMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const client_id = formData.get("patientId");

    try {
      await enrollPatient({ program_id, client_id }).unwrap();
      toast.success("Patient enrolled successfully!");
      window.location.reload(); // Refresh the page to show updated data

      toggleEnrollForm(); // Close form on success
    } catch (error) {
      console.error("Enrollment error:", error);

      if (error?.data?.non_field_errors?.length > 0) {
        toast.error(error.data.non_field_errors[0]);
      } else if (error?.data) {
        toast.error("Failed to enroll patient");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg relative">
      <button
        onClick={toggleEnrollForm}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <h3 className="text-lg font-medium mb-4">Enroll a New Patient</h3>

      {patientsError ? (
        <p className="text-red-500 mb-4">Error loading patients</p>
      ) : isLoading ? (
        <p className="mb-4">Loading patients...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Patient
            </label>
            <select
              name="patientId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              disabled={isSubmitting}
            >
              <option value="">Select a patient</option>
              {patients?.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} ({patient.email})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full" />
            ) : (
              "Enroll Patient"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default EnrollPatientForm;
