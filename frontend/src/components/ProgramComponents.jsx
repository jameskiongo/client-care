function ProgramComponents({ program }) {
  return (
    <>
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="mb-1 text-xs text-gray-600">
            <span className="italic">Starting: </span>
            {program.start_date}
          </h3>
          <h3 className="mb-1 text-xs italic text-gray-600">
            <span className="italic">Enrolled:</span>
            {program.enrolled_clients_count}
          </h3>
        </div>

        <p className="font-semibold text-sm text-gray-800">{program.name}</p>

        <p className="mt-1 text-sm text-gray-600">{program.description}</p>
      </div>
    </>
  );
}

export default ProgramComponents;
