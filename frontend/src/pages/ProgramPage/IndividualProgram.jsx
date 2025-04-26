import { useParams } from "react-router";
import { useGetProgramByIdQuery } from "../../services";
import PatientCard from "../../components/PatientComponents/PatientCard";

function IndividualProgram() {
  const { program_id } = useParams();
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

  return (
    <div className="my-10">
      <div className="max-w-[85rem] h-full  mx-auto px-4 sm:px-6 lg:px-8">
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
              <a href="#" className="justify-center text-sm text-blue-500">
                Add Patient
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
