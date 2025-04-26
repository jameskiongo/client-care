import { useState } from "react";
import { useParams } from "react-router";
import { useGetProgramByIdQuery } from "../../services";
import EnrollPatientForm from "../../components/ProgramComponents/EnrollPatientForm";
import PatientCard from "../../components/PatientComponents/PatientCard";

function IndividualProgram() {
  const { program_id } = useParams();
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const { data, isLoading, isFetching, isError } =
    useGetProgramByIdQuery(program_id);

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
    <div className="my-10">
      <div className="max-w-[85rem] h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
            {data.name} Health Program
          </h1>
        </div>
        <div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="mb-1 text-xs text-gray-600">
                <span className="italic">Starting: </span>
                {data.start_date}
              </span>
              <h3 className="mb-1 text-xs italic text-gray-600">
                <span className="italic">Enrolled:</span>
                {data.enrolled_clients_count}
              </h3>
            </div>

            <p className="mt-1 text-sm text-gray-600">{data.description}</p>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-3xl pt-4 pb-2">
                Enrolled Patients
              </h3>
              <button
                onClick={toggleEnrollForm}
                className="justify-center text-sm text-blue-500"
              >
                {showEnrollForm ? "Cancel" : "Add Patient"}
              </button>
            </div>

            {/* Enroll Patient Form */}
            {showEnrollForm && (
              <EnrollPatientForm
                toggleEnrollForm={toggleEnrollForm}
                program_id={program_id}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {data.enrolled_clients.map((client) => (
                <PatientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualProgram;
