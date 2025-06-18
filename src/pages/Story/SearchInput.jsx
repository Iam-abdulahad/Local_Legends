// src/components/Stories/SearchInput.jsx
import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useData } from "../../context/DataContext";

const SearchInput = ({ setSearchTriggered, setLocalLoading, setError }) => {
  const { searchByKeyword } = useData();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (keyword.trim()) {
        try {
          setLocalLoading(true);
          searchByKeyword(keyword);
          setSearchTriggered(true);
        } catch (err) {
          setError("Error during search");
        } finally {
          setLocalLoading(false);
        }
      } else {
        searchByKeyword("");
        setSearchTriggered(false);
      }
    }, 400); // debounce delay

    return () => clearTimeout(delaySearch);
  }, [keyword]);

  const handleClear = () => {
    setKeyword("");
    setSearchTriggered(false);
    setLocalLoading(false);
    setError("");
    searchByKeyword("");
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-xl mx-auto my-6">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search stories by title or content..."
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF3131] transition"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>

      {keyword && (
        <button
          onClick={handleClear}
          className="p-2 text-gray-600 hover:text-red-500 transition"
          title="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
