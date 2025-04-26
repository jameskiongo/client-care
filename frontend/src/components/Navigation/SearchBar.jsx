import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [term, setTerm] = useState("");

  // Sync with URL when coming from search page
  useEffect(() => {
    if (location.pathname === "/search") {
      const searchParams = new URLSearchParams(location.search);
      setTerm(searchParams.get("q") || "");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() === "") {
      return;
    }
    navigate(`/search?q=${term}`);
  };

  return (
    <div className="flex-1 px-4 mx-4">
      <div className="relative max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Patient Name..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
          />
        </form>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
