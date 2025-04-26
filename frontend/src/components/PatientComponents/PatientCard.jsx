function PatientCard({ client }) {
  return (
    <>
      <a href={`/patient/${client.id}`}>
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="italic text-xs">Patient Name: </span>
              <p key={client.id} className="text-sm text-gray-800 capitalize">
                {client.name}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="italic text-xs">Gender: </span>
              <p key={client.id} className="text-sm text-gray-800 capitalize">
                {client.gender}
              </p>
            </div>
          </div>
          <p className="py-3 text-xs font-bold capitalize">contact info</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="italic text-xs">Email: </span>
              <p className="text-xs text-gray-800 capitalize">{client.email}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="italic text-xs">Phone Number: </span>
              <p className="text-xs text-gray-800 capitalize">{client.phone}</p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default PatientCard;
