import PatientCard from "../../components/PatientComponents/PatientCard";
import { useSearchPatientsQuery } from "../../services/index.js";
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [showLoading, setShowLoading] = useState(false);
  const { data, error, isLoading, isFetching } =
    useSearchPatientsQuery(searchTerm);

  // Show loading only after a brief delay to prevent flashing
  useEffect(() => {
    let timer;
    if (isLoading || isFetching) {
      timer = setTimeout(() => setShowLoading(true), 200);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading, isFetching]);

  let content;
  if (showLoading) {
    content = (
      <div className="col-span-3 text-center py-10">
        <div className="inline-flex items-center gap-2">Searching ...</div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="col-span-3 text-center py-10 text-red-500">
        Error loading patients: {error.message}
      </div>
    );
  } else if (!data || data.length === 0) {
    content = (
      <div className="col-span-3 text-center py-10 text-gray-500">
        {searchTerm
          ? `No patients found for "${searchTerm}"`
          : "Enter a search term to find patients"}
      </div>
    );
  } else {
    content = data.map((patient) => (
      <PatientCard key={patient.id} client={patient} />
    ));
  }

  return (
    <div className="my-10">
      <div className="max-w-[85rem] h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
            {searchTerm ? `Patient: ${searchTerm}` : "Search Patients"}
          </h1>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
