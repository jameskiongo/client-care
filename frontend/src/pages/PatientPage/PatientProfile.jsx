import { useParams } from "react-router";
import { useGetPatientByIdQuery } from "../../services";
import EnrolledPrograms from "../../components/PatientComponents/EnrolledPrograms";
import { useState } from "react";
import ProgramForm from "../../components/PatientComponents/ProgramForm";

function PatientProfile() {
  const { patient_id } = useParams();
  const { data, isLoading, isFetching, isError } =
    useGetPatientByIdQuery(patient_id);
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  if (isLoading || isFetching) {
    return <p className="text-center font-bold">Loading...</p>;
  }
  if (isError) {
    return (
      <p className="text-center text-red-500 font-bold">Something went wrong</p>
    );
  }

  const toggleEnrollForm = () => {
    setShowEnrollForm(!showEnrollForm);
  };

  return (
    <div>
      <div className="my-10">
        <div className="max-w-[85rem] h-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="block text-3xl capitalize font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
              {data.name} Profile
            </h1>
          </div>
          <div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="mb-1 text-xs text-gray-600">
                  <span className="italic">DOB: </span>
                  {data.date_of_birth || "Not Provided"}
                </span>
                <h3 className="mb-1 text-xs italic text-gray-600">
                  <span className="italic">Gender: M</span>
                </h3>
              </div>

              <p className="mt-1 text-sm text-gray-600 pb-2">Contact Info</p>
              <div className="flex items-center justify-between mb-2">
                <h3 className="mb-1 text-xs italic text-gray-600">
                  <span className="italic">Email: </span>
                  {data.email || "Not Provided"}
                </h3>
                <span className="mb-1 text-xs text-gray-600">
                  <span className="italic">Phone: </span>
                  {data.phone_number || "Not Provided"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-3xl pt-4 pb-2">
                  Enrolled Programs
                </h3>
                <button
                  type="button"
                  onClick={toggleEnrollForm}
                  className="justify-center text-sm text-blue-500"
                >
                  {showEnrollForm ? "Cancel" : "Enroll to Program"}
                </button>
              </div>

              {/* Enroll Form */}
              {showEnrollForm && (
                <ProgramForm
                  toggleEnrollForm={toggleEnrollForm}
                  patient_id={patient_id}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.enrolled_programs.map((data) => (
                  <EnrolledPrograms key={data.id} data={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
