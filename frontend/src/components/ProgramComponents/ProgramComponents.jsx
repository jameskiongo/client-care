import { Link } from "react-router-dom";
function ProgramComponents({ program }) {
  return (
    <>
      <a href={`/program/${program.id}`}>
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <span className="mb-1 text-xs text-gray-600">
              <span className="italic">Starting: </span>
              {program.start_date}
            </span>
            <h3 className="mb-1 text-xs italic text-gray-600">
              <span className="italic">Enrolled:</span>
              {program.enrolled_clients_count}
            </h3>
          </div>

          <p className="font-semibold text-sm text-gray-800">{program.name}</p>

          <p className="mt-1 text-sm text-gray-600">{program.description}</p>
        </div>
      </a>
    </>
  );
}

export default ProgramComponents;
