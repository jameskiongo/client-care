function EnrolledPrograms({ data }) {
  return (
    <>
      <a href={`/program/${data.program_id}`}>
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="italic text-xs">Enrollment Date: </span>
              <p key={data.id} className="text-sm text-gray-800 capitalize">
                {data.enrollment_date}
              </p>
            </div>
          </div>
          <p className="py-3 text-xs font-bold capitalize">
            {data.program_name}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-xs text-gray-800 capitalize">
                {data.program_description}
              </p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default EnrolledPrograms;
