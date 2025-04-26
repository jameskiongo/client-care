import PatientCard from "../../components/PatientComponents/PatientCard";
import { useGetAllPatientsQuery } from "../../services/index.js";
function AllPatients() {
  const { data, error, isLoading } = useGetAllPatientsQuery();
  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else if (!data || data.length === 0) {
    content = <div>No data</div>;
  } else {
    content = data.map((program) => (
      <PatientCard key={program.id} client={program} />
    ));
  }
  return (
    <div className="my-10">
      {/* <div className="w-full h-screen flex items-center justify-center bg-gray-50"> */}
      <div className="max-w-[85rem] h-full  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
            Patients
          </h1>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{content}</div>
        {/* End Grid */}
      </div>
    </div>
  );
}

export default AllPatients;
