import {
  useGetAllProgramsQuery,
  useEnrollPatientToProgramMutation,
} from "../../services";
import toast from "react-hot-toast";

function ProgramForm({ toggleEnrollForm, patient_id }) {
  const { data: programs, error, isLoading } = useGetAllProgramsQuery();
  const [enrollPatient, { isLoading: isSubmitting }] =
    useEnrollPatientToProgramMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const program_id = formData.get("programId");
    const client_id = patient_id;

    try {
      await enrollPatient({ program_id, client_id }).unwrap();
      toast.success("Patient enrolled successfully");
      toggleEnrollForm();
    } catch (err) {
      if (err.data?.non_field_errors) {
        toast.error(err.data.non_field_errors[0]);
      } else {
        toast.error("Failed to enroll patient");
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
      <h3 className="text-lg font-medium mb-4">Enroll to a New Program</h3>

      {error ? (
        <p className="text-red-500 mb-4">Error loading programs</p>
      ) : isLoading ? (
        <p className="mb-4">Loading programs...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Program
            </label>
            <select
              name="programId"
              className="py-3 px-4 pe-9 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              required
              disabled={isSubmitting}
            >
              <option value="">Select a program</option>
              {programs?.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
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
              <div
                className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Enroll"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProgramForm;
