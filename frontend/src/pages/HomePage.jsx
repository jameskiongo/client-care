import ProgramComponents from "../components/ProgramComponents";
import { useGetAllProgramsQuery } from "../services";
function HomePage() {
  const { data, error, isLoading } = useGetAllProgramsQuery();
  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else if (!data || data.length === 0) {
    content = <div>No data</div>;
  } else {
    content = data.map((program) => (
      <ProgramComponents key={program.id} program={program} />
    ));
  }
  return (
    <div className="my-10">
      {/* <div className="w-full h-screen flex items-center justify-center bg-gray-50"> */}
      <div className="max-w-[85rem] h-full  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
            Health Programs
          </h1>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{content}</div>
        {/* End Grid */}
      </div>
    </div>
  );
}

export default HomePage;
